import fs from 'fs/promises';
import { Task } from '../task.js';

export class ListTask extends Task<string[]> {
    constructor(private directory: string) {
        super(`List ${directory}`);
    }

    async execute(): Promise<string[]> {
        let files: string[];

        try {
            files = await fs.readdir(this.directory);
        } catch (err) {
            throw new Error("Failed to read directory: ", err.stack);
        }

        return files;
    }
}