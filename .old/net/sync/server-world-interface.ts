import { OrDataType } from "../../data/types/nullable-data-type.js";
import { WorldInterface } from "./world-interface.js";
import { WorldOptionsDataType } from "./world-options-data-type.js";
import { WorldOptionsData } from "./world-options-data.js";
import { WorldPaths } from "./world-paths.js";
import fs from 'fs/promises';

export class ServerWorldInterface implements WorldInterface {
    path: string;
    private options: WorldOptionsData;
    private optionsType: WorldOptionsDataType = new WorldOptionsDataType();

    constructor(path: string) {
        this.path = path;
    }

    setupStorage(): Promise<void> {
        return Promise.resolve();
    }

    async getOptions(): Promise<WorldOptionsData> {
        if (this.options) return this.options;

        const filePath = WorldPaths.getOptionsFile(this.path);

        let fileData: Buffer;
        try {
            fileData = await fs.readFile(filePath);
        } catch (err) {
            throw new Error("World options file not found\n" + err.stack);
        }

        return this.optionsType.decode(new DataView(fileData.buffer), 0).data;
    }

    trigger(event: WorldEvent): void;
}