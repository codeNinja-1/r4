export namespace BufferAlignment {
    export function alignItems(data: ArrayBuffer, size: number, alignedSize: number): ArrayBuffer {
        let dataArray = new Uint8Array(data);
        let items = dataArray.length / size;
        let alignedArray = new Uint8Array(items * (alignedSize));

        for (let i = 0; i < items; i++) {
            let offset = i * size;
            let alignedOffset = i * alignedSize;

            alignedArray.set(dataArray.slice(offset, offset + size), alignedOffset);
        }

        return alignedArray.buffer;
    }
}