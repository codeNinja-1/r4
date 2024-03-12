import { Entity } from "../entity/entity.js";
import { EntityPrototype } from "./entity-prototype.js";

export abstract class BaseEntityPrototype<E extends Entity> implements EntityPrototype<E> {
    abstract createEntity(): E;

    async setup(): Promise<void> {
    }
}