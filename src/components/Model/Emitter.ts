import {emitEventNames, EmitEventPayloads} from "../../infrastructure/controllers/emitTypes.ts";

export class Emitter {
    private static instance: Emitter;
    private events: { [key: string]: any[] };

    static getInstance() {
        if (!Emitter.instance) {
            Emitter.instance = new Emitter();
        }
        return Emitter.instance;
    }


    constructor() {
        this.events = {};
    }

    on(event:  emitEventNames, listener: any) {
        if (!this.events[event as unknown as string]) {
            this.events[event as unknown as string] = [];
        }
        this.events[event as unknown as string].push(listener);
    }

    off(event: string | number, listener: any) {
        if (!this.events[event]) return;
        this.events[event] = this.events[event].filter((l) => l !== listener);
    }

    emit(event: emitEventNames, ...args: [EmitEventPayloads[emitEventNames]]) {
        if (this.events[event]) {
            this.events[event].forEach((listener) => listener(...args));
        }
    }
}


