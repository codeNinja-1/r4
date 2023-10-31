import { DataType } from "./data-type.js";
import { MatchResult } from "./match-result.js";
import { NumberDataType } from "./number-data-type.js";

export class OrDataType<T> implements DataType<T> {
    types: DataType<T>[];
    numberType: NumberDataType = new NumberDataType('u8');

    constructor(...types: DataType<T>[]) {
        this.types = types;
    }
    
    *encode(data) {
        const type = this.getMatchingType(data);

        if (!type) throw new Error("No matching type found");

        yield* this.numberType.encode(this.types.indexOf(type));
        yield* type.encode(data);
    }

    decode(view: DataView, index: number) {
        const typeIndex = this.numberType.decode(view, index).data;

        const type = this.types[typeIndex];

        const { data, length } = type.decode(view, index + this.numberType.byteLength);

        return { data, length: length + this.numberType.byteLength };
    }

    *matches(data: any) {
        let generators: Generator<MatchResult>[] = new Array(this.types.length);

        for (const type of this.types) {
            generators.push(type.matches(data));
        }

        let options = generators.length;

        while (options > 1) {
            for (let i = 0; i < generators.length; i++) {
                const { done, value } = generators[i].next();

                if (value == MatchResult.Pass) {
                    yield MatchResult.Pass;
                } else if (value == MatchResult.Fail || done) {
                    options--;

                    generators[i] = null;
                }
            }
        }

        if (options == 1) {
            for (let i = 0; i < generators.length; i++) {
                if (generators[i]) {
                    yield* generators[i];
                }
            }
        }

        yield MatchResult.Fail;
    }

    getMatchingType(data: any) {
        let generators = new Array(this.types.length);

        for (const type of this.types) {
            generators.push(type.matches(data));
        }

        let options = generators.length;
        let type = null;

        while (options > 1) {
            for (let i = 0; i < generators.length; i++) {
                const { done, value } = generators[i].next();

                if (value == MatchResult.Pass) {
                    type = this.types[i];
                } else if (value == MatchResult.Fail || done) {
                    options--;
                    
                    generators[i] = null;
                }
            }
        }

        if (options == 1) {
            for (let i = 0; i < generators.length; i++) {
                if (generators[i]) type = this.types[i];
            }
        }

        return type;
    }
}