import { ChunkInterface } from "../chunk-interface.js";
import { World } from "../world.js";

export class ChunkLoadQueue {
    private chunks: ChunkInterface[][] = [];

    constructor(private world: World) {
        // TODO: Only for development
        ((window as any).__dev__ ??= {}).clq = this;
    }

    has(state: number): boolean {
        return this.chunks[state] && this.chunks[state].length > 0;
    }

    add(chunk: ChunkInterface): void {
        const loadState = chunk.loadState;

        if (!this.chunks[loadState.current]) {
            this.chunks[loadState.current] = [];
        }

        if (!this.chunks[loadState.current].includes(chunk)) {
            this.chunks[loadState.current].push(chunk);
        }
    }

    remove(chunk: ChunkInterface): void {
        const loadState = chunk.loadState;

        let array = this.chunks[loadState.current];
        
        array.splice(array.indexOf(chunk), 1);
    }

    entries() {
        return this.chunks;
    }
}