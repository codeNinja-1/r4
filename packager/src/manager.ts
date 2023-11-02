import { Task } from "./task.js";
import process from "node:process";

export class Manager {
    currentTask: Task<any> = null;

    constructor() {
        process.on('uncaughtException', (err) => {
            this.currentTask?.onError(err);
        });
    
        process.on('beforeExit', () => {
            this.currentTask?.onExit();
        });
    }

    execute<T>(task: Task<T>): Promise<T> {
        if (this.currentTask) {
            this.currentTask.onExpire();
        }

        this.currentTask = task;

        return task._execute();
    }

    // list(directory: string) {
    //     console.log(`List ${directory}`);
    // }

    // read(file: string) {
    //     console.log(`Read ${file}`);
    // }

    // write(file: string) {
    //     console.log(`Write ${file}`);
    // }

    // create(directory: string) {
    //     console.log(`Create ${directory}`);
    // }

    // remove(file: string) {
    //     console.log(`Remove ${file}`);
    // }

    // bundle(name: string) {
    //     console.log(`Bundling ${name}`);
    // }

    // move(from: string, to: string) {
    //     console.log(`Move ${from} to ${to}`);
    // }

    // copy(from: string, to: string) {
    //     console.log(`Copy ${from} to ${to}`);
    // }

    // error(error: any) {
    //     console.log(`Error: ${error.toString()}`);
    // }

    // success(time: number) {
    //     console.log(`✨ Packaged in ${time}ms`);
    // }
}