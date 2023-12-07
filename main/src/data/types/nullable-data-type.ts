import { DataType } from "./data-type.js";
import { NumberDataType } from "./number-data-type.js";

export class NullableDataType<T> implements DataType<T | null> {
    type: DataType<T>;
    numberType: NumberDataType = new NumberDataType('u8');

    constructor(type: DataType<T>) {
        this.type = type;
    }
    
    *encode(data: T | null) {
        if (data == null) {
            yield* this.numberType.encode(0);
        } else {
            yield* this.numberType.encode(1);
            yield* this.type.encode(data);
        }
    }

    decode(view: DataView, index: number) {
        const isNull = !this.numberType.decode(view, index).data;

        if (isNull) {
            return { data: null, length: this.numberType.byteLength };
        }

        const { data, length } = this.type.decode(view, index + this.numberType.byteLength);

        return { data, length: length + this.numberType.byteLength };
    }
}