import * as $hgUW1$ws from "ws";
import * as $hgUW1$fspromises from "fs/promises";

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
// Generated file using util/build-index.js
var $1c2b4cf589ddb160$exports = {};

var $cb09836d73b2b95b$exports = {};

$parcel$export($cb09836d73b2b95b$exports, "Package", () => $cb09836d73b2b95b$export$19705fd60e4de464);
class $cb09836d73b2b95b$export$19705fd60e4de464 {
}


const $1c2b4cf589ddb160$var$platform = new (0, $4de19c76eba2228e$export$2dffd0b5373a4389)();
class $1c2b4cf589ddb160$var$Package1 extends (0, $cb09836d73b2b95b$export$19705fd60e4de464) {
    id = "package1";
    async setup(platform) {
        console.log("setup package1");
    }
}
class $1c2b4cf589ddb160$var$Package2 extends (0, $cb09836d73b2b95b$export$19705fd60e4de464) {
    id = "package2";
    async setup(platform) {
        console.log("setup package2");
        const package1 = await platform.require("package1");
        console.log("package1", package1);
    }
}
$1c2b4cf589ddb160$var$platform.packages.add(new $1c2b4cf589ddb160$var$Package2());
$1c2b4cf589ddb160$var$platform.packages.add(new $1c2b4cf589ddb160$var$Package1());
await $1c2b4cf589ddb160$var$platform.setup();


var $69b5a3eed2547b70$exports = {};
var $d5ae3fde7e4bf925$exports = {};

$parcel$export($d5ae3fde7e4bf925$exports, "ChunkDataAllocator", () => $d5ae3fde7e4bf925$export$44423a6895b01593);
var $f577235cdf4e9c11$exports = {};


var $006ae5c370b4a7e3$exports = {};

$parcel$export($006ae5c370b4a7e3$exports, "ObjectDataType", () => $006ae5c370b4a7e3$export$d1ebc73dd2e876b0);
class $006ae5c370b4a7e3$export$d1ebc73dd2e876b0 {
    properties;
    keys;
    constructor(properties){
        this.properties = properties;
        this.keys = null;
        this.sortProperties();
    }
    sortProperties() {
        this.keys = Object.keys(this.properties).sort();
    }
    *encode(data) {
        for (const key of this.keys){
            const type = this.properties[key];
            yield* type.encode(data[key]);
        }
    }
    length(data) {
        let length = 0;
        for (const key of this.keys){
            const value = this.properties[key];
            length += value.length(data[key]);
        }
        return length;
    }
    decode(view, index) {
        const data = {};
        let length = 0;
        for (const key of this.keys){
            const value = this.properties[key];
            const [itemData, itemLength] = value.decode(view, index + length);
            length += itemLength;
            data[key] = itemData;
        }
        return [
            data,
            length
        ];
    }
    matches(data) {
        return typeof data == "object" && !Array.isArray(data) && !(data instanceof Set) && !(data instanceof WeakSet);
    }
}


class $d5ae3fde7e4bf925$export$44423a6895b01593 {
    _referencer;
    _bitCount;
    _attributeCount;
    _buffers;
    _fields;
    _generatedOptions;
    constructor({ referencer: referencer }){
        this._referencer = referencer;
        this._bitCount = 0;
        this._attributeCount = 0;
        this._buffers = [];
        this._fields = [];
        this._generatedOptions = null;
    }
    allocate(type, label = "") {
        if (type == "b") {
            let index = this._bitCount++;
            this._fields.push({
                type: "b",
                index: index,
                label: label
            });
            return index;
        } else if (type == "a") {
            let index = this._attributeCount++;
            this._fields.push({
                type: "a",
                index: label || index,
                label: label || index
            });
            return label || index;
        } else {
            const index = this._buffers.length;
            this._buffers.push({
                type: type,
                label: label
            });
            this._fields.push({
                type: type,
                index: index,
                label: label
            });
            return index;
        }
    }
    generateOptions() {
        if (this._generatedOptions) return this._generatedOptions;
        this._generatedOptions = {};
        if (this._bitCount > 0) this._generatedOptions.bits = {
            count: this._bitCount,
            referencer: this._referencer
        };
        if (this._attributeCount > 0) this._generatedOptions.map = {
            referencer: this._referencer
        };
        this._generatedOptions.buffers = [];
        for (const buffer of this._buffers)this._generatedOptions.buffers.push({
            type: buffer.type,
            label: buffer.label,
            referencer: this._referencer
        });
        this._generatedOptions.fields = this._fields;
        return this._generatedOptions;
    }
    generateType() {
        const cellType = new (0, $006ae5c370b4a7e3$export$d1ebc73dd2e876b0)();
        return new (0, $f577235cdf4e9c11$exports.ListDataType)((0, $f577235cdf4e9c11$exports.ListDataType).Set, cellType, this._referencer.cellsInChunk);
    }
}


var $bfce8bfea087405f$exports = {};

$parcel$export($bfce8bfea087405f$exports, "ChunkDataReferencer", () => $bfce8bfea087405f$export$2b5c283c493c53b7);
class $bfce8bfea087405f$export$2b5c283c493c53b7 {
    _chunkWidth;
    _chunkHeight;
    _chunkDepth;
    constructor({ chunkWidth: chunkWidth = 16, chunkHeight: chunkHeight = 16, chunkDepth: chunkDepth = 32 } = {}){
        this._chunkWidth = chunkWidth;
        this._chunkHeight = chunkHeight;
        this._chunkDepth = chunkDepth;
    }
    get cellsInChunk() {
        return this._chunkWidth * this._chunkHeight * this._chunkDepth;
    }
    indexOfPosition(x, y, z) {
        if (x < 0 || x >= this._chunkWidth) throw new Error(`Coordinate X in chunk is out of bounds: 0 ≤ ${x} < ${this._chunkWidth}`);
        if (y < 0 || y >= this._chunkHeight) throw new Error(`Coordinate Y in chunk is out of bounds: 0 ≤ ${y} < ${this._chunkHeight}`);
        if (z < 0 || z >= this._chunkDepth) throw new Error(`Coordinate Z in chunk is out of bounds: 0 ≤ ${z} < ${this._chunkDepth}`);
        return x + y * this._chunkWidth + z * this._chunkWidth * this._chunkHeight;
    }
    xOfIndex(index) {
        return index % this._chunkWidth;
    }
    yOfIndex(index) {
        return Math.floor(index / this._chunkWidth) % this._chunkHeight;
    }
    zOfIndex(index) {
        return Math.floor(index / (this._chunkWidth * this._chunkHeight));
    }
}


const $69b5a3eed2547b70$var$referencer = new (0, $bfce8bfea087405f$export$2b5c283c493c53b7)();
const $69b5a3eed2547b70$var$allocator = new (0, $d5ae3fde7e4bf925$export$44423a6895b01593)({
    referencer: $69b5a3eed2547b70$var$referencer
});
$69b5a3eed2547b70$var$allocator.allocate("u16", "block_type"); // all bits are block type
$69b5a3eed2547b70$var$allocator.allocate("u16", "fluid_status"); // bits 0-11: type, bits 12-15: level
$69b5a3eed2547b70$var$allocator.allocate("b", "was_placed");
$69b5a3eed2547b70$var$allocator.allocate("b", "was_harvested");
$69b5a3eed2547b70$var$allocator.allocate("b", "was_updated");
$69b5a3eed2547b70$var$allocator.allocate("a", "inventory");
const $69b5a3eed2547b70$var$options = $69b5a3eed2547b70$var$allocator.generateOptions();
console.log($69b5a3eed2547b70$var$options);


var $a8f2150588ecb1e9$exports = {};


var $a9c5f4c5bcf717c1$exports = {};

$parcel$export($a9c5f4c5bcf717c1$exports, "World", () => $a9c5f4c5bcf717c1$export$812cd9544993280d);

var $16d25ffe71220cf8$exports = {};

$parcel$export($16d25ffe71220cf8$exports, "Chunk", () => $16d25ffe71220cf8$export$5a0870a55ad02f1a);
var $d97beb89aaab57e8$exports = {};

$parcel$export($d97beb89aaab57e8$exports, "ChunkDataBits", () => $d97beb89aaab57e8$export$abf5020de4b1093d);
class $d97beb89aaab57e8$export$abf5020de4b1093d {
    _count;
    _referencer;
    _label;
    _arrays;
    constructor({ label: label = "", count: count, referencer: referencer, _arrays: _arrays = null }){
        this._count = count;
        this._referencer = referencer;
        this._label = label;
        this._arrays = _arrays;
        if (!this._arrays) this._makeArrays();
    }
    _makeArrays() {
        this._arrays = [];
        for(let i = 0; i < this._count / 8; i++)this._arrays.push(new Uint8Array(this._referencer.cellsInChunk));
    }
    _labelString() {
        if (this._label) return `'${this._label}'`;
        else return "[ChunkDataBits]";
    }
    _array(index) {
        return this._arrays[Math.floor(index / 8)];
    }
    get(bitIndex, x, y, z) {
        if (typeof y == "undefined") {
            if (x < 0 || x >= this._referencer._chunkWidth) throw new Error(`Index in ${this._labelString()} is out of bounds: ${x}`);
            return this._array(bitIndex)[x] & 1 << bitIndex % 8;
        } else return this._array(bitIndex)[this._referencer.indexOfPosition(x, y, z)] & 1 << bitIndex % 8;
    }
    set(bitIndex, x, y, z, value) {
        if (typeof y == "undefined") {
            if (x < 0 || x >= this._referencer._chunkWidth) throw new Error(`Index in ${this._labelString()} is out of bounds: ${x}`);
            if (value) this._array(bitIndex)[x] |= 1 << bitIndex;
            else this._array(bitIndex)[x] &= ~(1 << bitIndex);
        } else if (value) this._array(bitIndex)[this._referencer.indexOfPosition(x, y, z)] |= 1 << bitIndex % 8;
        else this._array(bitIndex)[this._referencer.indexOfPosition(x, y, z)] &= ~(1 << bitIndex % 8);
    }
}


var $0ab2aed3b52c3a51$exports = {};

$parcel$export($0ab2aed3b52c3a51$exports, "ChunkDataBuffer", () => $0ab2aed3b52c3a51$export$631d881877d78906);
class $0ab2aed3b52c3a51$export$631d881877d78906 {
    _arrayType;
    _referencer;
    _label;
    _data;
    constructor({ label: label = "", type: type, referencer: referencer }){
        this._arrayType = $0ab2aed3b52c3a51$export$631d881877d78906._typeToTypedArrayConstructor(type);
        this._referencer = referencer;
        this._label = label;
        this._data = new this._arrayType(referencer.cellsInChunk);
    }
    _labelString() {
        if (this._label) return `'${this._label}'`;
        else return `ChunkDataBuffer<${this._data.constructor.name}>`;
    }
    get(x, y, z) {
        if (typeof y == "undefined") {
            if (x < 0 || x >= this._referencer._chunkWidth) throw new Error(`Index in ${this._labelString()} is out of bounds: ${x}`);
            return this._data[x];
        } else return this._data[this._referencer.indexOfPosition(x, y, z)];
    }
    set(x, y, z, value) {
        if (typeof z === "undefined") {
            if (x < 0 || x >= this._referencer._chunkWidth) throw new Error(`Index in ${this._labelString()} is out of bounds: ${x}`);
            this._data[x] = z;
        } else this._data[this._referencer.indexOfPosition(x, y, z)] = value;
    }
    static _typeToTypedArrayConstructor(type) {
        if (type == "i8") return Int8Array;
        if (type == "i16") return Int16Array;
        if (type == "i32") return Int32Array;
        if (type == "u8") return Uint8Array;
        if (type == "u16") return Uint16Array;
        if (type == "u32") return Uint32Array;
        if (type == "f32") return Float32Array;
        if (type == "f64") return Float64Array;
        throw new Error(`Unknown array type: ${type}`);
    }
}


var $a828f7a0feefb7ce$exports = {};

$parcel$export($a828f7a0feefb7ce$exports, "ChunkDataField", () => $a828f7a0feefb7ce$export$def7bd615dc8de1f);
class $a828f7a0feefb7ce$export$def7bd615dc8de1f {
    index;
    chunk;
    type;
    label;
    constructor(index, label, type, chunk){
        this.index = index;
        this.label = label;
        this.type = type;
        this.chunk = chunk;
    }
    get(x, y, z) {
        if (x instanceof Vector3D) {
            x = x.x;
            y = x.y;
            z = x.z;
        }
        if (this.type == "b") return this.chunk._bits.get(this.index, x, y, z);
        else if (this.type == "a") return this.chunk._map.get(this.index, x, y, z);
        else return this.chunk._buffers[this.index].get(x, y, z);
    }
    set(x, y, z, value) {
        if (x instanceof Vector3D) {
            x = x.x;
            y = x.y;
            z = x.z;
            value = y;
        }
        if (this.type == "b") return this.chunk._bits.set(this.index, x, y, z, value);
        else if (this.type == "a") return this.chunk._map.set(this.index, x, y, z, value);
        else return this.chunk._buffers[this.index].set(x, y, z, value);
    }
}


var $dcb02e7d985bcc16$exports = {};

$parcel$export($dcb02e7d985bcc16$exports, "ChunkDataMap", () => $dcb02e7d985bcc16$export$49e76705d6b74e13);
class $dcb02e7d985bcc16$export$49e76705d6b74e13 {
    _referencer;
    _map;
    constructor({ referencer: referencer }){
        this._referencer = referencer;
        this._map = new Map();
    }
    get(attribute, x, y, z) {
        let index = typeof y == "undefined" ? x : this._referencer.indexOfPosition(x, y, z);
        return this._map.get(attribute + "." + index);
    }
    set(attribute, x, y, z, value) {
        let index = typeof y == "undefined" ? x : this._referencer.indexOfPosition(x, y, z);
        this._map.set(attribute + "." + index, value);
    }
}


class $16d25ffe71220cf8$export$5a0870a55ad02f1a {
    world;
    position;
    _entities;
    _bits;
    _buffers;
    _map;
    _fields;
    constructor(){
        this.world = null;
        this.position = null;
        this._entities = new Set();
        this._bits = null;
        this._buffers = [];
        this._map = null;
        this._fields = new Map();
    }
    _unload() {
        for (const entity of this._entities)this.world._entityIdMapping.delete(entity.id);
    }
    _setup() {
        const { bits: bits, buffers: buffers, map: map, fields: fields } = this.world._chunkDataOptions;
        if (bits) this._bits = new (0, $d97beb89aaab57e8$export$abf5020de4b1093d)(bits);
        if (map) this._map = new (0, $dcb02e7d985bcc16$export$49e76705d6b74e13)(map);
        for (const buffer of buffers)this._buffers.push(new (0, $0ab2aed3b52c3a51$export$631d881877d78906)(buffer));
        for (const field of fields)this._fields.set(field.label, new (0, $a828f7a0feefb7ce$export$def7bd615dc8de1f)(field.index, field.label, field.type, this));
    }
    field(name) {
        return this._fields.get(name);
    }
}


class $a9c5f4c5bcf717c1$export$812cd9544993280d {
    _entityIdMapping;
    _chunks;
    constructor(){
        this._entityIdMapping = new Map();
        this._chunks = new Map();
    }
    createChunk(x, z) {
        if (x instanceof (0, $3004e7bc6ef7cc28$export$f6b39f5a8a6533a5)) {
            z = x.y;
            x = x.x;
        }
        const chunk = new (0, $16d25ffe71220cf8$export$5a0870a55ad02f1a)();
        chunk.world = this;
        chunk.position = new (0, $1f17fb1147e33fb9$export$682abdd55e1e71c5)(x, z);
        chunk._setup();
        return chunk;
    }
    getChunk(x, z) {
        if (x instanceof (0, $3004e7bc6ef7cc28$export$f6b39f5a8a6533a5)) {
            z = x.y;
            x = x.x;
        }
        return this._chunks.get(x + "." + z) || null;
    }
    addEntity(entity) {
        this._entityIdMapping.add(entity.id);
        entity.world = this;
        entity._joinWorld();
        return entity;
    }
}


const $a8f2150588ecb1e9$var$referencer = new (0, $bfce8bfea087405f$export$2b5c283c493c53b7)();
const $a8f2150588ecb1e9$var$allocator = new (0, $d5ae3fde7e4bf925$export$44423a6895b01593)({
    referencer: $a8f2150588ecb1e9$var$referencer
});
$a8f2150588ecb1e9$var$allocator.allocate("u16", "block_type"); // all bits are block type
$a8f2150588ecb1e9$var$allocator.allocate("u16", "fluid_status"); // bits 0-11: type, bits 12-15: level
$a8f2150588ecb1e9$var$allocator.allocate("b", "was_placed");
$a8f2150588ecb1e9$var$allocator.allocate("b", "was_harvested");
$a8f2150588ecb1e9$var$allocator.allocate("b", "was_updated");
$a8f2150588ecb1e9$var$allocator.allocate("a", "inventory");
const $a8f2150588ecb1e9$var$options = $a8f2150588ecb1e9$var$allocator.generateOptions();
const $a8f2150588ecb1e9$var$world = new (0, $a9c5f4c5bcf717c1$export$812cd9544993280d)();
$a8f2150588ecb1e9$var$world.chunkDataOptions = $a8f2150588ecb1e9$var$options;
const $a8f2150588ecb1e9$var$chunk = $a8f2150588ecb1e9$var$world.createChunk(0, 0);
console.log($a8f2150588ecb1e9$var$chunk);
console.log("Test: Buffer Field");
$a8f2150588ecb1e9$var$chunk.field("block_type").set(0, 0, 0, 309);
if ($a8f2150588ecb1e9$var$chunk.field("block_type").get(0, 0, 0) != 309) throw new Error("Test failed");
console.log("Test: Map Field");
$a8f2150588ecb1e9$var$chunk.field("inventory").set(0, 0, 0, "Hello");
if ($a8f2150588ecb1e9$var$chunk.field("inventory").get(0, 0, 0) != "Hello") throw new Error("Test failed");
console.log("Test: Bit Field");
$a8f2150588ecb1e9$var$chunk.field("was_placed").set(0, 0, 0, true);
if (!$a8f2150588ecb1e9$var$chunk.field("was_placed").get(0, 0, 0)) throw new Error("Test failed");


var $b0e2cf28fe015bf6$exports = {};

$parcel$export($b0e2cf28fe015bf6$exports, "PlayerInteractionInterface", () => $b0e2cf28fe015bf6$export$8085a4ae8af01c46);
var $30597fc949675536$exports = {};

$parcel$export($30597fc949675536$exports, "Identifier", () => $30597fc949675536$export$989167234458594d);
class $30597fc949675536$export$989167234458594d {
    namespace;
    id;
    constructor(namespace, id){
        this.namespace = namespace;
        this.id = id;
    }
    is(identifier) {
        return this.namespace === identifier.namespace && this.id === identifier.id;
    }
    toString() {
        return `${this.namespace}:${this.id}`;
    }
    fromString(string) {
        const [namespace, id] = string.split(":");
        return new $30597fc949675536$export$989167234458594d(namespace, id);
    }
}


class $b0e2cf28fe015bf6$export$8085a4ae8af01c46 {
    static PlayerMoveEvent = new (0, $30597fc949675536$export$989167234458594d)("cubular", "player_move");
    static PlayerPlaceBlockEvent = new (0, $30597fc949675536$export$989167234458594d)("cubular", "player_place_block");
    _socket;
    constructor(socket){
        this._socket = socket;
    }
    movePlayer(location, rotation) {
        this._socket.emit($b0e2cf28fe015bf6$export$8085a4ae8af01c46.PlayerMoveEvent.toString(), location.x, location.y, location.z, rotation.yaw, rotation.pitch, rotation.roll);
    }
    placeBlock(location) {
        this._socket.emit($b0e2cf28fe015bf6$export$8085a4ae8af01c46.PlayerPlaceBlockEvent.toString(), location.x, location.y, location.z);
    }
}


var $fe143ab40f0c77a9$exports = {};

$parcel$export($fe143ab40f0c77a9$exports, "RemoteInteractionInterface", () => $fe143ab40f0c77a9$export$be567c6fe866892f);

class $fe143ab40f0c77a9$export$be567c6fe866892f {
    _socket;
    _moveListeners;
    _placeBlockListeners;
    constructor(socket){
        this._socket = socket;
        this._moveListeners = new Set();
        this._placeBlockListeners = new Set();
        this._socket.on((0, $b0e2cf28fe015bf6$export$8085a4ae8af01c46).PlayerMoveEvent.toString(), (event)=>{
            for (const listener of this._moveListeners)listener(event);
        });
        this._socket.on((0, $b0e2cf28fe015bf6$export$8085a4ae8af01c46).PlayerPlaceBlockEvent.toString(), (event)=>{
            for (const listener of this._placeBlockListeners)listener(event);
        });
    }
    onPlayerMove(listener) {
        this._moveListeners.add(listener);
    }
    onPlayerPlaceBlock(listener) {
        this._placeBlockListeners.add(listener);
    }
}


var $60584d5d9e08c082$exports = {};

$parcel$export($60584d5d9e08c082$exports, "ServerInterface", () => $60584d5d9e08c082$export$d7a4476ec3050a16);
var $fe5397202100c6d9$exports = {};

$parcel$defineInteropFlag($fe5397202100c6d9$exports);

$parcel$export($fe5397202100c6d9$exports, "default", () => $fe5397202100c6d9$export$2e2bcd8739ae039);
var $fe5397202100c6d9$var$ws = null;

if (typeof WebSocket !== "undefined") $fe5397202100c6d9$var$ws = WebSocket;
else $fe5397202100c6d9$var$ws = await $hgUW1$ws;
var $fe5397202100c6d9$export$2e2bcd8739ae039 = $fe5397202100c6d9$var$ws;


var $7c639ff06f1311bd$exports = {};

$parcel$export($7c639ff06f1311bd$exports, "SocketInterface", () => $7c639ff06f1311bd$export$615e3ced4eaea8e6);

class $7c639ff06f1311bd$export$615e3ced4eaea8e6 {
    socket;
    _nameToId;
    _messagesById;
    _messageRegistry;
    _messageListeners;
    _disconnectListeners;
    constructor(urlOrWebsocket, messageRegistry){
        this.socket = urlOrWebsocket instanceof (0, $fe5397202100c6d9$export$2e2bcd8739ae039).WebSocket ? urlOrWebsocket : new (0, $fe5397202100c6d9$export$2e2bcd8739ae039).WebSocket(urlOrWebsocket);
        this.socket.binaryType = "arraybuffer";
        this._nameToId = new Map();
        this._messagesById = new Map();
        this._messageRegistry = messageRegistry;
        this._messageListeners = [];
        this._disconnectListeners = new Set();
        this.socket.addEventListener("message", (event)=>{
            const view = new DataView(event.data);
            const id = view.getUint16(0);
            const transcoder = this._messagesById.get(id);
            if (!transcoder) {
                console.warn(new Error(`Unknown message id ${id}`).stack);
                return;
            }
            let data;
            try {
                data = transcoder.decodeFrom(view, 2);
            } catch (error) {
                error.message = `Failed to decode message '${name}': ${error.message}`;
                console.warn(error.stack);
            }
            const listeners = this._messageListeners[id];
            for (const listener of listeners)listener(data);
        });
        this.socket.addEventListener("close", ()=>{
            for (const listener of this._disconnectListeners)listener();
        });
    }
    setup() {
        [
            ...this._messageRegistry.entries()
        ].sort().forEach(([name1, transcoder], index)=>{
            this._nameToId.set(name1, index);
            this._messageListeners[index] = new Set();
            this._messagesById.set(index, transcoder);
        });
    }
    emit(name1, data) {
        const id = this._nameToId.get(name1);
        const transcoder = this._messagesById.get(id);
        const buffer = new ArrayBuffer(2 + transcoder.lengthOf(data));
        const view = new DataView(buffer);
        view.setUint16(0, id);
        try {
            transcoder.encodeTo(data, view, 2);
        } catch (error) {
            error.message = `Failed to encode message '${name1}': ${error.message}`;
            throw error;
        }
        this.socket.send(buffer);
    }
    on(name1, callback) {
        if (name1 == "disconnect") this._disconnectListeners.add(callback);
        else {
            const id = this._nameToId.get(name1);
            if (!this._messageListeners[id]) throw new Error(`Unknown message name '${name1}'`);
            this._messageListeners[id].add(callback);
        }
    }
    disconnect() {
        this.socket.close();
    }
}


class $60584d5d9e08c082$export$d7a4476ec3050a16 {
    server;
    sockets;
    _connectListeners;
    constructor(server, messageRegistry){
        if (!(0, $fe5397202100c6d9$export$2e2bcd8739ae039).WebSocketServer) throw new Error("Cannot create ServerInterface: WebSocketServer is not available");
        this.server = new (0, $fe5397202100c6d9$export$2e2bcd8739ae039).WebSocketServer({
            server: server
        });
        this.sockets = new Set();
        this._connectListeners = new Set();
        this.server.on("connection", (webSocket)=>{
            webSocket.on("error", (error)=>{
                error.message = `WebSocket error: ${error.message}`;
                console.warn(error.stack);
            });
            const socket = new (0, $7c639ff06f1311bd$export$615e3ced4eaea8e6)(webSocket, messageRegistry);
            this.sockets.add(socket);
            for (const listener of this._connectListeners)listener(socket);
            socket.on("disconnect", ()=>{
                this.sockets.delete(socket);
            });
        });
    }
    on(type, listener) {
        if (type == "connection") this._connectListeners.add(listener);
    }
}



var $8766cda483349dde$exports = {};

$parcel$export($8766cda483349dde$exports, "Rotation", () => $8766cda483349dde$export$9bdec6016cc824e2);
class $8766cda483349dde$export$9bdec6016cc824e2 {
    yaw;
    pitch;
    roll;
    constructor(yaw = 0, pitch = 0, roll = 0){
        if (typeof yaw !== "number") throw new TypeError("yaw must be a number");
        if (typeof pitch !== "number") throw new TypeError("pitch must be a number");
        if (typeof roll !== "number") throw new TypeError("roll must be a number");
        if (isNaN(yaw)) throw new TypeError("yaw must not be NaN");
        if (isNaN(pitch)) throw new TypeError("pitch must not be NaN");
        if (isNaN(roll)) throw new TypeError("roll must not be NaN");
        this.yaw = yaw;
        this.pitch = pitch;
        this.roll = roll;
    }
}


var $0394f34fdec3ab39$exports = {};

$parcel$export($0394f34fdec3ab39$exports, "Container", () => $0394f34fdec3ab39$export$42a852a2b6b56249);
class $0394f34fdec3ab39$export$42a852a2b6b56249 {
    package;
    dependencies;
    loaded = false;
    constructor(pkg){
        this.package = pkg;
    }
    get id() {
        return this.package.id;
    }
}




var $4de19c76eba2228e$exports = {};

$parcel$export($4de19c76eba2228e$exports, "Platform", () => $4de19c76eba2228e$export$2dffd0b5373a4389);
var $2fab5cb9a375609f$exports = {};

$parcel$export($2fab5cb9a375609f$exports, "VirtualPackageList", () => $2fab5cb9a375609f$export$121eff4fddc834c8);

class $2fab5cb9a375609f$export$121eff4fddc834c8 {
    _platform;
    constructor(platform){
        this._platform = platform;
    }
    *[Symbol.iterator]() {
        for (const container of this._platform._containers)yield container.package;
    }
    add(pkg) {
        this._platform._containers.add(new (0, $0394f34fdec3ab39$export$42a852a2b6b56249)(pkg));
    }
}


class $4de19c76eba2228e$export$2dffd0b5373a4389 {
    _containers;
    packages;
    constructor(){
        this._containers = new Set();
        this.packages = new (0, $2fab5cb9a375609f$export$121eff4fddc834c8)(this);
    }
    async require(id) {
        for (const container of this._containers){
            if (container.package.id == id) {
                if (!container.loaded) {
                    await container.package.setup(this);
                    container.loaded = true;
                }
            }
        }
    }
    async setup() {
        for (const container of this._containers){
            container.package.setup(this);
            container.loaded = true;
        }
    }
}


var $bd2a8808c6388ed3$exports = {};

$parcel$export($bd2a8808c6388ed3$exports, "Registry", () => $bd2a8808c6388ed3$export$4d9facee29974f3);
class $bd2a8808c6388ed3$export$4d9facee29974f3 {
    static Factory = Symbol("Factory");
    _data;
    constructor(){
        this._data = new Map();
    }
    entries() {
        return this._data.entries();
    }
    get(identifier) {
        return this._data.get(identifier.toString());
    }
    register(identifier, object) {
        this._data.set(identifier.toString(), object);
    }
}



var $836499ad1dab86a5$exports = {};

$parcel$export($836499ad1dab86a5$exports, "Component", () => $836499ad1dab86a5$export$16fa2f45be04daa8);
class $836499ad1dab86a5$export$16fa2f45be04daa8 {
    constructor(){
        this.parent = null;
        this._element = null;
    }
    bind(child) {
        child.parent = this;
    }
    get element() {
        if (this._element) return this._element;
        this._element = this.render();
        return this._element;
    }
}


var $1483f7cbf1566932$exports = {};

$parcel$defineInteropFlag($1483f7cbf1566932$exports);

$parcel$export($1483f7cbf1566932$exports, "default", () => $1483f7cbf1566932$export$2e2bcd8739ae039);
let $1483f7cbf1566932$var$fs;

if (typeof window == "undefined") $1483f7cbf1566932$var$fs = await $hgUW1$fspromises;
else $1483f7cbf1566932$var$fs = null;
var $1483f7cbf1566932$export$2e2bcd8739ae039 = $1483f7cbf1566932$var$fs;








var $d9b0ae7bdf7384d2$exports = {};




var $32b1f91115988a92$exports = {};

$parcel$export($32b1f91115988a92$exports, "Entity", () => $32b1f91115988a92$export$bc644a473284d944);
class $32b1f91115988a92$export$bc644a473284d944 {
    id;
    position;
}



var $ba41e68b96204c9a$exports = {};

$parcel$export($ba41e68b96204c9a$exports, "HandleableVector2D", () => $ba41e68b96204c9a$export$f4a9a5b9421256ce);
var $ebbc7c53d56cf22c$exports = {};

$parcel$export($ebbc7c53d56cf22c$exports, "MutableVector2D", () => $ebbc7c53d56cf22c$export$bb3b4d3cfef45c4);
var $3004e7bc6ef7cc28$exports = {};

$parcel$export($3004e7bc6ef7cc28$exports, "Vector2D", () => $3004e7bc6ef7cc28$export$f6b39f5a8a6533a5);

var $1f17fb1147e33fb9$exports = {};

$parcel$export($1f17fb1147e33fb9$exports, "ImmutableVector2D", () => $1f17fb1147e33fb9$export$682abdd55e1e71c5);

class $1f17fb1147e33fb9$export$682abdd55e1e71c5 extends (0, $3004e7bc6ef7cc28$export$f6b39f5a8a6533a5) {
    constructor(x = 0, y = 0){
        super(x, y);
    }
    _set(x, y) {
        return new $1f17fb1147e33fb9$export$682abdd55e1e71c5(x, y);
    }
    set(x, y) {
        throw new Error("Cannot set immutable vector");
    }
    static from(vector, format) {
        return new $1f17fb1147e33fb9$export$682abdd55e1e71c5(...(0, $3004e7bc6ef7cc28$export$f6b39f5a8a6533a5)._from(vector, format));
    }
}



class $3004e7bc6ef7cc28$export$f6b39f5a8a6533a5 {
    x;
    y;
    constructor(x = 0, y = 0){
        if (typeof x !== "number") throw new TypeError("x must be a number");
        if (typeof y !== "number") throw new TypeError("y must be a number");
        if (isNaN(x)) throw new TypeError("x must not be NaN");
        if (isNaN(y)) throw new TypeError("y must not be NaN");
        this.x = x;
        this.y = y;
    }
    add(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x + x, this.y + y);
            else return this._set(this.x + x, this.y + x);
        } else return this._set(this.x + x.x, this.y + x.y);
    }
    subtract(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x - x, this.y - y);
            else return this._set(this.x - x, this.y - x);
        } else return this._set(this.x - x.x, this.y - x.y);
    }
    reverseSubtract(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(x - this.x, y - this.y);
            else return this._set(x - this.x, x - this.y);
        } else return this._set(x.x - this.x, x.y - this.y);
    }
    complexMultiply(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x * x - this.y * y, this.x * y + this.y * x);
            else return this._set(this.x * x, this.y * x);
        } else return this._set(this.x * x.x - this.y * x.y, this.x * x.y + this.y * x.x);
    }
    scalarMultiply(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x * x, this.y * y);
            else return this._set(this.x * x, this.y * x);
        } else return this._set(this.x * x.x, this.y * x.y);
    }
    scalarDivide(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x / x, this.y / y);
            else return this._set(this.x / x, this.y / x);
        } else return this._set(this.x / x.x, this.y / x.y);
    }
    reverseScalarDivide(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(x / this.x, y / this.y);
            else return this._set(x / this.x, x / this.y);
        } else return this._set(x.x / this.x, x.y / this.y);
    }
    dot(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return this.x * x + this.y * y;
            else return this.x * x + this.y * x;
        } else return this.x * x.x + this.y * x.y;
    }
    length() {
        return Math.sqrt(this.lengthSquared());
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }
    distanceTo(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return Math.sqrt(this.distanceSquaredTo(x, y));
            else return Math.sqrt(this.distanceSquaredTo(x, x));
        } else return Math.sqrt(this.distanceSquaredTo(x.x, x.y));
    }
    distanceSquaredTo(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return (this.x - x) * (this.x - x) + (this.y - y) * (this.y - y);
            else return (this.x - x) * (this.x - x) + (this.y - x) * (this.y - x);
        } else return (this.x - x.x) * (this.x - x.x) + (this.y - x.y) * (this.y - x.y);
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
        return new (0, $1f17fb1147e33fb9$export$682abdd55e1e71c5)(this.x, this.y);
    }
    mutable() {
        return new (0, $ebbc7c53d56cf22c$export$bb3b4d3cfef45c4)(this.x, this.y);
    }
    clone() {
        if (this instanceof (0, $ebbc7c53d56cf22c$export$bb3b4d3cfef45c4)) return new (0, $ebbc7c53d56cf22c$export$bb3b4d3cfef45c4)(this.x, this.y);
        if (this instanceof (0, $1f17fb1147e33fb9$export$682abdd55e1e71c5)) return new (0, $1f17fb1147e33fb9$export$682abdd55e1e71c5)(this.x, this.y);
        if (this instanceof (0, $ba41e68b96204c9a$export$f4a9a5b9421256ce)) return new (0, $ba41e68b96204c9a$export$f4a9a5b9421256ce)(this.x, this.y);
        throw new Error(`Unknown vector type: ${this}`);
    }
    handle() {
        return new (0, $ba41e68b96204c9a$export$f4a9a5b9421256ce)(this.x, this.y);
    }
    static *_from(vector, format) {
        yield format[0] == "x" ? vector.x : format[0] == "y" ? vector.y : format[0] == "z" ? vector.z : format[0] == "1" ? 1 : 0;
        yield format[1] == "x" ? vector.x : format[1] == "y" ? vector.y : format[1] == "z" ? vector.z : format[1] == "1" ? 1 : 0;
    }
}


class $ebbc7c53d56cf22c$export$bb3b4d3cfef45c4 extends (0, $3004e7bc6ef7cc28$export$f6b39f5a8a6533a5) {
    constructor(x = 0, y = 0){
        super(x, y);
    }
    _set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }
    set(x, y) {
        if (typeof x === "number") {
            if (typeof y === "number") return this.set(x, y);
            else return this.set(x, x);
        } else return this.set(x.x, x.y);
    }
    static from(vector, format) {
        return new $ebbc7c53d56cf22c$export$bb3b4d3cfef45c4(...(0, $3004e7bc6ef7cc28$export$f6b39f5a8a6533a5)._from(vector, format));
    }
}



class $ba41e68b96204c9a$export$f4a9a5b9421256ce extends (0, $ebbc7c53d56cf22c$export$bb3b4d3cfef45c4) {
    _listeners;
    constructor(x = 0, y = 0){
        super(x, y);
        this._listeners = new Set();
    }
    on(type, handler) {
        if (type == "change") this._listeners.add(handler);
        else throw new Error("Unknown event type");
    }
    cause(type) {
        if (type == "change") for (const listener of this._listeners)listener();
        else throw new Error("Unknown event type");
    }
    _set(x, y) {
        this.cause("change");
        return super._set(x, y);
    }
    clone() {
        throw new Error("Cannot clone handleable vector. Instead use immutable() or mutable() to output a non-handlable vector.");
    }
    static from(vector, format) {
        return new $ba41e68b96204c9a$export$f4a9a5b9421256ce(...(0, $3004e7bc6ef7cc28$export$f6b39f5a8a6533a5)._from(vector, format));
    }
}





var $82176ee9deff56ae$exports = {};

$parcel$export($82176ee9deff56ae$exports, "HandleableVector3D", () => $82176ee9deff56ae$export$df48d8d2b5a28542);
var $56da61f464d12c42$exports = {};

$parcel$export($56da61f464d12c42$exports, "MutableVector3D", () => $56da61f464d12c42$export$f0877780f70bd48b);
var $318bfb3c4576feae$exports = {};

$parcel$export($318bfb3c4576feae$exports, "Vector3D", () => $318bfb3c4576feae$export$fe203bd8c6486855);

var $6abff8ce10594061$exports = {};

$parcel$export($6abff8ce10594061$exports, "ImmutableVector3D", () => $6abff8ce10594061$export$b3585f668e5cf1bf);

class $6abff8ce10594061$export$b3585f668e5cf1bf extends (0, $318bfb3c4576feae$export$fe203bd8c6486855) {
    constructor(x = 0, y = 0, z = 0){
        super(x, y, z);
    }
    _set(x, y, z) {
        return new $6abff8ce10594061$export$b3585f668e5cf1bf(x, y, z);
    }
    set(x, y, z) {
        throw new Error("Cannot set immutable vector");
    }
    static from(vector, format) {
        return new $6abff8ce10594061$export$b3585f668e5cf1bf(...(0, $318bfb3c4576feae$export$fe203bd8c6486855)._from(vector, format));
    }
}



class $318bfb3c4576feae$export$fe203bd8c6486855 {
    x;
    y;
    z;
    constructor(x = 0, y = 0, z = 0){
        if (typeof x !== "number") throw new TypeError("x must be a number");
        if (typeof y !== "number") throw new TypeError("y must be a number");
        if (typeof z !== "number") throw new TypeError("z must be a number");
        if (isNaN(x)) throw new TypeError("x must not be NaN");
        if (isNaN(y)) throw new TypeError("y must not be NaN");
        if (isNaN(z)) throw new TypeError("z must not be NaN");
        this.x = x;
        this.y = y;
        this.z = z;
    }
    add(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x + x, this.y + y, this.z + z);
            else return this._set(this.x + x, this.y + x, this.z + x);
        } else return this._set(this.x + x.x, this.y + x.y, this.z + x.z);
    }
    subtract(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x - x, this.y - y, this.z - z);
            else return this._set(this.x - x, this.y - x, this.z - x);
        } else return this._set(this.x - x.x, this.y - x.y, this.z - x.z);
    }
    reverseSubtract(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(x - this.x, y - this.y, z - this.z);
            else return this._set(x - this.x, x - this.y, x - this.z);
        } else return this._set(x.x - this.x, x.y - this.y, x.z - this.z);
    }
    complexMultiply(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x * x - this.y * y, this.x * y + this.y * x, this.z * z);
            else return this._set(this.x * x, this.y * x, this.z * x);
        } else return this._set(this.x * x.x - this.y * x.y, this.x * x.y + this.y * x.x, this.z * x.z);
    }
    scalarMultiply(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x * x, this.y * y, this.z * z);
            else return this._set(this.x * x, this.y * x, this.z * x);
        } else return this._set(this.x * x.x, this.y * x.y, this.z * x.z);
    }
    scalarDivide(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(this.x / x, this.y / y, this.z / z);
            else return this._set(this.x / x, this.y / x, this.z / x);
        } else return this._set(this.x / x.x, this.y / x.y, this.z / x.z);
    }
    reverseScalarDivide(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return this._set(x / this.x, y / this.y, this.z / z);
            else return this._set(x / this.x, x / this.y, this.z / z);
        } else return this._set(x.x / this.x, x.y / this.y, this.z / z);
    }
    dot(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return this.x * x + this.y * y + this.z * z;
            else return this.x * x + this.y * x + this.z * x;
        } else return this.x * x.x + this.y * x.y + this.z * x.z;
    }
    length() {
        return Math.sqrt(this.lengthSquared());
    }
    lengthSquared() {
        return this.x * this.x + this.y * this.y;
    }
    distanceTo(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return Math.sqrt(this.distanceSquaredTo(x, y, z));
            else return Math.sqrt(this.distanceSquaredTo(x, x, x));
        } else return Math.sqrt(this.distanceSquaredTo(x.x, x.y, x.z));
    }
    distanceSquaredTo(x, y, z) {
        if (typeof x === "number") {
            if (typeof y === "number") return (this.x - x) ** 2 + (this.y - y) ** 2 + (this.z - z) ** 2;
            else return (this.x - x) ** 2 + (this.y - x) ** 2 + (this.z - x) ** 2;
        } else return (this.x - x.x) ** 2 + (this.y - x.y) ** 2 + (this.z - x.z) ** 2;
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
        return new (0, $6abff8ce10594061$export$b3585f668e5cf1bf)(this.x, this.y, this.z);
    }
    mutable() {
        return new (0, $56da61f464d12c42$export$f0877780f70bd48b)(this.x, this.y, this.z);
    }
    clone() {
        if (this instanceof (0, $56da61f464d12c42$export$f0877780f70bd48b)) return new (0, $56da61f464d12c42$export$f0877780f70bd48b)(this.x, this.y, this.z);
        if (this instanceof (0, $6abff8ce10594061$export$b3585f668e5cf1bf)) return new (0, $6abff8ce10594061$export$b3585f668e5cf1bf)(this.x, this.y, this.z);
        if (this instanceof (0, $82176ee9deff56ae$export$df48d8d2b5a28542)) return new (0, $82176ee9deff56ae$export$df48d8d2b5a28542)(this.x, this.y, this.z);
        throw new Error(`Unknown vector type: ${this.constructor.name}`);
    }
    handle() {
        return new (0, $82176ee9deff56ae$export$df48d8d2b5a28542)(this.x, this.y, this.z);
    }
    static *_from(vector, format) {
        yield format[0] == "x" ? vector.x : format[0] == "y" ? vector.y : format[0] == "1" ? 1 : 0;
        yield format[1] == "x" ? vector.x : format[1] == "y" ? vector.y : format[1] == "1" ? 1 : 0;
        yield format[2] == "x" ? vector.x : format[2] == "y" ? vector.y : format[2] == "1" ? 1 : 0;
    }
}


class $56da61f464d12c42$export$f0877780f70bd48b extends (0, $318bfb3c4576feae$export$fe203bd8c6486855) {
    constructor(x = 0, y = 0, z = 0){
        super(x, y, z);
    }
    _set(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
        return this;
    }
    static from(vector, format) {
        return new $56da61f464d12c42$export$f0877780f70bd48b(...(0, $318bfb3c4576feae$export$fe203bd8c6486855)._from(vector, format));
    }
}



class $82176ee9deff56ae$export$df48d8d2b5a28542 extends (0, $56da61f464d12c42$export$f0877780f70bd48b) {
    _listeners;
    constructor(x = 0, y = 0, z = 0){
        super(x, y, z);
        this._listeners = new Set();
    }
    on(type, handler) {
        if (type == "change") this._listeners.add(handler);
        else throw new Error("Unknown event type");
    }
    cause(type) {
        if (type == "change") for (const listener of this._listeners)listener();
        else throw new Error("Unknown event type");
    }
    _set(x, y, z) {
        this.cause("change");
        return super._set(x, y, z);
    }
    clone() {
        throw new Error("Cannot clone handleable vector. Instead use immutable() or mutable() to output a non-handlable vector.");
    }
    static from(vector, format) {
        return new $82176ee9deff56ae$export$df48d8d2b5a28542(...(0, $318bfb3c4576feae$export$fe203bd8c6486855)._from(vector, format));
    }
}





var $0d8e6e5a7987d66c$exports = {};

$parcel$export($0d8e6e5a7987d66c$exports, "ButtonComponent", () => $0d8e6e5a7987d66c$export$3b0c38219ddaf128);

class $0d8e6e5a7987d66c$export$3b0c38219ddaf128 extends (0, $836499ad1dab86a5$export$16fa2f45be04daa8) {
    constructor(text){
        super();
        this.text = text;
        this.listeners = new Set();
    }
    onClick(listener) {
        if (this._element) this._element.addEventListener("click", listener);
    }
    render() {
        const element = document.createElement("button");
        element.classList.add("cubecraft-button");
        element.innerText = this.text;
        for (const listener of this.listeners)element.addEventListener("click", listener);
        return element;
    }
}


var $7f8e57c6212f0d2b$exports = {};

$parcel$export($7f8e57c6212f0d2b$exports, "LauncherComponent", () => $7f8e57c6212f0d2b$export$f5c5ab50d8041c30);

class $7f8e57c6212f0d2b$export$f5c5ab50d8041c30 extends (0, $836499ad1dab86a5$export$16fa2f45be04daa8) {
}


var $2d8b0ae2b2831af8$exports = {};

$parcel$export($2d8b0ae2b2831af8$exports, "WorldStorageInterface", () => $2d8b0ae2b2831af8$export$ffc1227c56b88dd4);
class $2d8b0ae2b2831af8$export$ffc1227c56b88dd4 {
    setup() {
        throw new Error("Not implemented");
    }
    loadChunk(chunk) {
        throw new Error("Not implemented");
    }
    unloadChunk(chunk) {
        throw new Error("Not implemented");
    }
}


var $2921dceb1c08dd67$exports = {};

$parcel$export($2921dceb1c08dd67$exports, "CenteredFlexComponent", () => $2921dceb1c08dd67$export$f43f9d485fcd9d29);
var $31e84ae110a8537f$exports = {};

$parcel$export($31e84ae110a8537f$exports, "FlexComponent", () => $31e84ae110a8537f$export$7a17c5943022e14f);
class $31e84ae110a8537f$export$7a17c5943022e14f extends Component {
    constructor(size){
        super();
        this._size = size;
    }
    render() {
        const element = document.createElement("div");
        if (typeof this.size == "number") element.style.flex = this._size;
        element.classList.add("cubecraft-flex");
        return element;
    }
}


class $2921dceb1c08dd67$export$f43f9d485fcd9d29 extends (0, $31e84ae110a8537f$export$7a17c5943022e14f) {
    render() {
        const element = super.render();
        element.classList.add("cubecraft-centered-flex");
        return element;
    }
}


var $b851d521e662e4cb$exports = {};

$parcel$export($b851d521e662e4cb$exports, "ColumnComponent", () => $b851d521e662e4cb$export$11bb209ad3a8e411);
var $7ddcff412b83d336$exports = {};

$parcel$export($7ddcff412b83d336$exports, "FlexboxComponent", () => $7ddcff412b83d336$export$e81819a2195f4d76);

class $7ddcff412b83d336$export$e81819a2195f4d76 extends (0, $836499ad1dab86a5$export$16fa2f45be04daa8) {
    constructor(direction){
        super();
        this.direction = direction;
        this.children = new Set();
    }
    add(child) {
        this.bind(child);
        this.children.add(child);
    }
    render() {
        const element = document.createElement("div");
        element.classList.add("cubecraft-flexbox-" + this.direction);
        for (const child of this.children)element.appendChild(child.element);
        return element;
    }
}


class $b851d521e662e4cb$export$11bb209ad3a8e411 extends (0, $7ddcff412b83d336$export$e81819a2195f4d76) {
    constuctor() {
        super("column");
    }
}




var $f63a98e01ec3a02a$exports = {};

$parcel$export($f63a98e01ec3a02a$exports, "RowComponent", () => $f63a98e01ec3a02a$export$5df91075f5ba4651);

class $f63a98e01ec3a02a$export$5df91075f5ba4651 extends (0, $7ddcff412b83d336$export$e81819a2195f4d76) {
    constuctor() {
        super("row");
    }
}


var $0cceeccbe9ad5b6f$exports = {};


var $57969bf122d1a8d9$exports = {};



var $1aff76293f5ecd5a$exports = {};


var $e8f9ea3e720fac39$exports = {};



var $7c5e826147db8508$exports = {};




export {$60584d5d9e08c082$export$d7a4476ec3050a16 as ServerInterface, $7c639ff06f1311bd$export$615e3ced4eaea8e6 as SocketInterface, $8766cda483349dde$export$9bdec6016cc824e2 as Rotation, $0394f34fdec3ab39$export$42a852a2b6b56249 as Container, $30597fc949675536$export$989167234458594d as Identifier, $cb09836d73b2b95b$export$19705fd60e4de464 as Package, $4de19c76eba2228e$export$2dffd0b5373a4389 as Platform, $bd2a8808c6388ed3$export$4d9facee29974f3 as Registry, $2fab5cb9a375609f$export$121eff4fddc834c8 as VirtualPackageList, $836499ad1dab86a5$export$16fa2f45be04daa8 as Component, $d5ae3fde7e4bf925$export$44423a6895b01593 as ChunkDataAllocator, $d97beb89aaab57e8$export$abf5020de4b1093d as ChunkDataBits, $0ab2aed3b52c3a51$export$631d881877d78906 as ChunkDataBuffer, $a828f7a0feefb7ce$export$def7bd615dc8de1f as ChunkDataField, $dcb02e7d985bcc16$export$49e76705d6b74e13 as ChunkDataMap, $bfce8bfea087405f$export$2b5c283c493c53b7 as ChunkDataReferencer, $16d25ffe71220cf8$export$5a0870a55ad02f1a as Chunk, $32b1f91115988a92$export$bc644a473284d944 as Entity, $a9c5f4c5bcf717c1$export$812cd9544993280d as World, $ba41e68b96204c9a$export$f4a9a5b9421256ce as HandleableVector2D, $1f17fb1147e33fb9$export$682abdd55e1e71c5 as ImmutableVector2D, $ebbc7c53d56cf22c$export$bb3b4d3cfef45c4 as MutableVector2D, $3004e7bc6ef7cc28$export$f6b39f5a8a6533a5 as Vector2D, $82176ee9deff56ae$export$df48d8d2b5a28542 as HandleableVector3D, $6abff8ce10594061$export$b3585f668e5cf1bf as ImmutableVector3D, $56da61f464d12c42$export$f0877780f70bd48b as MutableVector3D, $318bfb3c4576feae$export$fe203bd8c6486855 as Vector3D, $0d8e6e5a7987d66c$export$3b0c38219ddaf128 as ButtonComponent, $7f8e57c6212f0d2b$export$f5c5ab50d8041c30 as LauncherComponent, $2d8b0ae2b2831af8$export$ffc1227c56b88dd4 as WorldStorageInterface, $2921dceb1c08dd67$export$f43f9d485fcd9d29 as CenteredFlexComponent, $b851d521e662e4cb$export$11bb209ad3a8e411 as ColumnComponent, $31e84ae110a8537f$export$7a17c5943022e14f as FlexComponent, $7ddcff412b83d336$export$e81819a2195f4d76 as FlexboxComponent, $f63a98e01ec3a02a$export$5df91075f5ba4651 as RowComponent, $57969bf122d1a8d9$exports as default, $f577235cdf4e9c11$exports as default, $1aff76293f5ecd5a$exports as default, $e8f9ea3e720fac39$exports as default, $006ae5c370b4a7e3$export$d1ebc73dd2e876b0 as ObjectDataType, $7c5e826147db8508$exports as default, $b0e2cf28fe015bf6$export$8085a4ae8af01c46 as PlayerInteractionInterface, $fe143ab40f0c77a9$export$be567c6fe866892f as RemoteInteractionInterface};
//# sourceMappingURL=main.js.map
