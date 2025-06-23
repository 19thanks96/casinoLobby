
import {MAX_REELS, } from "../../helpers/utils.ts";

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

    constructor() {
    }

    static getInstance() {
        if (!Positions.instance) {
            Positions.instance = new Positions();
        }
        return Positions.instance;
    }

    recalculate( sizeOfTable : number) {
        this.tableSize = sizeOfTable;
        console.log(this.tableSize)
        const containerOfReelXY = sizeOfTable - (this.initialTableMargin * 2);
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
        console.log(this.symbolSize, this.reelSize, this.tableSize );
    }

    isSizesEmpty() {
        return this.tableSize === null && this.symbolSize === null;
    }

}