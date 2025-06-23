import {MAX_REELS} from "../../helpers/utils.ts";
import { Reel } from "../View/Reel.ts";
import {Application, Container, DisplayObject} from "pixi.js";



export class ReelsManager {

    private static instance: ReelsManager;

    static getInstance() {
        if (!ReelsManager.instance) {
            ReelsManager.instance = new ReelsManager();
        }
        return ReelsManager.instance;
    }

    reels: Reel[] = [];
    private container: Container | null = null
    private app: Application | null = null;

    constructor() {}

    async init(container: Container<DisplayObject>, app: Application) {
        this.container = container;
        this.app = app;
    }

    async drawReels() {
        if(!this.container && !this.app) {
            console.error('container or app not exist, chill')
            return
        }

        for (let i = 0; i < MAX_REELS; i++) {
            const reel = new Reel();
            this.reels.push(reel);
            await reel.init(i, this.container!, this.app!);
        }

    }

    spin() {
        if(!this.reels['0'].isRolled && !this.reels['1'].isRolled && !this.reels['2'].isRolled) {
            for(let i = 0; i < MAX_REELS; i++) {
                this.reels[i].infiniteRoll().then()
            }
        }
    }
}