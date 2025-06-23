export enum emitEventNames  {
    'startBtnClick'
}

export interface EmitEventPayloads {
    [emitEventNames.startBtnClick]: {
        withoutError: boolean;
    };
}

