export class ChunkDataReferencer {
    _chunkWidth: number;
    _chunkHeight: number;
    _chunkDepth: number;

    constructor({ chunkWidth = 16, chunkHeight = 16, chunkDepth = 32 } = {}) {
        this._chunkWidth = chunkWidth;
        this._chunkHeight = chunkHeight;
        this._chunkDepth = chunkDepth;
    }

    get cellsInChunk() {
        return this._chunkWidth * this._chunkHeight * this._chunkDepth;
    }

    indexOfPosition(x: number, y: number, z: number): number {
        if (x < 0 || x >= this._chunkWidth) throw new Error(`Coordinate X in chunk is out of bounds: 0 ≤ ${x} < ${this._chunkWidth}`);
        if (y < 0 || y >= this._chunkHeight) throw new Error(`Coordinate Y in chunk is out of bounds: 0 ≤ ${y} < ${this._chunkHeight}`);
        if (z < 0 || z >= this._chunkDepth) throw new Error(`Coordinate Z in chunk is out of bounds: 0 ≤ ${z} < ${this._chunkDepth}`);

        return x + y * this._chunkWidth + z * this._chunkWidth * this._chunkHeight;
    }

    xOfIndex(index: number): number {
        return index % this._chunkWidth;
    }

    yOfIndex(index: number): number {
        return Math.floor(index / this._chunkWidth) % this._chunkHeight;
    }

    zOfIndex(index: number): number {
        return Math.floor(index / (this._chunkWidth * this._chunkHeight));
    }
}