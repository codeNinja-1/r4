import { TypedArray } from "../world/chunk-data/typed-array.js";

export namespace DataUtils {
    export function concat(buffers: TypedArray[]): ArrayBuffer {
        const totalLength = buffers.reduce((total, buffer) => total + buffer.byteLength, 0);
        const result = new Uint8Array(totalLength);

        let offset = 0;
        for (const buffer of buffers) {
            result.set(new Uint8Array(buffer.buffer), offset);
            offset += buffer.byteLength;
        }

        if (ENABLE_VERIFY) {
            let index = 0;

            for (const buffer of buffers) {
                let mergeArray = new Uint8Array(buffer.buffer);
                let resultArray = new Uint8Array(result.buffer);

                for (let i = 0; i < buffer.byteLength; i++) {
                    if (resultArray[index++] != mergeArray[i]) {
                        throw new Error("Concatenation failed");
                    }
                }
            }
        }
        
        return result.buffer;
    }

    const ENABLE_VERIFY = false;
}