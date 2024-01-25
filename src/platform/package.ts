import { Platform } from "./platform.js";

export abstract class Package {
    abstract setup(platform: Platform): Promise<void>;
    abstract get id(): string;
}