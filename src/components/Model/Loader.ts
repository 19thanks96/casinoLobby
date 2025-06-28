import { Assets, Spritesheet} from 'pixi.js';
import {ITextures} from "../View/Textures.ts";

export class Loader {
    private textures: ITextures =  ITextures.getInstance()

    async initBgLoad() {
        await Assets.init({
            manifest:
                {
                    bundles:
                        [
                            {
                                name: 'bg',
                                assets: [
                                    {
                                        "alias":"slot-background",
                                        "src": 'https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/ivanTrash/lobbyTest/forest.png',
                                    },
                                ]
                            }
                        ],
                },
        });
        await Assets.loadBundle('bg');

        Assets.load('https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/ivanTrash/lobbyTest/casinoLobby.json').then(() => {
            const sheet = Assets.cache.get('https://p2w-object-store.fra1.cdn.digitaloceanspaces.com/resources/ivanTrash/lobbyTest/casinoLobby.json') as Spritesheet;

            if (!sheet) {
                console.error('Spritesheet not found!');
                return;
            }

            Object.keys(sheet.textures).forEach((texture) => {
                if(texture === 'tableBetter-removebg-preview.png') {
                    this.textures.setTextures('table',texture)

                } else {
                    this.textures.setSymbolsTextures(texture)
                    console.log(' not tableBetter-removebg-preview.png',texture)
                }
            })
            console.log('Спрайты успешно добавлены на сцену!');
        });
    }


}

