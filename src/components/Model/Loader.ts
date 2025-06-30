import { Assets, Spritesheet} from 'pixi.js';
import {ITextures} from "../View/Textures.ts";

export class Loader {
    private textures: ITextures =  ITextures.getInstance()

    async initBgLoad() {
        await Assets.init({
            manifest: {
                bundles: [
                    {
                        name: 'bg',
                        assets: [
                            {
                                alias: "slot-background",
                                src: 'https://p2w-object-store.fra1.digitaloceanspaces.com/resources/ivanTrash/lobbyTest/forest.png',
                                crossOrigin: 'anonymous', // Установлено для текстуры
                            },
                        ],
                    },
                ],
            },
        });

        await Assets.loadBundle('bg');

        const jsonUrl = 'https://p2w-object-store.fra1.digitaloceanspaces.com/resources/ivanTrash/lobbyTest/casinoLobby.json';


        const resource = {alias: 'spritesheet', src: jsonUrl, crossOrigin: 'anonymous'};
        await Assets.load([resource]);

        const sheet = Assets.cache.get(jsonUrl) as Spritesheet;

        if (!sheet) {
            console.error('Spritesheet not found!');
            return;
        }

        Object.keys(sheet.textures).forEach((texture) => {
            if (texture === 'tableBetter-removebg-preview.png') {
                this.textures.setTextures('table', texture);
            } else {
                this.textures.setSymbolsTextures(texture);
            }
        });

        console.log('Спрайты успешно добавлены на сцену!');
    }
}

