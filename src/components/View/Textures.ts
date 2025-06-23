import {Assets} from "pixi.js";


export class ITextures {
    private static instance: null | ITextures = null;
    private textures = {
        bg: null as string | null,
        table: null as string | null,
        symbols : [] as string[]
    };


    static getInstance() {
        if (!ITextures.instance) {
            ITextures.instance = new ITextures();
        }
        return ITextures.instance;
    }

    setTextures(type: 'bg' | 'table', spriteName: string) {
        this.textures[type] = spriteName
    }
    setSymbolsTextures(spriteName: string) {
        this.textures.symbols.push(spriteName);
    }

    getTextures(e: 'bg' | 'table') {
        return this.textures[e];
    }

    getSymbolTextures(index: number) {
        return this.textures.symbols[index];
    }

    tryToGetImgFromCache(bgTexture: any) {
        const cacheArray = [...Assets.cache['_cache']];
        const bgEntry = cacheArray.find(([key]) => key === 'bg-slot-background');

        if (bgEntry) {
            bgTexture = bgEntry[1];
        }

        if (!bgTexture) {
            console.error('Ошибка: Текстура "bg-slot-background" всё ещё не найдена!', cacheArray);
            return;
        }
    }

}