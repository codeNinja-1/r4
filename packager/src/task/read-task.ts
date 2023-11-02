import fs from 'fs/promises';
import { Task } from "../task.js";

export class ReadTask extends Task<Buffer> {
    constructor(private file: string) {
        super(`Read ${file}`);
    }

    async execute(): Promise<Buffer> {
        let files: Buffer;

        try {
            files = await fs.readFile(this.file);
        } catch (err) {
            throw new Error("Failed to read directory: ", err.stack);
        }

        return files;
    }
}