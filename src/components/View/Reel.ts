import {initialReels, MAX_SYMBOL_IN_REEL, rotateMatrixToLeft} from "../../helpers/utils.ts";
import {Symbol} from "./Symbol.ts";

import {gsap} from "gsap";
import Stats from "stats.js";
import {Positions} from "../Model/Positions.ts";
import {Application, Container, DisplayObject, Graphics} from "pixi.js";

export class Reel {
    private reelMaxHeight = 0;
    private readonly reelBg = new Container();
    private readonly rolledReel = new Container();
    private symbols: Symbol[] = [];
    private rollsBeforeStop = 1;

    private readonly positions = Positions.getInstance();

    private reelIndex: number | null = null;

    private stats: any;
    isStopped = false;
    isRolled = false;

    async init(reelIndex: number, container: Container<DisplayObject>, app: Application): Promise<void> {
        this.reelIndex = reelIndex;

        this.reelBg.x = (app.renderer.screen.width / 2) - (container.width / 2) + (this.positions.initialTableMargin || 0);
        this.reelBg.y = (app.renderer.screen.height / 2) - (container.height / 2) + (this.positions.initialTableMargin || 0);
        this.reelBg.width = container.width - (this.positions.initialTableMargin * 2)
        this.reelBg.height = container.height - (this.positions.initialTableMargin * 2);
        const reelBgGraphics = new Graphics();
        reelBgGraphics.beginFill(0x000000);
        reelBgGraphics.drawRect(
            0,
            0,
            container.width - (this.positions.initialTableMargin * 2),
            container.height - (this.positions.initialTableMargin * 2)
        );

        reelBgGraphics.alpha = 0;
        this.reelBg.addChild(reelBgGraphics);
        this.reelMaxHeight = this.reelBg.height;
        container.addChild(this.reelBg);

        this.rolledReel.x = ((this.positions.reelSize?.width || 0) * reelIndex) + ((this.positions.gapSymbols || 0) * reelIndex);
        this.rolledReel.y = 0;
        const reelRect = new Graphics();
        reelRect.beginFill(0x000000);
        reelRect.drawRect(
            0,
            0,
            this.positions.symbolSize?.width || 0,
            container.height - (this.positions.initialTableMargin * 2),
        );
        reelRect.alpha = 0;
        this.rolledReel.addChild(reelRect);
        this.reelBg.addChild(this.rolledReel);

        this.setupSymbols(reelIndex);

    }

    private setupSymbols(reelIndex: number): void {
        for (let j = 0; j < MAX_SYMBOL_IN_REEL; j++) {
            const symbolIndex = rotateMatrixToLeft(initialReels)[reelIndex][j];
            const symbol = new Symbol();
            this.symbols.push(symbol);
            symbol.init(j, this.rolledReel, symbolIndex, 0);
        }
    }

    async infiniteRoll(): Promise<void> {

        this.isStopped = false;
        this.isRolled = true;
        this.stats = new Stats();
        this.stats.showPanel(0);
        this.stats.dom.classList.add("stats");
        document.body.appendChild(this.stats.dom);

        this.stats.begin();
        await this.roll(1, 0.05 * (this.reelIndex || 0), "power4.in", 1);
        await this.cycleInfiniteRoll();

    }

    private async cycleInfiniteRoll(): Promise<void> {
        if (!this.isStopped) {
            this.rollsBeforeStop++;

            if (this.rollsBeforeStop > 6 + ((this.reelIndex || 0) * 2)) {
                this.isStopped = true;
            }

            await this.roll(0.25, 0, "linear", this.rollsBeforeStop);
            await this.cycleInfiniteRoll();
        } else {
            this.rollsBeforeStop++;
            await this.roll(1, 0, "power3.out", this.rollsBeforeStop).then(() => {
                this.onStopReels()
            })
        }
    }

    roll(
        duration: number,
        delay: number,
        ease: string,
        counter: number
    ): Promise<number> {
        setTimeout(() => {
            for (let symbol of this.symbols) {
                symbol.pasteNewSymbolsBefore(
                    Math.floor(Math.random() * 4),
                    counter
                );
            }
        }, 0);

        return new Promise((resolve, reject) => {
            let previousY = 0;

            const animationData = {vy: 0};
            gsap.to(animationData, {
                vy: this.reelMaxHeight,
                duration,
                delay,
                ease,
                onUpdate: () => {
                    const deltaY = animationData.vy - previousY;
                    previousY = animationData.vy;

                    if (animationData.vy === this.reelMaxHeight) {
                        previousY = 0;
                    }

                    this.rolledReel.y += deltaY;

                },
                onComplete: () => {
                    this.onReelsComplete()
                    this.stats.end();
                    resolve(0)
                },
                onInterrupt: () => reject(new Error("Roll animation interrupted")),
            });
        });
    }

    onReelsComplete() {
        for (let j = 0; j < MAX_SYMBOL_IN_REEL; j++) {
            this.symbols[j].removeAllSymbolsNotExceptFirstThree()
        }
    }

    onStopReels() {
        this.isRolled = false;
        this.rollsBeforeStop = 1;
        if (this.symbols.length > 3) {
            this.symbols = this.symbols.slice(-3);
        }
        for (let j = 0; j < MAX_SYMBOL_IN_REEL; j++) {
            const symbol =  this.symbols[j]
            symbol.setToInitialPosition(this.rolledReel.y);
        }
        // this.reelBg.y = 0;
        this.rolledReel.y = 0;
        console.log("Symbol count after stop:", this.symbols.length);
    }
}
