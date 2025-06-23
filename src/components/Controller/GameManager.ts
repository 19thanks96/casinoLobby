import {GarbageCollector} from "../Model/GarbageCollector.ts";
import {Background} from "../View/Background.ts";
import {Loader} from "../Model/Loader.ts";
import {emitEventNames} from "../../infrastructure/controllers/emitTypes.ts";
import {Emitter} from "../Model/Emitter.ts";
import {ReelsManager} from "./ReelsManager.ts";
import {Application} from "pixi.js";
import {InputHandler} from "../Model/InputHandler.ts";

export class GameManager {
    garbageCollector: GarbageCollector = GarbageCollector.getInstance();
    emitter: Emitter =  Emitter.getInstance();
    reelsManager : ReelsManager = ReelsManager.getInstance();
    inputHandler = new InputHandler;
    bg = new Background;
    loader = new Loader;

    init(element: HTMLElement) {
        const app = new Application({
            resizeTo: element,
            backgroundColor: 'rgba(0,0,0,0.5)',
        });
        // @ts-ignore
        globalThis.__PIXI_APP__ = app;

        document.body.appendChild(app.view as unknown as Node);

        this.garbageCollector.setListeners('resize', () => {
            const elementSize = element.getBoundingClientRect();
            app.renderer.resize(elementSize.width, elementSize.height);
        })
        this.garbageCollector.activateListeners()


        this.bg.drawGoButton(app)
        this.loader.initBgLoad().then()
        this.emitter.on(emitEventNames.startBtnClick, () => {
            this.bg.drawSlotBackground(app)
            this.bg.drawSlotTable(app)
            this.reelsManager.drawReels()
            this.inputHandler.init()
        })

    }
}

