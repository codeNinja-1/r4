export interface InstanceReferencer<I> {
    instanceItemSize: number;
    getChunkSize(index: number): number;
    getData(id: I): ArrayBuffer;
    getAddress(id: I): number;
    setAddress(id: I, address: number): void;
}