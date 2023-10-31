export namespace Logger {
    export function read(file: string) {
        return `Read ${file}`;
    }

    export function write(file: string) {
        return `Write ${file}`;
    }

    export function create(directory: string) {
        return `Create ${directory}`;
    }

    export function remove(file: string) {
        return `Remove ${file}`;
    }

    export function bundle(name: string) {
        return `Bundling ${name}`;
    }

    export function move(from: string, to: string) {
        return `Move ${from} to ${to}`;
    }

    export function copy(from: string, to: string) {
        return `Copy ${from} to ${to}`;
    }

    export function error(error: any) {
        return `Error: ${error.toString()}`;
    }
}