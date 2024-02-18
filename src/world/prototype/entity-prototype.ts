import { Entity } from "../entity.js";

export abstract class EntityPrototype<E extends Entity> {
    abstract instantiate(): E;
}