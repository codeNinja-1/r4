export interface NetworkChannel {
    send(data: ArrayBuffer): void;
    onMessage(callback: (data: ArrayBuffer) => unknown): void;
}

export namespace NetworkChannel {
    export enum Type { RealTime, Bulk };
}