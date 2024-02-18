var GameRuntimeType;
(function (GameRuntimeType) {
    GameRuntimeType[GameRuntimeType["Singleplayer"] = 0] = "Singleplayer";
    GameRuntimeType[GameRuntimeType["MultiplayerClient"] = 1] = "MultiplayerClient";
    GameRuntimeType[GameRuntimeType["MultiplayerServer"] = 2] = "MultiplayerServer";
})(GameRuntimeType || (GameRuntimeType = {}));

class EventClock {
    tasks = new Set();
    delta = 0;
    time = 0;
    constructor() {
    }
    runOnce(task) {
        const wrapper = () => {
            task();
            this.unschedule(wrapper);
        };
        this.schedule(wrapper);
    }
    schedule(task) {
        this.tasks.add(task);
    }
    unschedule(task) {
        this.tasks.delete(task);
    }
    getDelta() {
        return this.delta;
    }
    getCurrentTime() {
        return this.time;
    }
    async start() {
        let start = Date.now();
        for (const task of this.tasks) {
            await task();
        }
        this.delta = Date.now() - start;
        this.time++;
    }
}

class InitDispatcher {
    tasks;
    constructor() {
        this.tasks = new Set();
    }
    schedule(name, timing, func) {
        if (func instanceof Function && typeof timing == 'number') {
            this.tasks.add(new InitTask(name, func, timing));
        }
        else if (typeof func == 'number') {
            return (f, _context) => this.schedule(name, timing, f);
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    unschedule(func) {
        for (const task of this.tasks) {
            if (task.func == func) {
                this.tasks.delete(task);
                break;
            }
        }
    }
    async run() {
        let start = Date.now();
        let timings = [];
        for (const task of this.tasks) {
            timings[task.timing] = timings[task.timing] || [];
            timings[task.timing].push(task);
        }
        for (const timing of timings) {
            console.log("InitDispatcher: Beginning tasks of Timing." + timing[0].timing + " in parallel.");
            await new Promise((resolve) => {
                let resolved = 0;
                for (const task of timing) {
                    task.func().then(() => {
                        resolved++;
                        if (resolved == timing.length) {
                            resolve();
                        }
                    });
                }
            });
        }
        let end = Date.now();
        console.log("Game started in " + (end - start) + "ms.");
    }
}
class InitTask {
    name;
    func;
    timing;
    constructor(name, func, timing) {
        this.name = name;
        this.func = func;
        this.timing = timing;
    }
}
(function (InitDispatcher) {
    (function (Timing) {
        Timing["Cache"] = "Cache";
        Timing["Instantiate"] = "Instantiate";
        Timing["Register"] = "Register";
        Timing["Build"] = "Build";
    })(InitDispatcher.Timing || (InitDispatcher.Timing = {}));
})(InitDispatcher || (InitDispatcher = {}));

class Vector2D {
    x;
    y;
    constructor(x = 0, y = 0) {
        if (typeof x !== 'number')
            throw new TypeError('x must be a number');
        if (typeof y !== 'number')
            throw new TypeError('y must be a number');
        if (isNaN(x))
            throw new TypeError('x must not be NaN');
        if (isNaN(y))
            throw new TypeError('y must not be NaN');
        this.x = x;
        this.y = y;
    }
    add(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x + x, this.y + y);
            }
            else {
                return this._set(this.x + x, this.y + x);
            }
        }
        else {
            return this._set(this.x + x.x, this.y + x.y);
        }
    }
    subtract(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x - x, this.y - y);
            }
            else {
                return this._set(this.x - x, this.y - x);
            }
        }
        else {
            return this._set(this.x - x.x, this.y - x.y);
        }
    }
    reverseSubtract(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(x - this.x, y - this.y);
            }
            else {
                return this._set(x - this.x, x - this.y);
            }
        }
        else {
            return this._set(x.x - this.x, x.y - this.y);
        }
    }
    complexMultiply(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x * x - this.y * y, this.x * y + this.y * x);
            }
            else {
                return this._set(this.x * x, this.y * x);
            }
        }
        else {
            return this._set(this.x * x.x - this.y * x.y, this.x * x.y + this.y * x.x);
        }
    }
    scalarMultiply(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x * x, this.y * y);
            }
            else {
                return this._set(this.x * x, this.y * x);
            }
        }
        else {
            return this._set(this.x * x.x, this.y * x.y);
        }
    }
    scalarDivide(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(this.x / x, this.y / y);
            }
            else {
                return this._set(this.x / x, this.y / x);
            }
        }
        else {
            return this._set(this.x / x.x, this.y / x.y);
        }
    }
    reverseScalarDivide(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this._set(x / this.x, y / this.y);
            }
            else {
                return this._set(x / this.x, x / this.y);
            }
        }
        else {
            return this._set(x.x / this.x, x.y / this.y);
        }
    }
    dot(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return this.x * x + this.y * y;
            }
            else {
                return this.x * x + this.y * x;
            }
        }
        else {
            return this.x * x.x + this.y * x.y;
        }
    }
    length() {
        return Math.sqrt(this.lengthSquared());
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }
    distanceTo(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return Math.sqrt(this.distanceSquaredTo(x, y));
            }
            else {
                return Math.sqrt(this.distanceSquaredTo(x, x));
            }
        }
        else {
            return Math.sqrt(this.distanceSquaredTo(x.x, x.y));
        }
    }
    distanceSquaredTo(x, y) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
                return (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y);
            }
            else {
                return (this.x - x) * (this.x - x) + (this.y - x) * (this.y - x);
            }
        }
        else {
            return (this.x - x.x) * (this.x - x.x) + (this.y - x.y) * (this.y - x.y);
        }
    }
    normalize() {
        return this.scalarDivide(this.length());
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
    toString() {
        return `${this.constructor.name} { ${this.x}, ${this.y} }`;
    }
    clone() {
        return new this.constructor(this.x, this.y);
    }
    static *_from(vector, format) {
        yield format[0] == 'x' ? vector.x : format[0] == 'y' ? vector.y : format[0] == 'z' ? vector.z : format[0] == '1' ? 1 : 0;
        yield format[1] == 'x' ? vector.x : format[1] == 'y' ? vector.y : format[1] == 'z' ? vector.z : format[1] == '1' ? 1 : 0;
    }
    equals(other) {
        return this.x === other.x && this.y === other.y;
    }
}

class ImmutableVector2D extends Vector2D {
    constructor(x = 0, y = 0) {
        super(x, y);
    }
    _set(x, y) {
        return new ImmutableVector2D(x, y);
    }
    set(x, y) {
        throw new Error("Cannot set immutable vector");
    }
    static from(vector, format) {
        return new ImmutableVector2D(...Vector2D._from(vector, format));
    }
}

class Vector3D {
    x;
    y;
    z;
    constructor(x = 0, y = 0, z = 0) {
        if (typeof x !== 'number')
            throw new TypeError('x must be a number');
        if (typeof y !== 'number')
            throw new TypeError('y must be a number');
        if (typeof z !== 'number')
            throw new TypeError('z must be a number');
        if (isNaN(x))
            throw new TypeError('x must not be NaN');
        if (isNaN(y))
            throw new TypeError('y must not be NaN');
        if (isNaN(z))
            throw new TypeError('z must not be NaN');
        this.x = x;
        this.y = y;
        this.z = z;
    }
    add(x, y, z) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                return this._set(this.x + x, this.y + y, this.z + z);
            }
            else {
                return this._set(this.x + x, this.y + x, this.z + x);
            }
        }
        else {
            return this._set(this.x + x.x, this.y + x.y, this.z + x.z);
        }
    }
    subtract(x, y, z) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                return this._set(this.x - x, this.y - y, this.z - z);
            }
            else {
                return this._set(this.x - x, this.y - x, this.z - x);
            }
        }
        else {
            return this._set(this.x - x.x, this.y - x.y, this.z - x.z);
        }
    }
    reverseSubtract(x, y, z) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                return this._set(x - this.x, y - this.y, z - this.z);
            }
            else {
                return this._set(x - this.x, x - this.y, x - this.z);
            }
        }
        else {
            return this._set(x.x - this.x, x.y - this.y, x.z - this.z);
        }
    }
    complexMultiply(x, y, z) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                return this._set(this.x * x - this.y * y, this.x * y + this.y * x, this.z * z);
            }
            else {
                return this._set(this.x * x, this.y * x, this.z * x);
            }
        }
        else {
            return this._set(this.x * x.x - this.y * x.y, this.x * x.y + this.y * x.x, this.z * x.z);
        }
    }
    scalarMultiply(x, y, z) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                return this._set(this.x * x, this.y * y, this.z * z);
            }
            else {
                return this._set(this.x * x, this.y * x, this.z * x);
            }
        }
        else {
            return this._set(this.x * x.x, this.y * x.y, this.z * x.z);
        }
    }
    scalarDivide(x, y, z) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                return this._set(this.x / x, this.y / y, this.z / z);
            }
            else {
                return this._set(this.x / x, this.y / x, this.z / x);
            }
        }
        else {
            return this._set(this.x / x.x, this.y / x.y, this.z / x.z);
        }
    }
    reverseScalarDivide(x, y, z) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                return this._set(x / this.x, y / this.y, this.z / z);
            }
            else if (typeof z == 'number') {
                return this._set(x / this.x, x / this.y, this.z / z);
            }
            else {
                throw new Error("Invalid syntax");
            }
        }
        else if (typeof z == 'number') {
            return this._set(x.x / this.x, x.y / this.y, x.z / this.z);
        }
    }
    dot(x, y, z) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                return this.x * x + this.y * y + this.z * z;
            }
            else {
                return this.x * x + this.y * x + this.z * x;
            }
        }
        else {
            return this.x * x.x + this.y * x.y + this.z * x.z;
        }
    }
    length() {
        return Math.sqrt(this.lengthSquared());
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }
    distanceTo(x, y, z) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                return Math.sqrt(this.distanceSquaredTo(x, y, z));
            }
            else {
                return Math.sqrt(this.distanceSquaredTo(x, x, x));
            }
        }
        else {
            return Math.sqrt(this.distanceSquaredTo(x.x, x.y, x.z));
        }
    }
    distanceSquaredTo(x, y, z) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                return (this.x - x) ** 2 + (this.y - y) ** 2 + (this.z - z) ** 2;
            }
            else {
                return (this.x - x) ** 2 + (this.y - x) ** 2 + (this.z - x) ** 2;
            }
        }
        else {
            return (this.x - x.x) ** 2 + (this.y - x.y) ** 2 + (this.z - x.z) ** 2;
        }
    }
    normalize() {
        return this.scalarDivide(this.length());
    }
    *[Symbol.iterator]() {
        yield this.x;
        yield this.y;
    }
    toString() {
        return `${this.constructor.name} { ${this.x}, ${this.y} }`;
    }
    clone() {
        return new this.constructor(this.x, this.y, this.z);
    }
    static *_from(vector, format) {
        yield format[0] == 'x' ? vector.x : format[0] == 'y' ? vector.y : format[0] == '1' ? 1 : 0;
        yield format[1] == 'x' ? vector.x : format[1] == 'y' ? vector.y : format[1] == '1' ? 1 : 0;
        yield format[2] == 'x' ? vector.x : format[2] == 'y' ? vector.y : format[2] == '1' ? 1 : 0;
    }
    equals(other) {
        return this.x == other.x && this.y == other.y && this.z == other.z;
    }
}

class ImmutableVector3D extends Vector3D {
    constructor(x = 0, y = 0, z = 0) {
        super(x, y, z);
    }
    _set(x, y, z) {
        return new ImmutableVector3D(x, y, z);
    }
    set(x, y, z) {
        throw new Error("Cannot set immutable vector");
    }
    static from(vector, format) {
        return new ImmutableVector3D(...Vector3D._from(vector, format));
    }
}

class MutableVector3D extends Vector3D {
    constructor(x = 0, y = 0, z = 0) {
        super(x, y, z);
    }
    _set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    static from(vector, format) {
        return new MutableVector3D(...Vector3D._from(vector, format));
    }
}

/**
 * A `ChunkDataReferencer` converts between indexes and
 * positions in chunk data for given chunk dimensions.
 *
 * * The `index()` method converts a position to an
 * index in chunk data.
 * * The `position()` method converts an index in chunk
 * data to a position, based on the underlying `x()`,
 * `y()`, and `z()` methods.
 * * The `dimensions` property is a 3D vector containing
 * the dimensions of the chunk.
 * * The `cells` property is the total number of cells
 * in a chunk, equal to `dimensions.x * dimensions.y *
 * dimensions.z`.
 */
class ChunkDataReferencer {
    /**
     * The dimensions of the chunk as a 3D vector.
     */
    static dimensions = new ImmutableVector3D(8, 8, 32);
    /**
     * Returns the total number of cells in a chunk.
     */
    static get cells() {
        return this.dimensions.x * this.dimensions.y * this.dimensions.z;
    }
    static index(x, y, z) {
        if (x instanceof Vector3D) {
            y = x.y;
            z = x.z;
            x = x.x;
        }
        else {
            if (y === undefined || z === undefined)
                throw new Error(`Invalid arguments`);
        }
        if (x < 0 || x >= this.dimensions.x || y < 0 || y >= this.dimensions.y || z < 0 || z >= this.dimensions.z)
            throw new Error(`Coordinates are out of bounds`);
        return x + y * this.dimensions.x + z * this.dimensions.x * this.dimensions.y;
    }
    /**
     * Computes the x position of a specified chunk
     * data index. This can be used with the `y()` and
     * `z()` methods to get the complete position
     * without creating a vector.
     */
    static x(index) {
        return index % this.dimensions.x;
    }
    /**
     * Computes the y position of a specified chunk
     * data index. This can be used with the `x()`
     * and `z()` methods to get the complete position
     * without creating a vector.
     */
    static y(index) {
        return Math.floor(index / this.dimensions.x) % this.dimensions.y;
    }
    /**
     * Computes the z position of a specified chunk
     * data index. This can be used with the `x()` and
     * `y()` methods to get the complete position
     * without creating a vector.
     */
    static z(index) {
        return Math.floor(index / (this.dimensions.x * this.dimensions.y));
    }
    /**
     * Computes the position of a specified chunk data
     * index. Equivalent to calling `x()`, `y()`, and
     * `z()`, then assembling a `Vector3D` from the
     * components.
     *
     * The method is the opposite of `index()`.
     */
    static position(index) {
        return new MutableVector3D(this.x(index), this.y(index), this.z(index));
    }
}

class Registry {
    data;
    constructor() {
        this.data = new Map();
    }
    entries() {
        return this.data.entries();
    }
    get(identifier) {
        return this.data.get(identifier);
    }
    register(identifier, object) {
        this.data.set(identifier, object);
    }
}

class BlockPrototypeRegistry extends Registry {
    idsToPrototypes;
    get(id) {
        if (typeof id == 'string')
            return super.get(id);
        return this.idsToPrototypes.get(id);
    }
    async allocateBlockIds() {
        this.idsToPrototypes = new Map();
        let id = 0;
        for (const [name, block] of this.entries()) {
            block.bindBlockReferences(id, name);
            this.idsToPrototypes.set(id, block);
            id++;
        }
    }
}

var Registries;
(function (Registries) {
    Registries.blocks = new BlockPrototypeRegistry();
    Registries.entities = new Registry();
    Registries.fields = new Registry();
})(Registries || (Registries = {}));

/**
 * The ChunkDataFields allows multiple fields to be allocated
 * before creating chunks.
 *
 * * Fields may be allocated in the `Registry.Fields` map.
 * * A map of `ChunkDataField` objects can be instantiated
 * using the `initialize()` method.
 */
var ChunkDataFields;
(function (ChunkDataFields) {
    function initialize() {
        const fields = new Map();
        for (const [id, field] of Registries.fields.entries()) {
            fields.set(id, field.instantiate());
        }
        return fields;
    }
    ChunkDataFields.initialize = initialize;
})(ChunkDataFields || (ChunkDataFields = {}));

class BlockPrototype {
}

class BlockPosition {
    position;
    reference;
    constructor(x, y, z, reference) {
        if (x instanceof Vector3D) {
            if (y instanceof World || y instanceof ChunkData) {
                this.position = x;
                this.reference = y;
            }
            else {
                throw new Error("Invalid arguments");
            }
        }
        else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number' && reference instanceof World) {
            this.position = new ImmutableVector3D(x, y, z);
            this.reference = reference;
        }
        else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number' && reference instanceof ChunkData) {
            this.position = new ImmutableVector3D(x, y, z);
            this.reference = reference;
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    getGlobalPosition() {
        if (this.reference instanceof World) {
            return this.position.clone();
        }
        else {
            const chunk = this.reference.getChunk();
            if (!chunk) {
                throw new Error("Cannot get global position of disconnected ChunkData");
            }
            const position = chunk.getPosition();
            return this.position.clone().add(ImmutableVector3D.from(position, "x0y"));
        }
    }
    getLocalPosition() {
        if (this.reference instanceof ChunkData) {
            return this.position.clone();
        }
        else {
            return this.position.clone().subtract(ImmutableVector3D.from(this.getChunkPosition(), 'x0y'));
        }
    }
    getChunkPosition() {
        if (this.reference instanceof ChunkData) {
            const chunk = this.reference.getChunk();
            if (!chunk) {
                throw new Error("Cannot get global position of disconnected ChunkData");
            }
            return chunk.getPosition();
        }
        else {
            const chunkX = Math.floor(this.position.x / ChunkDataReferencer.dimensions.x);
            const chunkZ = Math.floor(this.position.z / ChunkDataReferencer.dimensions.z);
            return new ImmutableVector2D(chunkX, chunkZ);
        }
    }
    getWorld() {
        if (this.reference instanceof World) {
            return this.reference;
        }
        else {
            const chunk = this.reference.getChunk();
            if (!chunk) {
                throw new Error("Cannot get world of disconnected ChunkData");
            }
            return chunk.getWorld();
        }
    }
    getChunkData() {
        if (this.reference instanceof ChunkData) {
            return this.reference;
        }
        else {
            const position = this.getChunkPosition();
            const chunk = this.getWorld().getChunk(position);
            if (!chunk) {
                throw new Error("Cannot get chunk data of disconnected world");
            }
            return chunk.getChunkData();
        }
    }
    getChunk() {
        if (this.reference instanceof ChunkData) {
            const chunk = this.reference.getChunk();
            if (!chunk) {
                throw new Error("Cannot get chunk of disconnected ChunkData");
            }
            return chunk;
        }
        else {
            const position = this.getChunkPosition();
            const chunk = this.getWorld().getChunk(position);
            if (!chunk) {
                throw new Error("Cannot get chunk not in world");
            }
            return chunk;
        }
    }
}

class ChunkData {
    chunk = null;
    fields;
    entities = new Set();
    constructor() {
        this.fields = ChunkDataFields.initialize();
    }
    getEntities() {
        return new Set(...this.entities.entries());
    }
    getChunk() {
        return this.chunk;
    }
    addEntity(entity) {
        this.entities.add(entity);
    }
    removeEntity(entity) {
        this.entities.delete(entity);
    }
    getField(id) {
        if (!this.fields.has(id)) {
            throw new Error(`Field id '${id}' is not allocated`);
        }
        return this.fields.get(id);
    }
    getBlock(x, y, z) {
        if (x instanceof BlockPosition) {
            return this.getField('blockId').get(x.getGlobalPosition());
        }
        else if (x instanceof Vector3D) {
            return this.getField('blockId').get(x);
        }
        else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
            return this.getField('blockId').get(x, y, z);
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    setBlock(x, y, z, block) {
        if (x instanceof BlockPosition && y instanceof BlockPrototype) {
            this.setBlock(x.getGlobalPosition(), y);
        }
        else if (x instanceof Vector3D && y instanceof BlockPrototype) {
            this.getField('blockId').set(x, y);
        }
        else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number' && block instanceof BlockPrototype) {
            this.getField('blockId').set(x, y, z, block);
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
}

class ChunkInterface {
    unloadChunk() { }
    setupChunk() { }
    tickChunk() { }
}
(function (ChunkInterface) {
    class NonPlaceholder extends ChunkInterface {
        isPlaceholder() { return false; }
    }
    ChunkInterface.NonPlaceholder = NonPlaceholder;
    class Placeholder extends ChunkInterface {
        isPlaceholder() { return true; }
    }
    ChunkInterface.Placeholder = Placeholder;
})(ChunkInterface || (ChunkInterface = {}));

class Chunk extends ChunkInterface.NonPlaceholder {
    position;
    world = null;
    chunkData;
    constructor() {
        super();
        this.position = new ImmutableVector2D();
    }
    setChunkData(chunkData) {
        this.chunkData = chunkData;
    }
    getPosition() {
        return this.position;
    }
    getWorld() {
        if (!this.world)
            throw new Error("Cannot get world of unbound chunk");
        return this.world;
    }
    getChunkData() {
        return this.chunkData;
    }
    bindWorld(world, position) {
        this.world = world;
        this.position = new ImmutableVector2D(position.x, position.y);
    }
    unloadChunk() {
        if (!this.world)
            throw new Error("Cannot unload unbound chunk");
        for (const entity of this.chunkData.getEntities()) {
            this.world.entityIdMapping.delete(entity.id);
        }
    }
    setupChunk() {
        if (!this.world)
            throw new Error("Cannot setup unbound chunk");
        this.chunkData = new ChunkData();
    }
    tickChunk() {
    }
}

class PlaceholderChunk extends ChunkInterface.Placeholder {
    position;
    world;
    getPosition() {
        return this.position;
    }
    getWorld() {
        if (!this.world)
            throw new Error("Cannot get world of unbound chunk");
        return this.world;
    }
    getChunkData() {
        throw new Error("Chunk data does not exist on placeholder");
    }
    bindWorld(world, position) {
    }
    unloadChunk() { }
    setupChunk() { }
    tickChunk() { }
}

class World {
    entityIdMapping;
    chunks;
    loader;
    constructor() {
        this.entityIdMapping = new Map();
        this.chunks = new Map();
    }
    bindWorldLoader(loader) {
        this.loader = loader;
    }
    createChunk(x, z) {
        if (x instanceof Vector2D) {
            z = x.y;
            x = x.x;
        }
        const chunk = new Chunk();
        chunk.bindWorld(this, new ImmutableVector2D(x, z));
        chunk.setupChunk();
        return chunk;
    }
    getChunk(x, z) {
        if (x instanceof Vector2D) {
            z = x.y;
            x = x.x;
        }
        return this.chunks.get(x + '.' + z) || null;
    }
    addEntity(entity) {
        this.entityIdMapping.set(entity.id, entity);
        const chunk = this.getChunk(Math.floor(entity.position.x / ChunkDataReferencer.dimensions.x), Math.floor(entity.position.z / ChunkDataReferencer.dimensions.z));
        if (!chunk) {
            throw new Error("Cannot add entity to world: Chunk does not exist");
        }
        entity._joinWorld(this);
        if (!chunk.isPlaceholder()) {
            chunk.getChunkData().addEntity(entity);
            entity._updateCurrentChunk(null);
        }
        else {
            entity._updateCurrentChunk(chunk);
        }
        return entity;
    }
    removeEntity(entity) {
        entity._leaveWorld();
        this.entityIdMapping.delete(entity.id);
    }
    _validateDisconnectedEntities() {
        for (const entity of this.entityIdMapping.values()) {
            if (!entity.chunk) {
                console.warn("Entity is not in a chunk\n", entity);
            }
        }
    }
    tick() {
        for (const entity of this.entityIdMapping.values()) {
            entity.tick();
        }
        for (const [_id, chunk] of this.chunks) {
            chunk.tickChunk();
        }
        this._validateDisconnectedEntities();
    }
    loadChunk(x, z) {
        let position;
        if (typeof x === 'number') {
            if (typeof z !== 'number') {
                throw new Error("Invalid arguments");
            }
            else {
                position = new ImmutableVector2D(x, z);
            }
        }
        else {
            position = new ImmutableVector2D(x.x, x.y);
        }
        if (this.getChunk(position)) {
            throw new Error("Cannot load chunk where another chunk already exists");
        }
        if (!this.loader) {
            throw new Error("Cannot load chunk: World has no loader");
        }
        const placeholder = new PlaceholderChunk();
        this.chunks.set(position.x + '.' + position.y, placeholder);
        this.loader.loadChunk(position).then(chunkData => {
            const chunk = new Chunk();
            chunk.bindWorld(this, position);
            chunk.setChunkData(chunkData);
            this.chunks.set(position.x + '.' + position.y, chunk);
            for (const entity of this.entityIdMapping.values()) {
                if (!entity.chunk)
                    continue;
                if (entity.chunk.getPosition().equals(position)) {
                    entity._updateCurrentChunk(chunk);
                }
            }
        });
        return new PlaceholderChunk();
    }
}

/**
 * A ChunkDataField is an object where data for each
 * block in a chunk can be contained.
 */
class ChunkDataField {
    get(x, y, z) {
        if (typeof x == 'number' && typeof y == 'undefined') {
            return this._get(x);
        }
        else if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number') {
            return this._get(ChunkDataReferencer.index(x, y, z));
        }
        else if (x instanceof Vector3D) {
            return this._get(ChunkDataReferencer.index(x));
        }
        else if (x instanceof BlockPosition) {
            return this.get(x.getLocalPosition());
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    set(x, y, z, value) {
        if (typeof x == 'number' && typeof y != 'number') {
            return this._set(x, y);
        }
        else if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number' && typeof value != 'undefined') {
            return this._set(ChunkDataReferencer.index(x, y, z), value);
        }
        else if (x instanceof Vector3D && typeof y != 'number') {
            return this._set(ChunkDataReferencer.index(x), y);
        }
        else if (x instanceof BlockPosition && typeof y != 'number') {
            return this._set(ChunkDataReferencer.index(x.getLocalPosition()), y);
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
}

/**
 * Represents a field for any size of `number`.
 */
class ChunkDataNumberField extends ChunkDataField {
    type;
    array;
    constructor(type) {
        super();
        this.type = type;
        this.array = ChunkDataNumberField.typedArray(type, ChunkDataReferencer.cells);
    }
    _get(index) {
        if (this.type == "u4" || this.type == "i4") {
            const item = this.array[Math.floor(index / 2)];
            if (index % 2 == 0) {
                return item & 0x0F;
            }
            else {
                return item >> 4;
            }
        }
        else if (this.type == "u64" || this.type == "i64") {
            return Number(this.array[index]);
        }
        else {
            return this.array[index];
        }
    }
    _set(index, value) {
        if (this.type == "u4" || this.type == "i4") {
            const itemIndex = Math.floor(index / 2);
            const item = this.array[itemIndex];
            if (index % 2 == 0) {
                this.array[itemIndex] = (item & 0xF0) | value;
            }
            else {
                this.array[itemIndex] = (item & 0x0F) | (value << 4);
            }
        }
        else if (this.type == "u64" || this.type == "i64") {
            this.array[index] = BigInt(value);
        }
        else {
            this.array[index] = value;
        }
    }
    /**
     * Create a typed array of a given `ChunkDataNumberType` and length.
     */
    static typedArray(type, length) {
        if (type == "u4")
            return new Uint8Array(length / 2);
        if (type == "u8")
            return new Uint8Array(length);
        if (type == "u16")
            return new Uint16Array(length);
        if (type == "u32")
            return new Uint32Array(length);
        if (type == "u64")
            return new BigUint64Array(length);
        if (type == "i8")
            return new Int8Array(length);
        if (type == "i16")
            return new Int16Array(length);
        if (type == "i32")
            return new Int32Array(length);
        if (type == "i64")
            return new BigInt64Array(length);
        if (type == "f32")
            return new Float32Array(length);
        if (type == "f64")
            return new Float64Array(length);
        throw new Error(`Unknown array type: ${type}`);
    }
}

/**
 * Represents an allocation of a field for any size of `number`.
 */
class ChunkDataNumberAllocation {
    type;
    /**
     * Constructs a new `ChunkDataNumberAllocation`
     * object with a given number type, represented
     * as a `ChunkDataNumberType`.
     */
    constructor(type) {
        this.type = type;
    }
    instantiate() {
        return new ChunkDataNumberField(this.type);
    }
}

/**
 * A `ChunkInstanceReferencer` stores the address in GPU memory of each represented block in a chunk.
 * It also specifies the GPU data that should be sent to the GPU for each block (for now, just the position).
 */
class ChunkInstanceReferencer {
    getChunkSize() {
        return ChunkDataReferencer.cells;
    }
    getGPUDataSize() {
        return 2;
    }
    getGPUData(chunk, index) {
        if (!chunk.getWorld())
            throw new Error("Rendered chunks should be in a world");
        const array = new Uint16Array([index]);
        return array.buffer;
    }
    getAddress(chunk, index) {
        if (!chunk.getWorld())
            throw new Error("Rendered chunks should be in a world");
        const field = chunk.getChunkData().getField('instance_address');
        if (!field) {
            throw new Error("Instance address field not found.");
        }
        return field.get(ChunkDataReferencer.x(index), ChunkDataReferencer.y(index), ChunkDataReferencer.z(index));
    }
    setAddress(chunk, index, address) {
        const field = chunk.getChunkData().getField('instanceAddress');
        if (!field) {
            throw new Error("Instance address field not found.");
        }
        field.set(ChunkDataReferencer.x(index), ChunkDataReferencer.y(index), ChunkDataReferencer.z(index), address);
    }
    static async setup() {
        Registries.fields.register('instanceAddress', new ChunkDataNumberAllocation('i16'));
    }
}

class Game {
    static init = new InitDispatcher();
    static instance;
    _world;
    _clock = new EventClock();
    constructor() {
        this._world = new World();
    }
    async start() {
        await Game.init.run();
        Registries.blocks.allocateBlockIds();
        ChunkInstanceReferencer.setup();
    }
    isGameClient() {
        return this.getRuntimeType() === GameRuntimeType.Singleplayer || this.getRuntimeType() === GameRuntimeType.MultiplayerClient;
    }
    isGameServer() {
        return this.getRuntimeType() === GameRuntimeType.Singleplayer || this.getRuntimeType() === GameRuntimeType.MultiplayerServer;
    }
    isSingleplayer() {
        return this.getRuntimeType() === GameRuntimeType.Singleplayer;
    }
    isMultiplayer() {
        return this.getRuntimeType() === GameRuntimeType.MultiplayerClient || this.getRuntimeType() === GameRuntimeType.MultiplayerServer;
    }
    isMultiplayerServer() {
        return this.getRuntimeType() === GameRuntimeType.MultiplayerServer;
    }
    getWorld() {
        return this._world;
    }
    getClock() {
        return this._clock;
    }
    static _setMainInstance(instance) {
        Game.instance = instance;
    }
    static getInstance() {
        return Game.instance;
    }
}

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */


function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

class WorldRenderer {
}

class WebGPURenderer extends WorldRenderer {
    canvas;
    context;
    world;
    getCanvas() {
        return this.canvas;
    }
    setRenderedWorld(world) {
        this.world = world;
    }
    async setupRenderer() {
        if (!navigator.gpu) {
            throw new Error('WebGPU is not supported');
        }
        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
            throw new Error('No useable adapter found');
        }
        const device = await adapter.requestDevice();
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('webgpu');
        const format = navigator.gpu.getPreferredCanvasFormat();
        this.context.configure({
            device: device,
            format: format
        });
    }
    render() {
    }
    static supported = false;
    static async checkSupport() {
        if (!navigator.gpu) {
            throw new Error('WebGPU is not supported');
        }
        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
            throw new Error('No useable adapter found');
        }
    }
    static isSupported() {
        return this.supported;
    }
}
__decorate([
    Game.init.schedule("checkWebGPUSupport", InitDispatcher.Timing.Cache)
], WebGPURenderer, "checkSupport", null);

class Renderer {
    world;
    perspective;
    worldRenderer;
    canvas;
    constructor(world) {
        this.world = world;
    }
    getCanvas() {
        return this.canvas;
    }
    getWorld() {
        return this.world;
    }
    getPerspective() {
        return this.perspective;
    }
    setupRenderer() {
        if (WebGPURenderer.isSupported()) {
            this.worldRenderer = new WebGPURenderer();
        }
        else {
            throw new Error("No supported world renderer found");
        }
        this.worldRenderer.setupRenderer();
        this.worldRenderer.setRenderedWorld(this.world);
    }
}

class SimpleWorldGenerator {
    async generateChunk(location) {
        const data = new ChunkData();
        const stone = Registries.blocks.get('stone');
        if (!stone) {
            throw new Error('Stone block prototype not found');
        }
        for (let x = 0; x < ChunkDataReferencer.dimensions.x; x++) {
            for (let z = 0; z < ChunkDataReferencer.dimensions.z; z++) {
                data.setBlock(x, 0, z, stone);
            }
        }
        return data;
    }
}

class SingleplayerWorldLoader {
    worldGenerator;
    constructor(worldGenerator) {
        this.worldGenerator = worldGenerator;
    }
    loadChunk(location) {
        return this.worldGenerator.generateChunk(location);
    }
    saveChunk(location, chunk) {
        return Promise.resolve();
    }
    shouldUnloadChunks() {
        return false;
    }
}

class Client extends Game {
    renderer;
    worldGenerator;
    worldLoader;
    constructor() {
        super();
        this.worldGenerator = new SimpleWorldGenerator();
        this.worldLoader = new SingleplayerWorldLoader(this.worldGenerator);
        this.getWorld().bindWorldLoader(this.worldLoader);
        this.renderer = new Renderer(this.getWorld());
    }
    getRenderer() {
        return this.renderer;
    }
    getRuntimeType() {
        return GameRuntimeType.Singleplayer;
    }
    initGame() {
    }
    async start() {
        await super.start();
        this.renderer.setupRenderer();
    }
}

const client = new Client();
await client.start();
document.body.appendChild(client.getRenderer().getCanvas());
client.start();
//# sourceMappingURL=client.js.map
