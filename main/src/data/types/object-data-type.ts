import { DecodedData } from "../decoded-data.js";
import { DataType } from "./data-type.js";

// `{ ${keyName}: ${valueType}, ... }`
export class ObjectDataType<T> implements DataType<T> {
    properties: { [key: string]: DataType<any> };
    keys: string[];

    constructor(properties: { [key: string]: DataType<any> }) {
        this.properties = properties;
        this.keys = [];

        this.sortProperties();
    }

    sortProperties() {
        this.keys = Object.keys(this.properties).sort();
    }

    *encode(data: T) {
        for (const key of this.keys) {
            const type = this.properties[key];

            yield* type.encode(data[key]);
        }
    }

    decode(view: DataView, index: number): DecodedData<T> {
        const data: object = {};

        let length = 0;

        for (const key of this.keys) {
            const value = this.properties[key];

            const { data: itemData, length: itemLength } = value.decode(view, index + length);

            length += itemLength;
            data[key] = itemData;
        }

        return new DecodedData(data as T, length);
    }
}