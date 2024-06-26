import { DecodedData } from "../decoded-data.js";
import { DataType } from "./data-type.js";
import { NumberDataType } from "./number-data-type.js";

export class MapDataType<K, V> implements DataType<Map<K, V>> {
    static singleKeyType: boolean = true;

    lengthType: NumberDataType = new NumberDataType('u32');
    
    constructor(public keyType: DataType<K>, public valueType: DataType<V>) {
    }

    *encode(data: Map<K, V>) {
        const entries = [...data.entries()];

        yield* this.lengthType.encode(entries.length);

        for (const [key, value] of entries) {
            yield* this.keyType.encode(key);
            yield* this.valueType.encode(value);
        }
    }

    decode(view: DataView, index: number) {
        const length = this.lengthType.decode(view, index).data;

        const data = new Map<K, V>();

        let itemIndex = index + this.lengthType.byteLength;

        for (let i = 0; i < length; i++) {
            const { data: key, length: keyLength } = this.keyType.decode(view, itemIndex);

            itemIndex += keyLength;

            const { data: value, length: valueLength } = this.valueType.decode(view, itemIndex);

            itemIndex += valueLength;

            data.set(key, value);
        }

        return new DecodedData(data, itemIndex - index);
    }
}