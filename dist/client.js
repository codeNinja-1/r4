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
    updates = new Set();
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
    getBlockId(x, y, z) {
        if (x instanceof BlockPosition) {
            return this.getField('blockId').get(x.getGlobalPosition());
        }
        else if (x instanceof Vector3D) {
            return this.getField('blockId').get(x);
        }
        else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
            return this.getField('blockId').get(x, y, z);
        }
        else if (typeof x === 'number') {
            return this.getField('blockId').get(x);
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    getBlock(x, y, z) {
        if (x instanceof BlockPosition) {
            return Registries.blocks.get(this.getBlockId(x));
        }
        else if (x instanceof Vector3D) {
            return Registries.blocks.get(this.getBlockId(x));
        }
        else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number') {
            return Registries.blocks.get(this.getBlockId(x, y, z));
        }
        else if (typeof x === 'number') {
            return Registries.blocks.get(this.getBlockId(x));
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    setBlockId(x, y, z, block) {
        if (x instanceof BlockPosition && typeof y == 'number') {
            const localPostion = x.getLocalPosition();
            this.setBlockId(localPostion, y);
        }
        else if (x instanceof Vector3D && typeof y === 'number') {
            this.getField('blockId').set(x, y);
            this.updates.add(ChunkDataReferencer.index(x));
        }
        else if (typeof x === 'number' && typeof y === 'number' && typeof z === 'number' && typeof block == 'number') {
            this.getField('blockId').set(x, y, z, block);
            this.updates.add(ChunkDataReferencer.index(x, y, z));
        }
        else if (typeof x == 'number' && typeof y == 'number') {
            this.getField('blockId').set(x, y);
            this.updates.add(x);
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    setBlock(x, y, z, block) {
        if (x instanceof BlockPosition && y instanceof BlockPrototype) {
            this.setBlockId(x, y.getBlockId());
        }
        else if (x instanceof Vector3D && y instanceof BlockPrototype) {
            this.setBlockId(x, y.getBlockId());
        }
        else if (typeof x === 'number' && typeof y == 'number' && typeof z == 'number' && block instanceof BlockPrototype) {
            this.setBlockId(x, y, z, block.getBlockId());
        }
        else if (typeof x == 'number' && typeof y == 'number') {
            this.setBlockId(x, y);
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    getBlockUpdates() {
        return this.updates;
    }
    tickChunkData() {
        for (const update of this.updates) {
            const position = ChunkDataReferencer.position(update);
            const blockPrototype = this.getBlock(position);
            blockPrototype.whenTicked(new BlockPosition(position, this));
        }
        this.updates.clear();
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
        this.chunkData.tickChunkData();
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
 * Represents a field of the type `boolean`.
 */
class ChunkDataBitField extends ChunkDataField {
    array;
    constructor() {
        super();
        this.array = new Uint8Array(ChunkDataReferencer.cells / 8);
    }
    _get(index) {
        const item = this.array[Math.floor(index / 8)];
        return !!(item & (1 << (index % 8)));
    }
    _set(index, value) {
        const item = this.array[Math.floor(index / 8)];
        if (value) {
            this.array[Math.floor(index / 8)] = item | (1 << (index % 8));
        }
        else {
            this.array[Math.floor(index / 8)] = item & ~(1 << (index % 8));
        }
    }
}

/**
 * Represents an allocation of a field of the type `boolean`.
 */
class ChunkDataBitAllocation {
    instantiate() {
        return new ChunkDataBitField();
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
        return 4;
    }
    *getUpdates(chunk) {
        yield* chunk.getChunkData().getBlockUpdates();
    }
    getGPUData(chunk, index) {
        if (!chunk.getWorld())
            throw new Error("Rendered chunks should be in a world");
        const chunkData = chunk.getChunkData();
        const field = chunkData.getField("blockId");
        const array = new Uint16Array([index, field.get(index)]);
        return array.buffer;
    }
    getAddress(chunk, index) {
        const hasField = chunk.getChunkData().getField('hasInstance');
        const addressField = chunk.getChunkData().getField('instanceAddress');
        if (!addressField || !hasField) {
            throw new Error("Instance field not found.");
        }
        const x = ChunkDataReferencer.x(index);
        const y = ChunkDataReferencer.y(index);
        const z = ChunkDataReferencer.z(index);
        if (!hasField.get(x, y, z))
            return null;
        return addressField.get(x, y, z);
    }
    setAddress(chunk, index, address) {
        const hasField = chunk.getChunkData().getField('hasInstance');
        const addressField = chunk.getChunkData().getField('instanceAddress');
        if (!addressField || !hasField) {
            throw new Error("Instance field not found.");
        }
        const x = ChunkDataReferencer.x(index);
        const y = ChunkDataReferencer.y(index);
        const z = ChunkDataReferencer.z(index);
        hasField.set(x, y, z, address !== null);
        if (address !== null)
            addressField.set(x, y, z, address);
    }
    needsInstance(chunk, index) {
        const blockPrototype = chunk.getChunkData().getBlock(index);
        const blockPosition = new BlockPosition(ChunkDataReferencer.x(index), ChunkDataReferencer.y(index), ChunkDataReferencer.z(index), chunk.getChunkData());
        return blockPrototype.isRendered(blockPosition);
    }
    static async setup() {
        Registries.fields.register('instanceAddress', new ChunkDataNumberAllocation('i16'));
        Registries.fields.register('hasInstance', new ChunkDataBitAllocation());
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

class RenderWorldMirror {
    worldRenderer;
    referencer = new ChunkInstanceReferencer();
    chunks = new Map();
    constructor(worldRenderer) {
        this.worldRenderer = worldRenderer;
    }
    render() {
        for (const [position, chunk] of this.chunks) {
            chunk.renderChunk();
        }
    }
    getInstanceReferencer() {
        return this.referencer;
    }
    updateRenderedWorld() {
        const world = this.worldRenderer.getWorld();
        const perspective = this.worldRenderer.getPerspective();
        const perspectiveLocation = perspective.getChunkLocation();
        const renderDistance = perspective.getRenderDistance();
        const renderDistanceSquared = renderDistance ** 2;
        for (const [key, mirror] of this.chunks) {
            const chunk = world.getChunk(mirror.getPosition());
            if (!chunk)
                continue;
            if (chunk.isPlaceholder())
                continue;
            const chunkPosition = chunk.getPosition();
            if (chunkPosition.distanceSquaredTo(perspectiveLocation) > renderDistanceSquared) {
                this.chunks.delete(key);
            }
        }
        for (let x = perspectiveLocation.x - renderDistance; x <= perspectiveLocation.x + renderDistance; x++) {
            for (let z = perspectiveLocation.y - renderDistance; z <= perspectiveLocation.y + renderDistance; z++) {
                const chunk = world.getChunk(x, z);
                if (!chunk || chunk.isPlaceholder()) {
                    continue;
                }
                const key = x + '.' + z;
                const position = new ImmutableVector2D(x, z);
                if (!this.chunks.has(key)) {
                    this.chunks.set(key, this.worldRenderer.createRenderChunkMirror(position));
                }
            }
        }
    }
}

class WorldRenderer {
}

class WebGPUChunkMirror {
    position;
    worldRenderer;
    constructor(position, worldRenderer) {
        this.position = position;
        this.worldRenderer = worldRenderer;
    }
    renderChunk() {
        // Not implemented
    }
    getPosition() {
        return this.position;
    }
}

class WebGPURenderer extends WorldRenderer {
    renderer;
    canvas;
    context;
    world;
    renderedWorld;
    perspective;
    constructor(renderer) {
        super();
        this.renderer = renderer;
        this.canvas = document.createElement('canvas');
        this.renderedWorld = new RenderWorldMirror(this);
    }
    getCanvas() {
        return this.canvas;
    }
    getRenderer() {
        return this.renderer;
    }
    setWorld(world) {
        if (this.world)
            throw new Error('Cannot set rendered world twice');
        this.world = world;
    }
    getWorld() {
        return this.world;
    }
    async setupWorldRenderer() {
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
        this.renderedWorld.updateRenderedWorld();
        this.renderedWorld.render();
    }
    renderChunk(position) {
        // Not implemented
    }
    getPerspective() {
        return this.perspective;
    }
    setPerspective(perspective) {
        this.perspective = perspective;
    }
    createRenderChunkMirror(position) {
        return new WebGPUChunkMirror(position, this);
    }
    static async isSupported() {
        if (!navigator.gpu)
            return false;
        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter)
            return false;
        return true;
    }
}

class Renderer {
    world;
    worldRenderer;
    constructor(world) {
        this.world = world;
    }
    getElement() {
        if (!this.worldRenderer)
            throw new Error('No world renderer set');
        return this.worldRenderer.getCanvas();
    }
    getWorld() {
        return this.world;
    }
    async setupRenderer() {
        if (await WebGPURenderer.isSupported()) {
            this.worldRenderer = new WebGPURenderer(this);
        }
        else {
            throw new Error("No supported world renderer found");
        }
        this.worldRenderer.setupWorldRenderer();
        this.worldRenderer.setWorld(this.world);
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
document.body.appendChild(client.getRenderer().getElement());
client.start();
//# sourceMappingURL=client.js.map
