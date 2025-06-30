
import {MAX_REELS, } from "../../helpers/utils.ts";
import {Application} from "pixi.js";

export class Positions {
    private static instance: Positions;
    public tableSize: number | null = null;
    public reelSize: {
        width: number ,
        height: number ,
    } | null = null;
    public symbolSize: {
        width: number ,
        height: number ,
    } | null = null;
    public initialTableMargin: number = 30;
    public gapSymbols: number | null = null
    public size : number | null = null;
    public textureAspect: number | null = null;

    constructor() {
    }

    static getInstance() {
        if (!Positions.instance) {
            Positions.instance = new Positions();
        }
        return Positions.instance;
    }

    recalculate(app: Application, textureAspect: null | number) {
        const screenWidth = app.renderer.screen.width;
        const screenHeight = app.renderer.screen.height;
        const screenAspect = screenWidth / screenHeight;
        if(!textureAspect) {
            console.error('textureAspect is null')
            return
        }

        this.textureAspect = textureAspect;

        if (screenAspect <  this.textureAspect) {
            if (screenWidth < 450) {
                this.tableSize = Math.max(screenWidth - 200, 250);
            } else {
                this.tableSize = Math.max(screenHeight - 500, 250);
            }

        } else {
            if(screenWidth - 500 < screenHeight - 300) {
                this.tableSize = Math.max(screenWidth - 500, 250);
            } else {
                this.tableSize = Math.max(screenHeight - 300, 250);
            }
        }
        const isPortrait = window.innerWidth < window.innerHeight;


        this.initialTableMargin = isPortrait
            ? Math.min(20, this.tableSize * 0.05)
            : Math.min(40, this.tableSize * 0.05);

        const containerOfReelXY = this.tableSize - (this.initialTableMargin * 2);
        const gapCount = MAX_REELS - 1;
        this.gapSymbols = Math.max(0, containerOfReelXY * 0.01);

        const reelSizeXWithoutGap = containerOfReelXY - (gapCount * this.gapSymbols)

        this.reelSize =  {
            width: reelSizeXWithoutGap / MAX_REELS,
            height: containerOfReelXY,
        }

        this.symbolSize = {
            width: reelSizeXWithoutGap / MAX_REELS,
            height: reelSizeXWithoutGap / MAX_REELS,
        }
    }

    isSizesEmpty() {
        return this.tableSize === null && this.symbolSize === null;
    }

}