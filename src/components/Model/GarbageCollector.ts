export class GarbageCollector {
    private static instance: null | GarbageCollector  = null;
    listeners = {
        resize: [] as Array<{ func: () => void; uniqDescription: string | null, selector : any | undefined }>,
        click: [] as Array<{ func: () => void; uniqDescription: string | null, selector : any | undefined}>,
        pointerdown: [] as Array<{ func: () => void; uniqDescription: string | null, selector : any | undefined}>,
    }

    static getInstance() {
        if (!GarbageCollector.instance) {
            GarbageCollector.instance = new GarbageCollector();
        }
        return GarbageCollector.instance;
    }

    setListeners(listenerType: 'resize' | 'click' | 'pointerdown', listener: () => void , uniqDescription: string | null = null, selector: any | undefined = undefined) {
        this.listeners[listenerType].push({ func: listener, uniqDescription, selector : selector });
        if((listenerType  === 'click' || listenerType === 'pointerdown') && selector) {
            selector.addEventListener(listenerType, listener);
        }
    }

    getListeners(listenerType: 'resize' | 'click' | 'pointerdown') {
        return this.listeners[listenerType];
    }

    clearListenerByDescription(listenerType: 'resize' | 'click' | 'pointerdown', desc: string) {
        const index = this.listeners[listenerType].findIndex(listener => listener.uniqDescription === desc);
        if (index !== -1) {
            const listener = this.listeners[listenerType][index];
            if (listener.selector && listenerType === 'click') {
                listener.selector.removeEventListener('click', listener.func);
            }
            this.listeners[listenerType].splice(index, 1);
        }

    }

    activateListeners() {
        window.addEventListener('resize', () => {
            this.listeners.resize.forEach(listener => listener.func());
        })
    }
}
