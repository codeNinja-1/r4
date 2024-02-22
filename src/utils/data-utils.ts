export namespace DataUtils {
    export function concat(buffers: ArrayBuffer[]): ArrayBuffer {
        const totalLength = buffers.reduce((total, buffer) => total + buffer.byteLength, 0);
        const result = new Uint8Array(totalLength);

        let offset = 0;
        for (const buffer of buffers) {
            result.set(new Uint8Array(buffer), offset);
            offset += buffer.byteLength;
        }
        
        return result.buffer;
    }
}