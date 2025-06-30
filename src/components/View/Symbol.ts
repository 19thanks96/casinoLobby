import {Positions} from "../Model/Positions.ts";
import {ITextures} from "./Textures.ts";
import {Assets, Container, DisplayObject,  Sprite} from "pixi.js";
import {GarbageCollector} from "../Model/GarbageCollector.ts";

export class Symbol {
    index: number | null = null;
    reelContainer: Container | null = null;

    elementSize = 0;
    maxHeight = 0;
    currentY = 0;
    positions: Positions = Positions.getInstance();
    textures: ITextures = ITextures.getInstance();
    sprite = null as Sprite | null;
    symbolContainer: Container | null = null;
    garbageCollector: GarbageCollector = GarbageCollector.getInstance();


    init(index: number, container: Container<DisplayObject>, symbolIndex: number, count: number = 0): void {
        this.index = index;
        this.reelContainer = container;
        const setSizes = () => {
            this.elementSize = container.width;
            this.maxHeight = container.width * 3 + this.positions.gapSymbols! * 2;
        }
        setSizes()
        this.pasteNewSymbolsBefore(symbolIndex, count);
        this.garbageCollector.setListeners('resize', () => {
            setSizes()
        }, 'symbolResize')
    }

    private createSingleSymbolContainer(color: number, count: number = 0): Container {
        const symbolContainer = new Container();

        const spritePath = Assets.get(this.textures.getSymbolTextures(color));
        this.sprite = new Sprite(spritePath);
        this.sprite.anchor.set(0.5, 0.5);

        const setSizes = () => {
            symbolContainer.width = this.elementSize;
            symbolContainer.height = this.elementSize;
            const scale = Math.min(
                this.elementSize / spritePath.width,
                this.elementSize / spritePath.height
            );
            this.sprite!.scale.set(scale, scale);
            this.sprite!.x = this.elementSize / 2;
            this.sprite!.y = this.elementSize / 2;
        }
        setSizes()
        symbolContainer.y = ((this.elementSize + this.positions.gapSymbols!) * this.index!) - (this.maxHeight * count);
        symbolContainer.addChild(this.sprite);
        this.garbageCollector.setListeners('resize', () => {
            // setSizes()
            // this.setToInitialPosition(0)
        }, 'symbolResize')
        return symbolContainer;
    }

    setToInitialPosition(currentY: number): void {
        this.symbolContainer!.y += currentY;
        this.symbolContainer!.pivot.y = -this.symbolContainer!.height /2 ;
        this.sprite!.y = 0;
    }

    pasteNewSymbolsBefore(color: number, count: number): void {
        if (this.index === null || this.reelContainer === null) {
            console.error('pasteNewSymbolsBefore');
            return;
        }

        this.symbolContainer = this.createSingleSymbolContainer(color, count);
        this.reelContainer.zIndex = color
        this.reelContainer.addChildAt(this.symbolContainer, this.index);
    }

    removeAllSymbolsNotExceptFirstThree(): void {
        if (!this.reelContainer) {
            console.error('removeAllSymbolsExceptFirstThree');
            return;
        }

        while (this.reelContainer.children.length > 3) {
            this.reelContainer.removeChildAt(3);
        }
    }
}