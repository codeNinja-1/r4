import { Entity } from "../entity/entity.js";

export abstract class EntityPrototype<E extends Entity> {
    abstract createEntity(): E;

    abstract setup(): Promise<void>;
}