import { ConstructingDataType } from "../../data/types/constructing-data-type.js";
import { LocalizedEvent } from "./localized-event.js";

export class LocalizedEventDataType<T extends { location: { x: number, y: number, z: number } }> implements ConstructingDataType<LocalizedEvent, T> {

}