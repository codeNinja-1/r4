import { DecodedData } from "../decoded-data.js";
import { MatchResult } from "./match-result.js";

export interface DataType<T> {
    encode(data: T): Generator<ArrayBuffer>;
    decode(view: DataView, index: number): DecodedData<T>;
    matches(object: any): Generator<MatchResult>;
}