class Component {
    parent;
    constructor() {
        this.parent = null;
    }
    bind(child) {
        child.parent = this;
    }
    get element() {
        if (this._element)
            return this._element;
        this._element = this.render();
        return this._element;
    }
}

var DOM;
(function (DOM) {
    function element(tag, ...classes) {
        let element = document.createElement(tag);
        element.classList.add(...classes);
        return element;
    }
    DOM.element = element;
    function text(data) {
        return document.createTextNode(data);
    }
    DOM.text = text;
})(DOM || (DOM = {}));

class JoinScreen extends Component {
    _element;
    _nickname = null;
    _listeners = [];
    render() {
        const joinScreen = DOM.element('div', 'cubecraft-join-screen', 'cubecraft-screen');
        joinScreen.appendChild(DOM.element('div', 'cubecraft-flex-3'));
        const joinScreenTitle = DOM.element('img', 'cubecraft-join-screen-title');
        joinScreenTitle.src = '../assets/textures/joinscreen/title.png';
        joinScreen.appendChild(joinScreenTitle);
        joinScreen.appendChild(DOM.element('div', 'cubecraft-flex-1'));
        const optionsWrapper = DOM.element('div', 'cubecraft-join-options-wrapper');
        const joinOptions = DOM.element('div', 'cubecraft-join-options');
        const nameInput = DOM.element('input', 'cubecraft-textbox-thick', 'cubecraft-join-options-textbox');
        nameInput.placeholder = `Enter a nickname`;
        joinOptions.appendChild(nameInput);
        const joinScreenButton = DOM.element('div', 'cubecraft-button-thick', 'cubecraft-join-options-button');
        joinScreenButton.textContent = 'Join';
        joinOptions.appendChild(joinScreenButton);
        optionsWrapper.appendChild(joinOptions);
        joinScreen.appendChild(optionsWrapper);
        joinScreen.appendChild(DOM.element('div', 'cubecraft-flex-3'));
        const resolve = () => {
            this._nickname = nameInput.value;
            for (const listener of this._listeners) {
                listener();
            }
        };
        joinScreenButton.addEventListener('click', () => {
            resolve();
        });
        nameInput.addEventListener('keydown', event => {
            if (event.key === 'Enter') {
                resolve();
            }
        });
        return joinScreen;
    }
    whenJoined() {
        return new Promise((resolve, reject) => {
            if (this._nickname) {
                resolve(this._nickname);
            }
            else {
                this._listeners.push(() => {
                    resolve(this._nickname);
                });
            }
        });
    }
}

class Renderer {
    world;
    canvas;
    perspective;
    constructor(world, canvas) {
        this.world = world;
        this.canvas = canvas;
    }
}

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

class HandleableVector3D extends MutableVector3D {
    _listeners;
    constructor(x = 0, y = 0, z = 0) {
        super(x, y, z);
        this._listeners = new Set();
    }
    on(type, handler) {
        if (type == 'change') {
            this._listeners.add(handler);
        }
        else {
            throw new Error('Unknown event type');
        }
    }
    cause(type) {
        if (type == 'change') {
            for (const listener of this._listeners) {
                listener();
            }
        }
        else {
            throw new Error('Unknown event type');
        }
    }
    _set(x, y, z) {
        this.cause('change');
        return super._set(x, y, z);
    }
    clone() {
        throw new Error("Cannot clone handleable vector. Instead use immutable() or mutable() to output a non-handlable vector.");
    }
    static from(vector, format) {
        return new HandleableVector3D(...Vector3D._from(vector, format));
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
            if (typeof y === 'number') {
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
            if (typeof y === 'number') {
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
            if (typeof y === 'number') {
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
            if (typeof y === 'number') {
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
            if (typeof y === 'number') {
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
            if (typeof y === 'number') {
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
            if (typeof y === 'number') {
                return this._set(x / this.x, y / this.y, this.z / z);
            }
            else {
                return this._set(x / this.x, x / this.y, this.z / z);
            }
        }
        else {
            return this._set(x.x / this.x, x.y / this.y, this.z / z);
        }
    }
    dot(x, y, z) {
        if (typeof x === 'number') {
            if (typeof y === 'number') {
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
            if (typeof y === 'number') {
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
            if (typeof y === 'number') {
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
    immutable() {
        return new ImmutableVector3D(this.x, this.y, this.z);
    }
    mutable() {
        return new MutableVector3D(this.x, this.y, this.z);
    }
    clone() {
        if (this instanceof MutableVector3D)
            return new MutableVector3D(this.x, this.y, this.z);
        if (this instanceof ImmutableVector3D)
            return new ImmutableVector3D(this.x, this.y, this.z);
        if (this instanceof HandleableVector3D)
            return new HandleableVector3D(this.x, this.y, this.z);
        throw new Error(`Unknown vector type: ${this.constructor.name}`);
    }
    handle() {
        return new HandleableVector3D(this.x, this.y, this.z);
    }
    static *_from(vector, format) {
        yield format[0] == 'x' ? vector.x : format[0] == 'y' ? vector.y : format[0] == '1' ? 1 : 0;
        yield format[1] == 'x' ? vector.x : format[1] == 'y' ? vector.y : format[1] == '1' ? 1 : 0;
        yield format[2] == 'x' ? vector.x : format[2] == 'y' ? vector.y : format[2] == '1' ? 1 : 0;
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

/**
 * The ChunkDataAllocator allows multiple fields to be
 * allocated before creating chunks.
 *
 * * Fields may be allocated using the `allocate()`
 * method, passing in `ChunkDataFieldAllocation`
 * objects.
 * * A map of `ChunkDataField` objects can be instantiated
 * using the `initialize()` method.
 */
class ChunkDataAllocator {
    fields = new Map();
    constructor() {
    }
    allocate(id, field) {
        if (this.fields.has(id)) {
            throw new Error(`Field id '${id}' is already used`);
        }
        this.fields.set(id, field);
    }
    initialize() {
        const fields = new Map();
        for (const [id, field] of this.fields) {
            fields.set(id, field.instantiate());
        }
        return fields;
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
    dimensions;
    /**
     * Creates a new `ChunkDataReferencer` using the
     * chunk dimensions passed in through the first
     * argument.
     */
    constructor(dimensions) {
        this.dimensions = dimensions;
    }
    /**
     * Returns the total number of cells in a chunk.
     */
    get cells() {
        return this.dimensions.x * this.dimensions.y * this.dimensions.z;
    }
    index(x, y, z) {
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
    x(index) {
        return index % this.dimensions.x;
    }
    /**
     * Computes the y position of a specified chunk
     * data index. This can be used with the `x()`
     * and `z()` methods to get the complete position
     * without creating a vector.
     */
    y(index) {
        return Math.floor(index / this.dimensions.x) % this.dimensions.y;
    }
    /**
     * Computes the z position of a specified chunk
     * data index. This can be used with the `x()` and
     * `y()` methods to get the complete position
     * without creating a vector.
     */
    z(index) {
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
    position(index) {
        return new MutableVector3D(this.x(index), this.y(index), this.z(index));
    }
}

class Chunk {
    _world;
    position;
    _entities;
    chunkData;
    constructor() {
        this._world = null;
        this.position = new ImmutableVector2D();
        this._entities = new Set();
    }
    get world() {
        if (!this._world)
            throw new Error(`Chunk is not in a world`);
        return this._world;
    }
    set world(world) {
        this._world = world;
    }
    _unload() {
        for (const entity of this._entities) {
            this.world.entityIdMapping.delete(entity.id);
        }
    }
    _setup() {
        this.chunkData.fields ||= this.world.allocator.initialize();
    }
    tick() {
    }
    field(name) {
        return this.chunkData.field(name);
    }
}

class World {
    allocator;
    chunkSize;
    referencer;
    entityIdMapping;
    chunks;
    constructor(allocator = new ChunkDataAllocator(), chunkSize = new ImmutableVector3D(16, 64, 16)) {
        this.allocator = allocator;
        this.chunkSize = chunkSize;
        this.entityIdMapping = new Map();
        this.chunks = new Map();
        this.referencer = new ChunkDataReferencer(chunkSize);
    }
    createChunk(x, z) {
        if (x instanceof Vector2D) {
            z = x.y;
            x = x.x;
        }
        const chunk = new Chunk();
        chunk.world = this;
        chunk.position = new ImmutableVector2D(x, z);
        chunk._setup();
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
        const chunk = this.getChunk(Math.floor(entity.position.x / this.chunkSize.x), Math.floor(entity.position.z / this.chunkSize.z));
        if (!chunk) {
            throw new Error("Cannot add entity to world: Chunk does not exist");
        }
        chunk._entities.add(entity);
        entity._joinWorld(this);
        entity._updateCurrentChunk(chunk);
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
            chunk.tick();
        }
        this._validateDisconnectedEntities();
    }
}

class Client extends Component {
    _element;
    renderer;
    world;
    constructor() {
        super();
        this.world = new World();
        (this.element);
    }
    init() {
    }
    render() {
        const client = DOM.element('div', 'cubecraft-client', 'cubecraft-layers', 'cubecraft-screen');
        const canvas = DOM.element('canvas', 'cubecraft-client-canvas');
        this.renderer = new Renderer(this.world, canvas);
        client.appendChild(canvas);
        return client;
    }
}

const joinScreen = new JoinScreen();
document.body.appendChild(joinScreen.element);
const nickname = await joinScreen.whenJoined();
document.body.removeChild(joinScreen.element);
const client = new Client();
document.body.appendChild(client.element);
client.init();
client.join(nickname);
//# sourceMappingURL=client.js.map
