import { DecodedData } from "../decoded-data.js";
import { DataType } from "./data-type.js";
import { ListType } from "./list-type.js";
import { MatchResult } from "./match-result.js";
import { NumberDataType } from "./number-data-type.js";

export class ListDataType<D> implements DataType<D[] | Set<D>> {
    constructor(public itemType: DataType<D>, public length: NumberDataType | number, public listType: ListType) {
    }

    *encode(data: D[]) {
        if (this.length instanceof NumberDataType) {
            yield* this.length.encode(data.length);
        }

        for (const item of data) {
            yield* this.itemType.encode(item);
        }
    }

    decode(view: DataView, index: number) {
        let length: number;
        let lengthSize: number = this.length instanceof NumberDataType ? this.length.byteLength : 0;

        if (this.length instanceof NumberDataType) {
            length = this.length.decode(view, index).data;
        } else {
            length = this.length;
        }

        const data: D[] | Set<D> = this.listType == ListType.Array ? [] : new Set();

        let itemIndex = index + length;

        for (let i = 0; i < length; i++) {
            const { data: itemData, length: itemLength } = this.itemType.decode(view, itemIndex);

            itemIndex += itemLength;

            if (data instanceof Set) {
                data.add(itemData);
            } else {
                data.push(itemData);
            }
        }

        return new DecodedData(data, itemIndex - index);
    }

    *matches(data: any) {
        if (this.listType == ListType.Array && !Array.isArray(data)) yield MatchResult.Fail;
        else if (this.listType == ListType.Set && !(data instanceof Set)) yield MatchResult.Fail;
        else yield MatchResult.Uncertain;

        for (const item of data) {
            for (const result of this.itemType.matches(item)) {
                if (result == MatchResult.Fail) yield MatchResult.Fail;
                else yield MatchResult.Uncertain;
            }
        }

        yield MatchResult.Pass;
    }
}