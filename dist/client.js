var GameRuntimeType;
(function (GameRuntimeType) {
    GameRuntimeType[GameRuntimeType["Singleplayer"] = 0] = "Singleplayer";
    GameRuntimeType[GameRuntimeType["MultiplayerClient"] = 1] = "MultiplayerClient";
    GameRuntimeType[GameRuntimeType["MultiplayerServer"] = 2] = "MultiplayerServer";
})(GameRuntimeType || (GameRuntimeType = {}));

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
    keys() {
        return this.data.keys();
    }
    values() {
        return this.data.values();
    }
}

class IndexedRegistry extends Registry {
    idsToItems = new Map();
    get(id) {
        if (typeof id == 'string')
            return super.get(id);
        return this.idsToItems.get(id);
    }
    async allocate() {
        this.idsToItems = new Map();
        let id = 0;
        for (const [name, item] of this.entries()) {
            item.bindRegistryKeys(id, name);
            this.idsToItems.set(id, item);
            id++;
        }
    }
}

var Registries;
(function (Registries) {
    Registries.blocks = new IndexedRegistry();
    Registries.entities = new Registry();
    Registries.fields = new Registry();
    Registries.textures = new IndexedRegistry();
    Registries.blockModels = new IndexedRegistry();
})(Registries || (Registries = {}));

class IndexedRegistryItem {
    registeredId;
    registeredName;
    bindRegistryKeys(id, name) {
        this.registeredId = id;
        this.registeredName = name;
    }
    getRegisteredId() {
        return this.registeredId;
    }
    getRegisteredName() {
        return this.registeredName;
    }
}

class Texture extends IndexedRegistryItem {
    data;
    width;
    height;
    constructor(data, width, height) {
        super();
        this.data = data;
        this.width = width;
        this.height = height;
    }
    getTextureWidth() {
        return this.width;
    }
    getTextureHeight() {
        return this.height;
    }
    toDataArray() {
        return this.data;
    }
    toImageData() {
        return new ImageData(this.data, this.width, this.height);
    }
    static fromImage(source) {
        const canvas = new OffscreenCanvas(source.width, source.height);
        const context = canvas.getContext('2d');
        context.drawImage(source, 0, 0);
        const imageData = context.getImageData(0, 0, source.width, source.height);
        return Texture.fromImageData(imageData);
    }
    static fromImageData(imageData) {
        return new Texture(imageData.data, imageData.width, imageData.height);
    }
    static fromDataArray(data, width, height) {
        return new Texture(data, width, height);
    }
    static load(name) {
        const url = '/assets/textures/' + name.replace(/\./g, '/') + '.png';
        return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => {
                const texture = Texture.fromImage(image);
                Registries.textures.register(name, texture);
                resolve(texture);
            };
            image.onerror = () => {
                reject(new Error(`Failed to load image from ${url}`));
            };
            image.src = url;
        });
    }
}

var DataUtils;
(function (DataUtils) {
    function concat(buffers) {
        const totalLength = buffers.reduce((total, buffer) => total + buffer.byteLength, 0);
        const result = new Uint8Array(totalLength);
        let offset = 0;
        for (const buffer of buffers) {
            result.set(new Uint8Array(buffer), offset);
            offset += buffer.byteLength;
        }
        return result.buffer;
    }
    DataUtils.concat = concat;
})(DataUtils || (DataUtils = {}));

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
    set(x, y, z) {
        if (typeof x === 'number') {
            if (typeof y === 'number' && typeof z === 'number') {
                return this._set(x, y, z);
            }
            else {
                return this._set(x, x, x);
            }
        }
        else {
            return this._set(x.x, x.y, x.z);
        }
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
    constructor(x, y, z) {
        if (x instanceof Vector3D)
            super(x.x, x.y, x.z);
        else if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number')
            super(x, y, z);
        else
            super(0, 0, 0);
    }
    _set(x, y, z) {
        return new ImmutableVector3D(x, y, z);
    }
    set(x, y, z) {
        throw new Error("Cannot set immutable vector");
    }
    static from(vector, format) {
        const values = [...Vector3D._from(vector, format)];
        return new ImmutableVector3D(values[0], values[1], values[2]);
    }
}

class BlockModel extends IndexedRegistryItem {
    components = new Set();
    getVertexPositions() {
        const components = Array.from(this.components);
        const positions = components.map(component => component.getVertexPositions(new ImmutableVector3D()));
        const buffer = DataUtils.concat(positions);
        return new Float32Array(buffer);
    }
    getTextureMappings() {
        const components = Array.from(this.components);
        const textureMappings = components.map(component => component.getTextureMappings());
        const buffer = DataUtils.concat(textureMappings);
        return new Uint32Array(buffer);
    }
    getTextureIds() {
        const components = Array.from(this.components);
        const textureIds = components.map(component => component.getTextureIds());
        const buffer = DataUtils.concat(textureIds);
        return new Uint32Array(buffer);
    }
    add(...components) {
        for (const component of components) {
            this.components.add(component);
        }
    }
    remove(...components) {
        for (const component of components) {
            this.components.delete(component);
        }
    }
}

class MutableVector3D extends Vector3D {
    constructor(x, y, z) {
        if (x instanceof Vector3D)
            super(x.x, x.y, x.z);
        else if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number')
            super(x, y, z);
        else
            super(0, 0, 0);
    }
    _set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    static from(vector, format) {
        const values = [...Vector3D._from(vector, format)];
        return new MutableVector3D(values[0], values[1], values[2]);
    }
}

class Matrix3 {
    data;
    constructor(data = [1, 0, 0, 0, 1, 0, 0, 0, 1]) {
        this.data = data;
    }
    multiply(value) {
        if (value instanceof Vector3D) {
            return Matrix3.multiplyVector(this, value);
        }
        else if (value instanceof Matrix3) {
            return Matrix3.multiply(this, value, this);
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    static multiply(matrix1, matrix2, target = new Matrix3()) {
        const a = matrix1.data;
        const b = matrix2.data;
        const c = target.data;
        const a00 = a[0], a01 = a[1], a02 = a[2];
        const a10 = a[3], a11 = a[4], a12 = a[5];
        const a20 = a[6], a21 = a[7], a22 = a[8];
        const b00 = b[0], b01 = b[1], b02 = b[2];
        const b10 = b[3], b11 = b[4], b12 = b[5];
        const b20 = b[6], b21 = b[7], b22 = b[8];
        c[0] = b00 * a00 + b01 * a10 + b02 * a20;
        c[1] = b00 * a01 + b01 * a11 + b02 * a21;
        c[2] = b00 * a02 + b01 * a12 + b02 * a22;
        c[3] = b10 * a00 + b11 * a10 + b12 * a20;
        c[4] = b10 * a01 + b11 * a11 + b12 * a21;
        c[5] = b10 * a02 + b11 * a12 + b12 * a22;
        c[6] = b20 * a00 + b21 * a10 + b22 * a20;
        c[7] = b20 * a01 + b21 * a11 + b22 * a21;
        c[8] = b20 * a02 + b21 * a12 + b22 * a22;
        return target;
    }
    static multiplyVector(matrix, vector, target = new MutableVector3D()) {
        const a = matrix.data;
        const b = vector;
        const c = target;
        const x = b.x, y = b.y, z = b.z;
        c.x = a[0] * x + a[4] * y + a[8] * z;
        c.y = a[1] * x + a[5] * y + a[9] * z;
        c.z = a[2] * x + a[6] * y + a[10] * z;
        return target;
    }
    static createRotation(rotation, target = new Matrix3()) {
        let matrix = target || new Matrix3();
        matrix.multiply(Matrix3.createRotationY(rotation.yaw));
        matrix.multiply(Matrix3.createRotationX(rotation.pitch));
        matrix.multiply(Matrix3.createRotationZ(rotation.roll));
        return matrix;
    }
    static createRotationX(angle, target = new Matrix3()) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        target.data[0] = 1;
        target.data[1] = 0;
        target.data[2] = 0;
        target.data[4] = 0;
        target.data[5] = cos;
        target.data[6] = sin;
        target.data[8] = 0;
        target.data[9] = -sin;
        target.data[10] = cos;
        return target;
    }
    static createRotationY(angle, target = new Matrix3()) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        target.data[0] = cos;
        target.data[1] = 0;
        target.data[2] = -sin;
        target.data[4] = 0;
        target.data[5] = 1;
        target.data[6] = 0;
        target.data[8] = sin;
        target.data[9] = 0;
        target.data[10] = cos;
        return target;
    }
    static createRotationZ(angle, target = new Matrix3()) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        target.data[0] = cos;
        target.data[1] = sin;
        target.data[2] = 0;
        target.data[4] = -sin;
        target.data[5] = cos;
        target.data[6] = 0;
        target.data[8] = 0;
        target.data[9] = 0;
        target.data[10] = 1;
        return target;
    }
}

class Rotation {
    yaw;
    pitch;
    roll;
    constructor(yaw = 0, pitch = 0, roll = 0) {
        if (typeof yaw !== 'number')
            throw new TypeError('yaw must be a number');
        if (typeof pitch !== 'number')
            throw new TypeError('pitch must be a number');
        if (typeof roll !== 'number')
            throw new TypeError('roll must be a number');
        if (isNaN(yaw))
            throw new TypeError('yaw must not be NaN');
        if (isNaN(pitch))
            throw new TypeError('pitch must not be NaN');
        if (isNaN(roll))
            throw new TypeError('roll must not be NaN');
        this.yaw = yaw;
        this.pitch = pitch;
        this.roll = roll;
    }
    set(yaw, pitch, roll) {
        if (typeof yaw == 'number' && typeof pitch === 'number' && typeof roll === 'number') {
            this.yaw = yaw;
            this.pitch = pitch;
            this.roll = roll;
        }
        else if (yaw instanceof Rotation && pitch === undefined && roll === undefined) {
            this.yaw = yaw.yaw;
            this.pitch = yaw.pitch;
            this.roll = yaw.roll;
        }
        else {
            throw new Error('Invalid arguments to Rotation.set(), expected number, number, number or Rotation');
        }
    }
    clone() {
        return new Rotation(this.yaw, this.pitch, this.roll);
    }
}

var Orientation;
(function (Orientation) {
    Orientation[Orientation["North"] = 0] = "North";
    Orientation[Orientation["East"] = 1] = "East";
    Orientation[Orientation["South"] = 2] = "South";
    Orientation[Orientation["West"] = 3] = "West";
    Orientation[Orientation["Up"] = 4] = "Up";
    Orientation[Orientation["Down"] = 5] = "Down";
})(Orientation || (Orientation = {}));
(function (Orientation) {
    const rotations = new Map();
    function getRotation(orientation) {
        if (!rotations.has(orientation)) {
            rotations.set(orientation, calculateRotation(orientation));
        }
        return rotations.get(orientation);
    }
    Orientation.getRotation = getRotation;
    function calculateRotation(orientation) {
        switch (orientation) {
            case Orientation.North: return new Rotation(0, 0, 0);
            case Orientation.East: return new Rotation(0, 90, 0);
            case Orientation.South: return new Rotation(0, 180, 0);
            case Orientation.West: return new Rotation(0, 270, 0);
            case Orientation.Up: return new Rotation(-90, 0, 0);
            case Orientation.Down: return new Rotation(90, 0, 0);
        }
    }
    const matrices = new Map();
    function getMatrix(orientation) {
        if (!matrices.has(orientation)) {
            matrices.set(orientation, Matrix3.createRotation(getRotation(orientation)));
        }
        return matrices.get(orientation);
    }
    Orientation.getMatrix = getMatrix;
})(Orientation || (Orientation = {}));

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

class PositionedModelComponent {
    position = new MutableVector3D();
    getPosition() {
        return this.position.clone();
    }
    setPosition(position) {
        this.position.set(position);
    }
}

class GroupModelComponent extends PositionedModelComponent {
    components = new Set();
    getVertexPositions(parentPosition) {
        const components = Array.from(this.components);
        const positions = components.map(component => component.getVertexPositions(parentPosition));
        const buffer = DataUtils.concat(positions);
        return new Float32Array(buffer);
    }
    getTextureMappings() {
        const components = Array.from(this.components);
        const textureMappings = components.map(component => component.getTextureMappings());
        const buffer = DataUtils.concat(textureMappings);
        return new Uint32Array(buffer);
    }
    getTextureIds() {
        const components = Array.from(this.components);
        const textureIds = components.map(component => component.getTextureIds());
        const buffer = DataUtils.concat(textureIds);
        return new Uint32Array(buffer);
    }
    add(...components) {
        for (const component of components) {
            this.components.add(component);
        }
    }
    remove(...components) {
        for (const component of components) {
            this.components.delete(component);
        }
    }
}

class PlaneModelComponent extends PositionedModelComponent {
    width;
    height;
    orientation = Orientation.North;
    texture;
    constructor(texture, size, orientation) {
        super();
        this.width = size.x;
        this.height = size.y;
        this.texture = texture;
        this.orientation = orientation;
    }
    getVertexPositions() {
        return PlaneModelComponent.makePlaneVertices(this.orientation, this.width, this.height);
    }
    getTextureMappings() {
        const data = new Uint32Array(PlaneModelComponent.baseTextureMapping.length);
        const width = this.texture.getTextureWidth();
        const height = this.texture.getTextureHeight();
        for (let i = 0; i < data.length / 2; i++) {
            data[i * 2] = PlaneModelComponent.baseTextureMapping[i * 2] * width;
            data[i * 2 + 1] = PlaneModelComponent.baseTextureMapping[i * 2 + 1] * height;
        }
        return data;
    }
    getTextureIds() {
        const textureId = this.texture.getRegisteredId();
        return new Uint32Array([
            textureId,
            textureId
        ]);
    }
    static makePlaneVertices(orientation, width, height) {
        const vertices = PlaneModelComponent.baseGeometry.map(x => x);
        for (let i = 0; i < vertices.length / 3; i++) {
            const vector = new ImmutableVector3D(vertices[i * 3] * width, vertices[i * 3 + 1] * height, vertices[i * 3 + 2]);
            const matrix = Orientation.getMatrix(orientation);
            const result = matrix.multiply(vector);
            vertices[i * 3] = result.x;
            vertices[i * 3 + 1] = result.y;
            vertices[i * 3 + 2] = result.z;
        }
        return vertices;
    }
    static baseTextureMapping = new Uint8Array([
        0, 0,
        1, 0,
        1, 1,
        1, 0,
        0, 1,
        0, 0
    ]);
    static baseGeometry = PlaneModelComponent.getBaseGeometry();
    static getBaseGeometry() {
        const data = new Float32Array(PlaneModelComponent.baseTextureMapping.length);
        for (let i = 0; i < PlaneModelComponent.baseTextureMapping.length / 2; i++) {
            data[i] = PlaneModelComponent.baseTextureMapping[i * 2] - 0.5;
            data[i + 1] = PlaneModelComponent.baseTextureMapping[i * 2 + 1] - 0.5;
        }
        return data;
    }
}

class BoxModelComponent extends GroupModelComponent {
    constructor(dimensions, textures) {
        super();
        const north = new PlaneModelComponent(textures[0], new ImmutableVector2D(dimensions.x, dimensions.y), Orientation.North);
        const south = new PlaneModelComponent(textures[1], new ImmutableVector2D(dimensions.x, dimensions.y), Orientation.South);
        const east = new PlaneModelComponent(textures[2], new ImmutableVector2D(dimensions.z, dimensions.y), Orientation.East);
        const west = new PlaneModelComponent(textures[3], new ImmutableVector2D(dimensions.z, dimensions.y), Orientation.West);
        const up = new PlaneModelComponent(textures[4], new ImmutableVector2D(dimensions.x, dimensions.z), Orientation.Up);
        const down = new PlaneModelComponent(textures[5], new ImmutableVector2D(dimensions.x, dimensions.z), Orientation.Down);
        this.add(north, south, east, west, up, down);
    }
}

class BlockPrototype extends IndexedRegistryItem {
}

class BaseBlockPrototype extends BlockPrototype {
    instantiate(position) {
        position.getChunkData().getField('blockId').set(position, this.getRegisteredId());
    }
    whenDestroyed(position) {
        const empty = Registries.blocks.get('empty');
        if (!empty) {
            throw new Error("Empty block not found in registry");
        }
        position.getChunkData().setBlock(position, empty);
    }
    whenUsed(position) {
    }
    whenPlaced(position) {
    }
    whenTicked(position) {
    }
    isRendered() {
        return true;
    }
    async setup() {
    }
}

class StonePrototype extends BaseBlockPrototype {
    whenPlaced(position) {
        console.log("Stone placed at " + position.toString());
    }
    getBlockModel(position) {
        return StonePrototype.model;
    }
    static model;
    static texture;
    static async setup() {
        this.texture = await Texture.load("blocks.stone");
        this.model = new BlockModel();
        const box = new BoxModelComponent(new ImmutableVector3D(1, 1, 1), new Array(6).fill(this.texture));
        this.model.add(box);
    }
    static getBlockModel() {
        return StonePrototype.model;
    }
}

class BaseEntityPrototype {
    async setup() {
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
        const values = [...Vector3D._from(vector, format)];
        return new HandleableVector3D(values[0], values[1], values[2]);
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
var ChunkDataReferencer;
(function (ChunkDataReferencer) {
    /**
     * The dimensions of the chunk as a 3D vector.
     */
    ChunkDataReferencer.dimensions = new ImmutableVector3D(16, 32, 16);
    const shiftY = 8;
    const shiftZ = 4;
    const xBlock = 0b1111;
    const zBlock = 0b1111;
    /**
     * Returns the total number of cells in a chunk.
     */
    ChunkDataReferencer.cells = ChunkDataReferencer.dimensions.x * ChunkDataReferencer.dimensions.y * ChunkDataReferencer.dimensions.z;
    function index(x, y, z) {
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
        return x + (z << this.shiftZ) + (y << this.shiftY);
    }
    ChunkDataReferencer.index = index;
    /**
     * Computes the x position of a specified chunk
     * data index. This can be used with the `y()` and
     * `z()` methods to get the complete position
     * without creating a vector.
     */
    function x(index) {
        return index & xBlock;
    }
    ChunkDataReferencer.x = x;
    /**
     * Computes the y position of a specified chunk
     * data index. This can be used with the `x()`
     * and `z()` methods to get the complete position
     * without creating a vector.
     */
    function y(index) {
        return index >> shiftY;
    }
    ChunkDataReferencer.y = y;
    /**
     * Computes the z position of a specified chunk
     * data index. This can be used with the `x()` and
     * `y()` methods to get the complete position
     * without creating a vector.
     */
    function z(index) {
        return index >> shiftZ & zBlock;
    }
    ChunkDataReferencer.z = z;
    /**
     * Computes the position of a specified chunk data
     * index. Equivalent to calling `x()`, `y()`, and
     * `z()`, then assembling a `Vector3D` from the
     * components.
     *
     * The method is the opposite of `index()`.
     */
    function position(index) {
        return new MutableVector3D(this.x(index), this.y(index), this.z(index));
    }
    ChunkDataReferencer.position = position;
})(ChunkDataReferencer || (ChunkDataReferencer = {}));
window['cdr'] = ChunkDataReferencer;

class BaseEntity {
    id;
    chunk;
    world;
    position = new HandleableVector3D();
    rotation = new Rotation();
    constructor() {
        this.position.on('change', () => {
            // If the entity is not in a world or chunk, it doesn't need to update it's chunk
            if (this.world && this.chunk) {
                // Compute the location of the chunk the entity should be moved to.
                const targetChunkX = Math.floor(this.position.x / ChunkDataReferencer.dimensions.x);
                const targetChunkZ = Math.floor(this.position.z / ChunkDataReferencer.dimensions.z);
                // Get the location of the chunk object that currently contains the entity.
                const currentChunkPosition = this.chunk.getPosition();
                const currentChunkX = currentChunkPosition.x;
                const currentChunkZ = currentChunkPosition.y;
                // Check if the entity should move to a different chunk.
                if (currentChunkX != targetChunkX || currentChunkZ != targetChunkZ) {
                    // Get the chunk that the entity should be in.
                    let chunk = this.world.getChunk(targetChunkX, targetChunkZ);
                    if (!chunk) {
                        chunk = this.world.loadChunk(targetChunkX, targetChunkZ);
                    }
                    // Update the chunk the entity is in.
                    this.setParentChunk(chunk);
                }
            }
        });
        this.id = BaseEntity.generateUniqueId();
    }
    setWorld(world) {
        if (world == null) {
            this.world = null;
            this.chunk = null;
            return;
        }
        // Set the entity's properties to be in the world.
        this.world = world;
        this.chunk = null;
        // Compute the location of the chunk the entity should be placed in.
        const targetChunkX = Math.floor(this.position.x / ChunkDataReferencer.dimensions.x);
        const targetChunkZ = Math.floor(this.position.z / ChunkDataReferencer.dimensions.z);
        // Get the chunk object that the entity should be placed in.
        let targetChunk = this.world.getChunk(targetChunkX, targetChunkZ);
        // If the chunk object doesn't exist and the entity can load new chunks, load the chunk.
        if (!targetChunk && this.canLoadChunks()) {
            this.world.loadChunk(targetChunkX, targetChunkZ);
            targetChunk = this.world.getChunk(targetChunkX, targetChunkZ);
        }
        // Update the chunk the entity is in.
        this.setParentChunk(targetChunk);
    }
    getWorld() {
        return this.world;
    }
    setParentChunk(chunk) {
        if (this.chunk && !this.chunk.isPlaceholder())
            this.chunk.getChunkData().removeEntity(this);
        this.chunk = chunk;
        if (this.chunk && !this.chunk.isPlaceholder())
            this.chunk.getChunkData().addEntity(this);
    }
    getParentChunk() {
        return this.chunk;
    }
    tickEntity(delta) {
    }
    getPosition() {
        return this.position;
    }
    setPosition(x, y, z) {
        if (x instanceof Vector3D) {
            this.position.set(x.x, x.y, x.z);
        }
        else if (typeof y == 'number' && typeof z == 'number') {
            this.position.set(x, y, z);
        }
        else {
            throw new Error("Invalid arguments to BaseEntity.setPosition()");
        }
    }
    getRotation() {
        return this.rotation;
    }
    setRotation(rotation) {
        this.rotation = rotation;
    }
    getUniqueId() {
        return this.id;
    }
    getEntityModel() {
        return null;
    }
    getPhysicalEntity() {
        return null;
    }
    whenJoinWorld() {
    }
    getPhysicalState() {
        return null;
    }
    getPhysicalProperties() {
        return null;
    }
    static generateUniqueId() {
        return crypto.randomUUID();
    }
}

class PlayerEntity extends BaseEntity {
    getPrototype() {
        return Registries.entities.get('player');
    }
    canLoadChunks() {
        return true;
    }
}

class PlayerPrototype extends BaseEntityPrototype {
    createEntity() {
        return new PlayerEntity();
    }
}

async function loadGameContent() {
    Registries.entities.register('player', new PlayerPrototype());
    await StonePrototype.setup();
    Registries.blocks.register('stone', new StonePrototype());
    Registries.blockModels.register('stone', StonePrototype.getBlockModel());
}

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

class ChunkData {
    chunk = null;
    fields;
    entities = new Set();
    updates = new Set();
    constructor() {
        this.fields = ChunkDataFields.initialize();
    }
    setParentChunk(chunk) {
        this.chunk = chunk;
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
            this.setBlockId(x, y.getRegisteredId());
        }
        else if (x instanceof Vector3D && y instanceof BlockPrototype) {
            this.setBlockId(x, y.getRegisteredId());
        }
        else if (typeof x === 'number' && typeof y == 'number' && typeof z == 'number' && block instanceof BlockPrototype) {
            this.setBlockId(x, y, z, block.getRegisteredId());
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
    }
    setChunkData(chunkData) {
        this.chunkData = chunkData;
        this.chunkData.setParentChunk(this);
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
            this.world.entityIdMapping.delete(entity.getUniqueId());
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
    world = null;
    constructor() {
        super();
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
        throw new Error("Chunk data does not exist on placeholder");
    }
    bindWorld(world, position) {
        this.world = world;
        this.position = position;
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
        this.entityIdMapping.set(entity.getUniqueId(), entity);
        const entityPosition = entity.getPosition();
        const chunkX = Math.floor(entityPosition.x / ChunkDataReferencer.dimensions.x);
        const chunkZ = Math.floor(entityPosition.z / ChunkDataReferencer.dimensions.z);
        const chunk = this.getChunk(chunkX, chunkZ) || this.loadChunk(chunkX, chunkZ);
        entity.setWorld(this);
        if (!chunk.isPlaceholder()) {
            chunk.getChunkData().addEntity(entity);
            entity.setParentChunk(null);
        }
        else {
            entity.setParentChunk(chunk);
        }
        return entity;
    }
    removeEntity(entity) {
        entity.setWorld(null);
        this.entityIdMapping.delete(entity.getUniqueId());
    }
    _validateDisconnectedEntities() {
        for (const entity of this.entityIdMapping.values()) {
            if (!entity.getParentChunk()) {
                console.warn("Entity is not in a chunk\n", entity);
            }
        }
    }
    tick(delta) {
        for (const entity of this.entityIdMapping.values()) {
            entity.tickEntity(delta);
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
        placeholder.bindWorld(this, position);
        this.loader.loadChunk(position).then(chunkData => {
            const chunk = new Chunk();
            chunk.bindWorld(this, position);
            chunk.setChunkData(chunkData);
            this.chunks.set(position.x + '.' + position.y, chunk);
            for (const entity of this.entityIdMapping.values()) {
                const parentChunk = entity.getParentChunk();
                if (!parentChunk)
                    continue;
                if (parentChunk.getPosition().equals(position)) {
                    entity.setParentChunk(chunk);
                    chunk.getChunkData().addEntity(entity);
                }
            }
        });
        return placeholder;
    }
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
        if (typeof x == 'number' && typeof y == 'number' && typeof z == 'number' && typeof value != 'undefined') {
            return this._set(ChunkDataReferencer.index(x, y, z), value);
        }
        else if (x instanceof Vector3D && typeof y != 'number') {
            return this._set(ChunkDataReferencer.index(x), y);
        }
        else if (x instanceof BlockPosition && typeof y != 'number') {
            return this._set(ChunkDataReferencer.index(x.getLocalPosition()), y);
        }
        else if (typeof x == 'number') {
            return this._set(x, y);
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

class Game {
    static init = new InitDispatcher();
    world;
    clock = new EventClock();
    constructor() {
        this.world = new World();
    }
    async start() {
        await Game.init.run();
        Registries.fields.register('blockId', new ChunkDataNumberAllocation('u16'));
        await loadGameContent();
        Registries.blocks.allocate();
        Registries.textures.allocate();
        Registries.blocks.allocate();
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
        return this.world;
    }
    getClock() {
        return this.clock;
    }
}

class Color {
    red;
    green;
    blue;
    alpha;
    constructor(red, green, blue, alpha) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }
    static fromHex(hex) {
        const red = parseInt(hex.substring(1, 3), 16);
        const green = parseInt(hex.substring(3, 5), 16);
        const blue = parseInt(hex.substring(5, 7), 16);
        return new Color(red / 255, green / 255, blue / 255, 1);
    }
    static fromRGB(red, green, blue) {
        return new Color(red / 255, green / 255, blue / 255, 1);
    }
    static fromRGBA(red, green, blue, alpha) {
        return new Color(red / 255, green / 255, blue / 255, alpha);
    }
    static toHex(color) {
        const red = Math.round(color.red * 255).toString(16).padStart(2, "0");
        const green = Math.round(color.green * 255).toString(16).padStart(2, "0");
        const blue = Math.round(color.blue * 255).toString(16).padStart(2, "0");
        return `#${red}${green}${blue}`;
    }
    static toRGB(color) {
        const red = Math.round(color.red * 255);
        const green = Math.round(color.green * 255);
        const blue = Math.round(color.blue * 255);
        return `rgb(${red}, ${green}, ${blue})`;
    }
    static toRGBA(color) {
        const red = Math.round(color.red * 255);
        const green = Math.round(color.green * 255);
        const blue = Math.round(color.blue * 255);
        return `rgba(${red}, ${green}, ${blue}, ${color.alpha})`;
    }
    static toGPUColor(color) {
        return {
            r: color.red,
            g: color.green,
            b: color.blue,
            a: color.alpha
        };
    }
    static blend(color1, color2, factor) {
        const inverseFactor = 1 - factor;
        const red = color1.red * factor + color2.red * inverseFactor;
        const green = color1.green * factor + color2.green * inverseFactor;
        const blue = color1.blue * factor + color2.blue * inverseFactor;
        const alpha = color1.alpha * factor + color2.alpha * inverseFactor;
        return new Color(red, green, blue, alpha);
    }
}

class Matrix4 {
    data;
    constructor(source) {
        if (source instanceof Matrix3) {
            this.data = [
                source.data[0], source.data[1], source.data[2], 0,
                source.data[3], source.data[4], source.data[5], 0,
                source.data[6], source.data[7], source.data[8], 0,
                0, 0, 0, 1
            ];
        }
        else if (source instanceof Matrix4) {
            this.data = source.data.map(item => item);
        }
        else if (source) {
            this.data = source.map(item => item);
        }
        else {
            this.data = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        }
    }
    multiply(value) {
        if (value instanceof Vector3D) {
            return Matrix4.multiplyVector(this, value);
        }
        else if (value instanceof Matrix4) {
            return Matrix4.multiply(this, value, this);
        }
        else {
            throw new Error("Invalid arguments");
        }
    }
    get translation() {
        return new ImmutableVector3D(this.data[12], this.data[13], this.data[14]);
    }
    set translation(value) {
        this.data[12] = value.x;
        this.data[13] = value.y;
        this.data[14] = value.z;
    }
    static multiply(matrix1, matrix2, target = new Matrix4()) {
        const a = matrix1.data;
        const b = matrix2.data;
        const c = target.data;
        const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
        const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
        const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
        const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
        const b00 = b[0], b01 = b[1], b02 = b[2], b03 = b[3];
        const b10 = b[4], b11 = b[5], b12 = b[6], b13 = b[7];
        const b20 = b[8], b21 = b[9], b22 = b[10], b23 = b[11];
        const b30 = b[12], b31 = b[13], b32 = b[14], b33 = b[15];
        c[0] = b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30;
        c[1] = b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31;
        c[2] = b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32;
        c[3] = b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33;
        c[4] = b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30;
        c[5] = b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31;
        c[6] = b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32;
        c[7] = b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33;
        c[8] = b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30;
        c[9] = b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31;
        c[10] = b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32;
        c[11] = b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33;
        c[12] = b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30;
        c[13] = b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31;
        c[14] = b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32;
        c[15] = b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33;
        return target;
    }
    static multiplyVector(matrix, vector, target = new MutableVector3D()) {
        const a = matrix.data;
        const b = vector;
        const c = target;
        const x = b.x, y = b.y, z = b.z;
        c.x = a[0] * x + a[4] * y + a[8] * z + a[12];
        c.y = a[1] * x + a[5] * y + a[9] * z + a[13];
        c.z = a[2] * x + a[6] * y + a[10] * z + a[14];
        return target;
    }
    static inverse(matrix, target = new Matrix4()) {
        const a = matrix.data;
        const b = target.data;
        const a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3];
        const a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7];
        const a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11];
        const a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
        const b00 = a00 * a11 - a01 * a10;
        const b01 = a00 * a12 - a02 * a10;
        const b02 = a00 * a13 - a03 * a10;
        const b03 = a01 * a12 - a02 * a11;
        const b04 = a01 * a13 - a03 * a11;
        const b05 = a02 * a13 - a03 * a12;
        const b06 = a20 * a31 - a21 * a30;
        const b07 = a20 * a32 - a22 * a30;
        const b08 = a20 * a33 - a23 * a30;
        const b09 = a21 * a32 - a22 * a31;
        const b10 = a21 * a33 - a23 * a31;
        const b11 = a22 * a33 - a23 * a32;
        const det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
        if (!det)
            return null;
        const invDet = 1 / det;
        b[0] = (a11 * b11 - a12 * b10 + a13 * b09) * invDet;
        b[1] = (a02 * b10 - a01 * b11 - a03 * b09) * invDet;
        b[2] = (a31 * b05 - a32 * b04 + a33 * b03) * invDet;
        b[3] = (a22 * b04 - a21 * b05 - a23 * b03) * invDet;
        b[4] = (a12 * b08 - a10 * b11 - a13 * b07) * invDet;
        b[5] = (a00 * b11 - a02 * b08 + a03 * b07) * invDet;
        b[6] = (a32 * b02 - a30 * b05 - a33 * b01) * invDet;
        b[7] = (a20 * b05 - a22 * b02 + a23 * b01) * invDet;
        b[8] = (a10 * b10 - a11 * b08 + a13 * b06) * invDet;
        b[9] = (a01 * b08 - a00 * b10 - a03 * b06) * invDet;
        b[10] = (a30 * b04 - a31 * b02 + a33 * b00) * invDet;
        b[11] = (a21 * b02 - a20 * b04 - a23 * b00) * invDet;
        b[12] = (a11 * b07 - a10 * b09 - a12 * b06) * invDet;
        b[13] = (a00 * b09 - a01 * b07 + a02 * b06) * invDet;
        b[14] = (a31 * b01 - a30 * b03 - a32 * b00) * invDet;
        b[15] = (a20 * b03 - a21 * b01 + a22 * b00) * invDet;
        return target;
    }
    static createTranslation(vector, target = new Matrix4()) {
        target.data[0] = 1;
        target.data[1] = 0;
        target.data[2] = 0;
        target.data[3] = 0;
        target.data[4] = 0;
        target.data[5] = 1;
        target.data[6] = 0;
        target.data[7] = 0;
        target.data[8] = 0;
        target.data[9] = 0;
        target.data[10] = 1;
        target.data[11] = 0;
        target.data[12] = vector.x;
        target.data[13] = vector.y;
        target.data[14] = vector.z;
        target.data[15] = 1;
        return target;
    }
    static createScale(vector, target = new Matrix4()) {
        target.data[0] = vector.x;
        target.data[1] = 0;
        target.data[2] = 0;
        target.data[3] = 0;
        target.data[4] = 0;
        target.data[5] = vector.y;
        target.data[6] = 0;
        target.data[7] = 0;
        target.data[8] = 0;
        target.data[9] = 0;
        target.data[10] = vector.z;
        target.data[11] = 0;
        target.data[12] = 0;
        target.data[13] = 0;
        target.data[14] = 0;
        target.data[15] = 1;
        return target;
    }
    static createRotation(rotation, target = new Matrix4()) {
        let matrix = target || new Matrix4();
        matrix.multiply(Matrix4.createRotationY(rotation.yaw));
        matrix.multiply(Matrix4.createRotationX(rotation.pitch));
        matrix.multiply(Matrix4.createRotationZ(rotation.roll));
        return matrix;
    }
    static createRotationX(angle, target = new Matrix4()) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        target.data[0] = 1;
        target.data[1] = 0;
        target.data[2] = 0;
        target.data[3] = 0;
        target.data[4] = 0;
        target.data[5] = cos;
        target.data[6] = sin;
        target.data[7] = 0;
        target.data[8] = 0;
        target.data[9] = -sin;
        target.data[10] = cos;
        target.data[11] = 0;
        target.data[12] = 0;
        target.data[13] = 0;
        target.data[14] = 0;
        target.data[15] = 1;
        return target;
    }
    static createRotationY(angle, target = new Matrix4()) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        target.data[0] = cos;
        target.data[1] = 0;
        target.data[2] = -sin;
        target.data[3] = 0;
        target.data[4] = 0;
        target.data[5] = 1;
        target.data[6] = 0;
        target.data[7] = 0;
        target.data[8] = sin;
        target.data[9] = 0;
        target.data[10] = cos;
        target.data[11] = 0;
        target.data[12] = 0;
        target.data[13] = 0;
        target.data[14] = 0;
        target.data[15] = 1;
        return target;
    }
    static createRotationZ(angle, target = new Matrix4()) {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        target.data[0] = cos;
        target.data[1] = sin;
        target.data[2] = 0;
        target.data[3] = 0;
        target.data[4] = -sin;
        target.data[5] = cos;
        target.data[6] = 0;
        target.data[7] = 0;
        target.data[8] = 0;
        target.data[9] = 0;
        target.data[10] = 1;
        target.data[11] = 0;
        target.data[12] = 0;
        target.data[13] = 0;
        target.data[14] = 0;
        target.data[15] = 1;
        return target;
    }
    static createPerspective(fov, aspect, near, far, target = new Matrix4()) {
        const f = 1 / Math.tan(fov / 2);
        const nf = 1 / (near - far);
        target.data[0] = f / aspect;
        target.data[1] = 0;
        target.data[2] = 0;
        target.data[3] = 0;
        target.data[4] = 0;
        target.data[5] = f;
        target.data[6] = 0;
        target.data[7] = 0;
        target.data[8] = 0;
        target.data[9] = 0;
        target.data[10] = (far + near) * nf;
        target.data[11] = -1;
        target.data[12] = 0;
        target.data[13] = 0;
        target.data[14] = 2 * far * near * nf;
        target.data[15] = 0;
        return target;
    }
}

class Projector {
    fieldOfView;
    aspect;
    near;
    far;
    projectionMatrix = null;
    constructor(fieldOfView = 45, aspect = 1, near = 0.1, far = 1000) {
        this.fieldOfView = fieldOfView;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
    }
    getFieldOfView() {
        return this.fieldOfView;
    }
    setFieldOfView(fieldOfView) {
        this.fieldOfView = fieldOfView;
        this.projectionMatrix = null;
    }
    getAspectRatio() {
        return this.aspect;
    }
    setAspectRatio(aspect) {
        this.aspect = aspect;
        this.projectionMatrix = null;
    }
    getNear() {
        return this.near;
    }
    setNear(near) {
        this.near = near;
        this.projectionMatrix = null;
    }
    getFar() {
        return this.far;
    }
    setFar(far) {
        this.far = far;
        this.projectionMatrix = null;
    }
    getProjectionMatrix() {
        if (!this.projectionMatrix) {
            this.projectionMatrix = this.computeProjectionMatrix();
        }
        return this.projectionMatrix;
    }
    computeProjectionMatrix() {
        return Matrix4.createPerspective(this.fieldOfView, this.aspect, this.near, this.far);
    }
}

class BindGroupManager {
    bindGroups = new Set();
    async setup(device) {
        for (const bindGroup of this.bindGroups) {
            await bindGroup.setup(device);
        }
        console.log("BindGroupManager setup");
        console.log(this.bindGroups);
    }
    addBindGroup(bindGroup) {
        this.bindGroups.add(bindGroup);
    }
}

var Bindings;
(function (Bindings) {
    Bindings.CameraBindGroup = 0;
    Bindings.CameraDataBinding = 0;
    Bindings.BlockModelBindGroup = 1;
    Bindings.BlockModelGeometryBinding = 0;
    Bindings.BlockModelTextureMappingBinding = 1;
    Bindings.BlockModelTextureBinding = 2;
    Bindings.BlockModelTextureSamplerBinding = 3;
})(Bindings || (Bindings = {}));

class BindGroup {
    index;
    entries = new Set();
    layout;
    group;
    constructor(index) {
        this.index = index;
    }
    async setup(device) {
        for (const entry of this.entries) {
            await entry.setup(device);
        }
        const layoutEntries = [];
        for (const entry of this.entries) {
            layoutEntries.push(entry.getLayoutEntry());
        }
        this.layout = device.getDevice().createBindGroupLayout({
            entries: layoutEntries
        });
        const bindGroupEntries = [];
        for (const entry of this.entries) {
            console.log(entry.getBindGroupEntry());
            bindGroupEntries.push(entry.getBindGroupEntry());
        }
        this.group = device.getDevice().createBindGroup({
            label: `Bind Group ${this.index}`,
            layout: this.layout,
            entries: bindGroupEntries
        });
    }
    addEntry(binding, entry) {
        this.entries.add(entry);
        entry.setBinding(binding);
    }
    getBindGroupLayout() {
        return this.layout;
    }
    getBindGroupIndex() {
        return this.index;
    }
    getBindGroup() {
        return this.group;
    }
}

class BufferBindGroupEntry {
    buffer;
    visibility;
    type;
    binding;
    constructor(buffer, visibility, type) {
        this.buffer = buffer;
        this.visibility = visibility;
        this.type = type;
    }
    setBinding(index) {
        this.binding = index;
    }
    async setup(device) {
    }
    getLayoutEntry() {
        return {
            binding: this.binding,
            visibility: this.visibility,
            buffer: {
                type: this.type
            }
        };
    }
    getBindGroupEntry() {
        return {
            binding: this.binding,
            resource: {
                buffer: this.buffer
            }
        };
    }
}

class Camera {
    bindGroup;
    bindGroupEntry;
    buffer;
    perspective;
    async setup(device) {
        this.buffer = device.getDevice().createBuffer({
            size: 4 * 4 * 32 * 2,
            usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
        });
        this.bindGroup = new BindGroup(Bindings.CameraBindGroup);
        this.bindGroupEntry = new BufferBindGroupEntry(this.buffer, GPUShaderStage.VERTEX, "uniform");
        this.bindGroup.addEntry(Bindings.CameraDataBinding, this.bindGroupEntry);
        await this.bindGroup.setup(device);
    }
    setPerspective(perspective) {
        this.perspective = perspective;
    }
    getCameraBindGroup() {
        return this.bindGroup;
    }
}

class GraphicsDevice {
    canvas;
    renderer;
    device;
    adapter;
    context;
    constructor(canvas, renderer) {
        this.canvas = canvas;
        this.renderer = renderer;
    }
    async setup() {
        console.log("Initializing WebGPU");
        if (!navigator.gpu) {
            throw new Error('WebGPU is not supported');
        }
        const adapter = await navigator.gpu.requestAdapter();
        if (!adapter) {
            throw new Error('No useable adapter found');
        }
        this.adapter = adapter;
        this.device = await adapter.requestDevice();
        this.context = this.canvas.getContext('webgpu');
        this.context.configure({
            device: this.device,
            format: navigator.gpu.getPreferredCanvasFormat()
        });
    }
    getDevice() {
        return this.device;
    }
    getContext() {
        return this.context;
    }
    getCanvas() {
        return this.canvas;
    }
    getAdapter() {
        return this.adapter;
    }
    getRenderer() {
        return this.renderer;
    }
}

class ClearRenderPass {
    color;
    device;
    constructor(color) {
        this.color = color;
    }
    async setup(device) {
        this.device = device;
    }
    async setupBindings(device) {
    }
    render(commandEncoder) {
        const renderPassDescriptor = {
            colorAttachments: [
                {
                    clearValue: Color.toGPUColor(this.color),
                    loadOp: "clear",
                    storeOp: "store",
                    view: this.device.getContext().getCurrentTexture().createView()
                }
            ]
        };
        const renderPass = commandEncoder.beginRenderPass(renderPassDescriptor);
        renderPass.end();
    }
}

class TextureSampler {
    sampler;
    binding;
    getLayoutEntry() {
        return {
            binding: this.binding,
            visibility: GPUShaderStage.FRAGMENT,
            sampler: {}
        };
    }
    getBindGroupEntry() {
        return {
            binding: this.binding,
            resource: this.sampler
        };
    }
    setBinding(index) {
        this.binding = index;
    }
    async setup(device) {
        this.sampler = device.getDevice().createSampler({
            magFilter: 'nearest',
            minFilter: 'nearest',
            mipmapFilter: 'nearest',
            lodMinClamp: 0,
            lodMaxClamp: 0
        });
    }
}

class WebGPUTexture {
    source;
    texture;
    device;
    binding;
    constructor(source) {
        this.source = source;
    }
    setBinding(index) {
        this.binding = index;
    }
    getLayoutEntry() {
        return {
            binding: this.binding,
            visibility: GPUShaderStage.FRAGMENT,
            texture: {
                sampleType: 'float',
                viewDimension: '2d'
            }
        };
    }
    getBindGroupEntry() {
        if (!this.texture) {
            throw new Error('Texture not initialized');
        }
        return {
            binding: this.binding,
            resource: this.texture.createView()
        };
    }
    getTexture() {
        if (!this.texture) {
            throw new Error('Texture not initialized');
        }
        return this.texture;
    }
    async setup(device) {
        this.device = device;
        this.texture = device.getDevice().createTexture({
            size: [
                this.source.getTextureWidth(),
                this.source.getTextureHeight()
            ],
            format: 'rgba8unorm',
            usage: GPUTextureUsage.COPY_DST | GPUTextureUsage.TEXTURE_BINDING
        });
        device.getDevice().queue.writeTexture({ texture: this.texture }, this.source.toDataArray(), { bytesPerRow: this.source.getTextureWidth() * 4, rowsPerImage: this.source.getTextureHeight() }, [this.source.getTextureWidth(), this.source.getTextureHeight()]);
    }
}

class ShaderModule {
    label;
    code;
    shaderModule;
    constructor(label, code) {
        this.label = label;
        this.code = code;
    }
    setup(graphicsDevice) {
        this.shaderModule = graphicsDevice.getDevice().createShaderModule({
            label: this.label,
            code: this.code
        });
    }
    getShaderModule() {
        return this.shaderModule;
    }
    static async import(path, label = path) {
        const response = await fetch(path);
        const code = await response.text();
        return new ShaderModule(label, code);
    }
}

class PipelineBindGroupManager {
    parent;
    usedGroups = new Set();
    constructor(parent) {
        this.parent = parent;
    }
    useBindGroup(bindGroup) {
        this.parent.addBindGroup(bindGroup);
        this.usedGroups.add(bindGroup);
    }
    addBindGroupsToPipelineLayout(pipelineLayout) {
        const bindGroupLayouts = [];
        for (const bindGroup of this.usedGroups) {
            bindGroupLayouts.push(bindGroup.getBindGroupLayout());
        }
        pipelineLayout.bindGroupLayouts = bindGroupLayouts;
    }
    setBindGroupsOnRenderPassEncoder(encoder) {
        for (const bindGroup of this.usedGroups) {
            encoder.setBindGroup(bindGroup.getBindGroupIndex(), bindGroup.getBindGroup());
        }
    }
}

class BaseRenderPass {
    pipeline;
    descriptor = {};
    pipelineLayout;
    bindGroupManager;
    device;
    setBindGroupManager(bindGroupManager) {
        this.bindGroupManager = new PipelineBindGroupManager(bindGroupManager);
    }
    async setup(device) {
        const gpuDevice = device.getDevice();
        const layoutDescriptor = {};
        this.bindGroupManager.addBindGroupsToPipelineLayout(layoutDescriptor);
        this.pipelineLayout = gpuDevice.createPipelineLayout(layoutDescriptor);
        this.descriptor.layout = this.pipelineLayout;
        this.pipeline = gpuDevice.createRenderPipeline(this.descriptor);
        this.device = device;
    }
    async setupBindings(device) {
    }
    addLabel(label) {
        this.descriptor.label = label;
    }
    addVertexStage(module, entryPoint) {
        this.descriptor.vertex = {
            module: module.getShaderModule(),
            entryPoint
        };
    }
    addFragmentStage(module, entryPoint) {
        this.descriptor.fragment = {
            module: module.getShaderModule(),
            entryPoint,
            targets: [
                { format: navigator.gpu.getPreferredCanvasFormat() }
            ]
        };
    }
    addPrimitiveTopology(topology, cullMode = "none") {
        this.descriptor.primitive = {
            topology,
            cullMode
        };
    }
    getBindGroupManager() {
        return this.bindGroupManager;
    }
    getPipelineLayout() {
        return this.pipelineLayout;
    }
    render(commandEncoder) {
        const renderPass = commandEncoder.beginRenderPass({
            colorAttachments: [
                {
                    view: this.device.getContext().getCurrentTexture().createView(),
                    loadOp: "load",
                    storeOp: "store"
                }
            ]
        });
        this.bindGroupManager.setBindGroupsOnRenderPassEncoder(renderPass);
        renderPass.setPipeline(this.pipeline);
        this.draw(renderPass, commandEncoder);
        renderPass.end();
    }
    getGraphicsDevice() {
        return this.device;
    }
}

class TerrainRenderPass extends BaseRenderPass {
    worldMirror;
    indirectDrawBuffer;
    constructor(worldMirror) {
        super();
        this.worldMirror = worldMirror;
    }
    async setupBindings(device) {
        const gpuDevice = device.getDevice();
        this.indirectDrawBuffer = gpuDevice.createBuffer({
            label: "Terrain Indirect Draw Buffer",
            usage: GPUBufferUsage.INDIRECT | GPUBufferUsage.STORAGE,
            size: ChunkDataReferencer.cells * 16
        });
        const shader = await ShaderModule.import("/assets/shaders/terrain.wgsl", "Terrain Shader");
        shader.setup(device);
        this.addPrimitiveTopology("triangle-list", "back");
        this.addLabel("Terrain Render Pass");
        this.addVertexStage(shader, "vertex_main");
        this.addFragmentStage(shader, "fragment_main");
        this.getBindGroupManager().useBindGroup(device.getRenderer().getCamera().getCameraBindGroup());
        await this.setupBlockModelBindings(device);
    }
    async setupBlockModelBindings(device) {
        const blockModelBindGroup = new BindGroup(Bindings.BlockModelBindGroup);
        await this.setupGeometryBindings(blockModelBindGroup, device);
        await this.setupTextureMappingBindings(blockModelBindGroup, device);
        await this.setupTextureBindings(blockModelBindGroup, device);
        await this.setupTextureSamplerBindings(blockModelBindGroup, device);
        this.getBindGroupManager().useBindGroup(blockModelBindGroup);
    }
    async setupGeometryBindings(bindGroup, device) {
        const gpuDevice = device.getDevice();
        const geometryData = this.worldMirror.getTerrainMesh().getVertexPositions();
        const geometryBuffer = gpuDevice.createBuffer({
            label: "Terrain Geometry Buffer",
            size: geometryData.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
        });
        gpuDevice.queue.writeBuffer(geometryBuffer, 0, geometryData);
        const geometryBindGroupEntry = new BufferBindGroupEntry(geometryBuffer, GPUShaderStage.VERTEX, "read-only-storage");
        bindGroup.addEntry(Bindings.BlockModelGeometryBinding, geometryBindGroupEntry);
    }
    async setupTextureMappingBindings(bindGroup, device) {
        const gpuDevice = device.getDevice();
        const textureMappingData = this.worldMirror.getTerrainMesh().getTextureMappings();
        const textureMappingBuffer = gpuDevice.createBuffer({
            label: "Terrain Texture Mapping Buffer",
            size: textureMappingData.byteLength,
            usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST
        });
        gpuDevice.queue.writeBuffer(textureMappingBuffer, 0, textureMappingData);
        const textureMappingBindGroupEntry = new BufferBindGroupEntry(textureMappingBuffer, GPUShaderStage.VERTEX, "read-only-storage");
        bindGroup.addEntry(Bindings.BlockModelTextureMappingBinding, textureMappingBindGroupEntry);
    }
    async setupTextureBindings(bindGroup, device) {
        const texture = this.worldMirror.getTerrainMesh().getTexture();
        const gpuTexture = new WebGPUTexture(texture);
        bindGroup.addEntry(Bindings.BlockModelTextureBinding, gpuTexture);
    }
    async setupTextureSamplerBindings(bindGroup, device) {
        const textureSampler = new TextureSampler();
        bindGroup.addEntry(Bindings.BlockModelTextureSamplerBinding, textureSampler);
    }
    draw(renderPass, commandEncoder) {
        const gpuDevice = this.getGraphicsDevice().getDevice();
        for (const chunk of this.worldMirror.getVisibleChunks()) {
            gpuDevice.queue.writeBuffer(this.indirectDrawBuffer, 0, chunk.getIndirectDrawCalls());
            renderPass.drawIndirect(this.indirectDrawBuffer, 0);
        }
    }
}

class RenderWorldMirror {
    chunks = new Map();
    getChunks() {
        return this.chunks.values();
    }
    updateRenderedWorld() {
        const perspective = this.getPerspective();
        if (!perspective) {
            throw new Error("Cannot update rendered world without perspective");
        }
        const world = this.getWorld();
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
                    this.chunks.set(key, this.createRenderChunkMirror(position));
                }
            }
        }
    }
}

class AssembledMesh {
    vertexPositions;
    textureMappings;
    texture;
    startIndex;
    endIndex;
    constructor(vertexPositions, textureMappings, texture, startIndex, endIndex) {
        this.vertexPositions = vertexPositions;
        this.textureMappings = textureMappings;
        this.texture = texture;
        this.startIndex = startIndex;
        this.endIndex = endIndex;
    }
    getVertexPositions() {
        return this.vertexPositions;
    }
    getTextureMappings() {
        return this.textureMappings;
    }
    getTexture() {
        return this.texture;
    }
    getModelStartIndex(model) {
        if (!this.startIndex.has(model))
            throw new Error('Model not found in mesh assembler');
        return this.startIndex.get(model);
    }
    getModelEndIndex(model) {
        if (!this.endIndex.has(model))
            throw new Error('Model not found in mesh assembler');
        return this.endIndex.get(model);
    }
}

class MeshAssembler {
    models;
    vertexPositions;
    textureMappings;
    texture;
    startIndex;
    endIndex;
    constructor(models) {
        this.models = Array.from(models);
    }
    assembleMeshes() {
        if (this.texture) {
            return this.createAssembledMesh();
        }
        this.startIndex = new Map();
        this.endIndex = new Map();
        const modelVertexPositions = [];
        const modelTextureMappings = [];
        const modelTextureIds = [];
        let vertexIndex = 0;
        for (const model of this.models) {
            const vertexPositions = model.getVertexPositions();
            const textureMappings = model.getTextureMappings();
            const textureIds = model.getTextureIds();
            this.startIndex.set(model, vertexIndex);
            modelVertexPositions.push(vertexPositions);
            modelTextureMappings.push(textureMappings);
            modelTextureIds.push(textureIds);
            vertexIndex += vertexPositions.length / 3;
            this.endIndex.set(model, vertexIndex);
        }
        this.vertexPositions = new Float32Array(DataUtils.concat(modelVertexPositions));
        const textureArray = this.getTextureArrayFromModelTextureIds(modelTextureIds);
        const combinedSize = this.getCombinedTextureSize(textureArray);
        const { texturePositions, texture } = this.renderCombinedTextures(combinedSize, textureArray);
        this.texture = texture;
        this.textureMappings = new Uint32Array(vertexIndex * 2);
        for (let modelIndex = 0; modelIndex < modelTextureIds.length; modelIndex++) {
            const textureIds = modelTextureIds[modelIndex];
            const textureMappings = modelTextureMappings[modelIndex];
            const vertexStart = this.startIndex[modelIndex];
            for (let triangleIndex = 0; triangleIndex < textureIds.length; triangleIndex++) {
                const textureId = textureIds[triangleIndex];
                const textureIndex = textureArray.indexOf(Registries.textures.get(textureId));
                const texturePosition = texturePositions[textureIndex];
                for (let vertexIndex = 0; vertexIndex < 3; vertexIndex++) {
                    const vertexPosition = vertexStart + triangleIndex * 3 + vertexIndex;
                    this.textureMappings[vertexPosition * 2] = textureMappings[triangleIndex * 2] + texturePosition;
                    this.textureMappings[vertexPosition * 2 + 1] = textureMappings[triangleIndex * 2 + 1];
                }
            }
        }
        return this.createAssembledMesh();
    }
    createAssembledMesh() {
        return new AssembledMesh(this.vertexPositions, this.textureMappings, this.texture, this.startIndex, this.endIndex);
    }
    getTextureArrayFromModelTextureIds(modelTextureIds) {
        let textures = new Set();
        for (const ids of modelTextureIds) {
            for (const id of ids) {
                const texture = Registries.textures.get(id);
                if (!texture)
                    throw new Error(`Texture with id ${id} not found in registry`);
                textures.add(texture);
            }
        }
        return Array.from(textures);
    }
    getCombinedTextureSize(textures) {
        let combinedWidth = 0;
        let combinedHeight = 0;
        for (const texture of textures) {
            combinedWidth += texture.getTextureWidth();
            combinedHeight = Math.max(combinedHeight, texture.getTextureHeight());
        }
        return new ImmutableVector2D(combinedWidth, combinedHeight);
    }
    renderCombinedTextures(size, textures) {
        if (textures.length == 0) {
            return {
                texturePositions: new Uint32Array(0),
                texture: Texture.fromDataArray(new Uint8ClampedArray(0), 0, 0)
            };
        }
        const canvas = new OffscreenCanvas(size.x, size.y);
        const context = canvas.getContext('2d');
        const texturePositions = new Uint32Array(textures.length);
        let xOffset = 0;
        let textureIndex = 0;
        for (const texture of textures) {
            context.putImageData(texture.toImageData(), xOffset, 0);
            texturePositions[textureIndex] = xOffset;
            xOffset += texture.getTextureWidth();
            textureIndex++;
        }
        canvas.convertToBlob().then(blob => {
            const url = URL.createObjectURL(blob);
            const img = new Image();
            img.onload = () => {
                URL.revokeObjectURL(url);
            };
            img.src = url;
            document.body.appendChild(img);
        });
        const texture = Texture.fromImageData(context.getImageData(0, 0, size.x, size.y));
        return { texturePositions, texture };
    }
}

class InstancedDataSegment {
    model;
    size;
    startIndex;
    constructor(model, size, startIndex = 0) {
        this.model = model;
        this.size = size;
        this.startIndex = startIndex;
    }
    getSize() {
        return this.size;
    }
    setSize(value) {
        this.size = value;
    }
    getModel() {
        return this.model;
    }
    getStartIndex() {
        return this.startIndex;
    }
    setStartIndex(index) {
        this.startIndex = index;
    }
}

class InstancedData {
    chunkData;
    segments;
    constructor(chunkData) {
        this.chunkData = chunkData;
        this.update();
    }
    // Not very efficient right now
    update() {
        this.segments = [];
        let lastType = null;
        let lastSegment = null;
        for (let i = 0; i < ChunkDataReferencer.cells; i++) {
            const position = ChunkDataReferencer.position(i);
            const blockPrototype = this.chunkData.getBlock(position);
            const blockPosition = new BlockPosition(position, this.chunkData);
            const model = blockPrototype.getBlockModel(blockPosition);
            if (model != lastType) {
                lastSegment = new InstancedDataSegment(model, 0, i);
                this.segments.push(lastSegment);
                lastType = model;
            }
            const segment = lastSegment;
            segment.setSize(segment.getSize() + 1);
        }
    }
}

class WebGPUInstancedData extends InstancedData {
    assembledMesh;
    indirectCalls;
    constructor(assembledMesh, chunkData) {
        super(chunkData);
        this.assembledMesh = assembledMesh;
        this.indirectCalls = new ArrayBuffer(ChunkDataReferencer.cells * 16);
    }
    update() {
        super.update();
        const indirectCalls = new Uint32Array(this.indirectCalls);
        for (let i = 0; i < this.indirectCalls.byteLength / 16; i++) {
            if (i >= this.segments.length) {
                indirectCalls[i * 4] = 0;
                indirectCalls[i * 4 + 1] = 0;
                indirectCalls[i * 4 + 2] = 0;
                indirectCalls[i * 4 + 3] = 0;
                continue;
            }
            const segment = this.segments[i];
            const model = segment.getModel();
            if (!model)
                continue;
            const vertexStartIndex = this.assembledMesh.getModelStartIndex(model);
            const vertexEndIndex = this.assembledMesh.getModelEndIndex(model);
            const vertexCount = vertexEndIndex - vertexStartIndex;
            const instanceStartIndex = segment.getStartIndex();
            const instanceCount = segment.getSize();
            indirectCalls[i * 4] = vertexCount;
            indirectCalls[i * 4 + 1] = instanceCount;
            indirectCalls[i * 4 + 2] = vertexStartIndex;
            indirectCalls[i * 4 + 3] = instanceStartIndex;
        }
    }
    getIndirectCalls() {
        return this.indirectCalls;
    }
}

class WebGPUChunkMirror {
    position;
    worldMirror;
    instancedData;
    chunk;
    constructor(position, worldMirror) {
        this.position = position;
        this.worldMirror = worldMirror;
        this.chunk = this.worldMirror.getWorld().getChunk(this.position);
        this.instancedData = new WebGPUInstancedData(worldMirror.getTerrainMesh(), this.chunk.getChunkData());
    }
    getIndirectDrawCalls() {
        return this.instancedData.getIndirectCalls();
    }
    getPosition() {
        return this.position;
    }
}

class WebGPUWorldMirror extends RenderWorldMirror {
    renderer;
    terrainMesh;
    terrainTexture;
    constructor(renderer) {
        super();
        this.renderer = renderer;
    }
    async setup(device) {
        const meshAssembler = new MeshAssembler(Registries.blockModels.values());
        this.terrainMesh = meshAssembler.assembleMeshes();
        this.terrainTexture = new WebGPUTexture(this.terrainMesh.getTexture());
        await this.terrainTexture.setup(device);
    }
    getWorld() {
        return this.renderer.getWorld();
    }
    getPerspective() {
        return this.renderer.getPerspective();
    }
    createRenderChunkMirror(position) {
        return new WebGPUChunkMirror(position, this);
    }
    getTerrainMesh() {
        return this.terrainMesh;
    }
    getWorldRenderer() {
        return this.renderer;
    }
    getVisibleChunks() {
        return this.getChunks();
    }
}

class WebGPURenderer {
    renderer;
    device;
    world;
    renderedWorld;
    passes;
    bindGroupManager;
    camera;
    perspective;
    projector = new Projector(75, 1, 0.1, 1000);
    constructor(renderer) {
        this.renderer = renderer;
        this.renderedWorld = new WebGPUWorldMirror(this);
        this.device = new GraphicsDevice(document.createElement('canvas'), this);
        this.bindGroupManager = new BindGroupManager();
        const terrainRenderPass = new TerrainRenderPass(this.renderedWorld);
        terrainRenderPass.setBindGroupManager(this.bindGroupManager);
        this.passes = [
            new ClearRenderPass(new Color(0, 0.1, 0.2, 1)),
            terrainRenderPass
        ];
    }
    getCanvas() {
        return this.device.getCanvas();
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
        await this.device.setup();
        this.camera = new Camera();
        await this.camera.setup(this.device);
        this.bindGroupManager.addBindGroup(this.camera.getCameraBindGroup());
        await this.renderedWorld.setup(this.device);
        for (const pass of this.passes) {
            await pass.setupBindings(this.device);
        }
        await this.bindGroupManager.setup(this.device);
        for (const pass of this.passes) {
            await pass.setup(this.device);
        }
    }
    render() {
        const canvas = this.device.getCanvas();
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        this.projector.setAspectRatio(canvas.width / canvas.height);
        this.perspective.updatePerspective();
        this.renderedWorld.updateRenderedWorld();
        const gpuDevice = this.device.getDevice();
        const commandEncoder = gpuDevice.createCommandEncoder({
            label: "Renderer Command Encoder"
        });
        for (const renderPass of this.passes) {
            renderPass.render(commandEncoder);
        }
        this.device.getDevice().queue.submit([commandEncoder.finish()]);
    }
    getPerspective() {
        return this.perspective;
    }
    setPerspective(perspective) {
        this.perspective = perspective;
    }
    getProjector() {
        return this.projector;
    }
    setProjector(projector) {
        this.projector = projector;
    }
    getCamera() {
        return this.camera;
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
    getWorldRenderer() {
        if (!this.worldRenderer)
            throw new Error('No world renderer set');
        return this.worldRenderer;
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
        this.worldRenderer.setWorld(this.world);
        await this.worldRenderer.setupWorldRenderer();
    }
    render() {
        if (!this.worldRenderer)
            throw new Error('No world renderer set');
        this.worldRenderer.render();
    }
}

class EntityPerspective {
    entity;
    matrix;
    constructor(entity) {
        this.entity = entity;
    }
    getChunkLocation() {
        if (!this.entity.getParentChunk()) {
            throw new Error("Cannot get chunk location of unbound entity");
        }
        return this.entity.getParentChunk().getPosition();
    }
    getTransformationMatrix() {
        return this.matrix;
    }
    getRenderDistance() {
        return 10;
    }
    updatePerspective() {
        this.matrix = this.computeTransformationMatrix();
    }
    computeTransformationMatrix() {
        let matrix = new Matrix4();
        matrix.multiply(Matrix4.createTranslation(this.entity.getPosition()));
        matrix.multiply(Matrix4.createRotation(this.entity.getRotation()));
        return matrix;
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
    async start() {
        await super.start();
        await this.renderer.setupRenderer();
        const playerPrototype = Registries.entities.get('player');
        const playerEntity = playerPrototype.createEntity();
        this.getWorld().addEntity(playerEntity);
        const playerPerspective = new EntityPerspective(playerEntity);
        this.getRenderer().getWorldRenderer().setPerspective(playerPerspective);
        const clock = this.getClock();
        clock.schedule(() => this.renderer.render());
        clock.start();
    }
}

const client = new Client();
await client.start();
document.body.appendChild(client.getRenderer().getElement());
window['client'] = client;
//# sourceMappingURL=client.js.map
