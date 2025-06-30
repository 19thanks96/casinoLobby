import {GarbageCollector} from "../Model/GarbageCollector.ts";
import {Application, Assets, Container, Graphics, Sprite, Text} from "pixi.js";
import {Emitter} from "../Model/Emitter.ts";
import {emitEventNames} from "../../infrastructure/controllers/emitTypes.ts";
import {Positions} from "../Model/Positions.ts";
import {ReelsManager} from "../Controller/ReelsManager.ts";

export class Background {
    garbageCollector: GarbageCollector = GarbageCollector.getInstance();
    emitter: Emitter = Emitter  .getInstance();
    positions: Positions = Positions.getInstance();
    reelsManager: ReelsManager = ReelsManager.getInstance();
    isTableMaskDrawed = false;

    drawGoButton(app: Application) {
        const ButtonStart = new Graphics();
        ButtonStart.beginFill('white');
        ButtonStart.drawRoundedRect(0, 0, 250, 50, 10);
        ButtonStart.endFill();

        const buttonText = new Text('Play game', {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: ['#000000'],
            align: 'center',
        });
        buttonText.anchor.set(0.5);
        buttonText.position.set(250 / 2, 50 / 2);

        const container = new Container();
        container.addChild(ButtonStart);
        container.addChild(buttonText);
        container.cursor = 'pointer';
        container.interactive = true;
        container.position.set(app.view.width / 2 - 250 / 2, app.view.height / 2 - 50 / 2);
        app.stage.addChild(container);
        this.garbageCollector.setListeners('resize', () => {
            container.position.set(
                app.renderer.screen.width / 2 - 250 / 2,
                app.renderer.screen.height / 2 - 50 / 2
            );
        }, 'goBtnResize')
        const onClick = () => {
            this.garbageCollector.clearListenerByDescription('resize', 'goBtnResize')
            this.garbageCollector.clearListenerByDescription('click', 'goBtnClick')
            ButtonStart.destroy()
            container.destroy()
            this.emitter.emit(emitEventNames.startBtnClick, {withoutError: true})
        }
        this.garbageCollector.setListeners('click', onClick, 'goBtnClick', container)
        this.garbageCollector.setListeners('pointerdown', onClick, 'goBtnClick', container)
    }

    drawSlotBackground(app: Application) {
        let bgTexture = Assets.get('bg-slot-background');

        if (!bgTexture) {
            console.error('Ошибка: Текстура "bg-slot-background" не найдена в Assets.get!');
            return
        }

        const bg = new Sprite(bgTexture);

        const isPortraitOrDesktop = app.renderer.screen.width > app.renderer.screen.height;
        const setBiggerSize = isPortraitOrDesktop ? app.renderer.screen.width : app.renderer.screen.height;
        bg.anchor.set(0.5, 0.5);

        bg.position.set(
            app.renderer.screen.width / 2,
            app.renderer.screen.height / 2
        );

        bg.width = bg.height = setBiggerSize
        app.stage.addChild(bg);

        this.garbageCollector.setListeners('resize', () => {
            const isPortraitOrDesktop = app.renderer.screen.width > app.renderer.screen.height;
            const setBiggerSize = isPortraitOrDesktop ? app.renderer.screen.width : app.renderer.screen.height;

            bg.position.set(
                app.renderer.screen.width / 2 ,
                app.renderer.screen.height / 2
            );
            bg.width = bg.height = setBiggerSize
        }, 'bgResize')
    }


    drawSlotTable(app: Application) {
        let tableAsset = Assets.get("tableBetter-removebg-preview.png");

        if (!tableAsset) {
            console.error('Ошибка: Текстура "bg-slot-background" не найдена в Assets.get!');
            return
        }

        const tableSprite = new Sprite(tableAsset);
        tableSprite.anchor.set(0.5, 0.5);
        const tableSpriteMask = new Container();
        tableSpriteMask.addChild(tableSprite);
        const tableSpriteClone = new Sprite(tableSprite.texture);


        const tableMask = new Graphics();
        tableSpriteMask.addChild(tableMask);

        tableSpriteMask.mask = tableMask;

        const resizeTableSprite = () => {
            const screenWidth = app.renderer.screen.width;
            const screenHeight = app.renderer.screen.height;

            const textureAspect = tableSprite.texture.width / tableSprite.texture.height;
            this.positions.recalculate(app, textureAspect);
            const size = this.positions.tableSize;
            if(!size) {
                console.error('tableSize is null')
                return
            }
            const maskSize =  size - ((this.positions.initialTableMargin ?? 0) * 2) ;

            if(this.isTableMaskDrawed) {
                tableMask.clear()
            }

            tableMask.beginFill(0x000000);
            tableMask.drawRect(0, 0, maskSize, maskSize);
            // tableMask.endFill();


            tableMask.pivot.set(maskSize / 2, maskSize / 2);
            tableMask.position.set(app.view.width / 2, app.view.height / 2);


            tableSprite.width = tableSprite.height = size;
            // tableSpriteMask.width = tableSpriteMask.height = size;


            tableSprite.position.set(
                screenWidth / 2,
                screenHeight / 2
            );
            tableSpriteMask.position.set(0, 0);
            tableSpriteMask.scale.set(1, 1);

            tableSpriteClone.anchor.set(tableSprite.anchor.x, tableSprite.anchor.y);
            tableSpriteClone.position.set(tableSprite.position.x, tableSprite.position.y);
            tableSpriteClone.width = tableSprite.width;
            tableSpriteClone.height = tableSprite.height;

            tableSpriteClone.rotation = tableSprite.rotation;
            tableSpriteClone.scale.set(tableSprite.scale.x, tableSprite.scale.y);
            tableSpriteClone.alpha = 0;

            tableSpriteMask.addChild(tableSpriteClone);

        };

        resizeTableSprite();
        app.stage.addChild(tableSprite);
        app.stage.addChild(tableSpriteMask);
        app.stage.addChild(tableMask);

        this.garbageCollector.setListeners('resize', () => {
            resizeTableSprite()
        }, 'tableResize')
        this.reelsManager.init(tableSpriteMask, app)
        // console.log('tableSprite', tableSpriteMask.width, tableSpriteMask.height)
    }
}