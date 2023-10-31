import fs from 'fs/promises';
import { Logger } from './logger.js';

export namespace Files {
    export function read(path: string): Promise<Buffer> {
        Logger.read(path);

        try {
            return fs.readFile(path);
        } catch (err) {
            Logger.error("Failed read file");
        }
    }

    export function write(path: string, data: Buffer | string): Promise<void> {
        Logger.write(path);

        try {
            return fs.writeFile(path, data);
        } catch (err) {
            Logger.error("Failed write file");
        }
    }

    export async function create(directory: string): Promise<void> {
        Logger.create(directory);

        try {
            await fs.mkdir(directory);
        } catch (err) {
            try {
                await fs.rm(directory, { recursive: true });
                await fs.mkdir(directory);
            } catch (err) {
                Logger.error("Failed to create directory");
            }
        }
    }

    export async function remove(path: string) {
        Logger.remove(path);

        try {
            await fs.rm(path);
        } catch (err) {
            Logger.error("Failed to remove file");
        }
    }
}