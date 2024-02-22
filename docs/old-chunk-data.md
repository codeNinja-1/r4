# Chunk Data API

The **Chunk Data API** stores block data in an extensible and memory efficient way.

## Namespace: `ChunkDataReferencer`

The `ChunkDataReferencer` converts between indexes and positions in chunk data for some chunk dimensions.

### Typings

```ts
namespace ChunkDataReferencer {
    const dimensions: Vector3D;
    const cells: number;

    function index(x: number, y: number, z: number): number

    function x(index: number): number
    function y(index: number): number
    function z(index: number): number

    function position(index: number): Vector3D
}
```

### Functions

#### `index(x, y, z)`

Computes the chunk data index for a given position, where any block position will have a different index from 0 to the total number of cells in a chunk minus 1.

```ts
index(position: Vector3D: number)
index(x: number, y: number, z: number): number
```

#### `x(index)`

Computes the `x` position of a specified chunk data index. This can be used with the `y()` and `z()` functions to get the complete position without creating a vector.

```ts
x(index: number): number
```

#### `y(index)`

Computes the `y` position of a specified chunk data index. This can be used with the `x()` and `z()` functions to get the complete position without creating a vector.

```ts
y(index: number): number
```

#### `z(index)`

Computes the `z` position of a specified chunk data index. This can be used with the `x()` and `y()` functions to get the complete position without creating a vector.

```ts
z(index: number): number
```

#### `position(index)`

Computes the position of a specified chunk data index. Equivalent to calling `x()`, `y()`, and `z()`, then assembling a vector from them.

```ts
position(index: number): Vector3D
```

### Constants

#### `cells`

The total number of cells in a chunk.

```ts
cells: number;
```

#### `dimensions`

The dimensions of a chunk as a vector.

```ts
dimensions: Vector3D;
```

## Class: `ChunkDataFieldAllocation`

> **Status:** Base class implemented

A `ChunkDataFieldAllocation` describes a field that will be created in each chunk loaded.

```js
abstract class ChunkDataFieldAllocation<RepresentedType> {
    constructor();
    abstract instantiate(): ChunkDataField<RepresentedType>;
}
```

### Generic Parameters
#### `RepresentedType`

The type of data that this field represents and the data type used when calling `get()` and `set()` on an instance of this field.

### Constructor
#### `new ChunkDataFieldAllocation()`

Creates a new allocation.

### Abstract Methods
#### `instantiate()`

Instantiates and returns a data field to be stored in a `ChunkData` object.

```ts
abstract instantiate(): ChunkDataField<RepresentedType>
```

### Implementations

#### `ChunkDataBitAllocation`

Represents a field of the type `boolean`.

```js
class ChunkDataBitAllocation implements ChunkDataFieldAllocation<boolean> {
}
```

#### `ChunkDataNumberAllocation`

Represents a field for any size of `number`.

```js
class ChunkDataNumberAllocation implements ChunkDataFieldAllocation<number> {
    type: 'u4' | 'u8' | 'u16' | 'u32' | 'i4' | 'i8' | 'i16' | 'i32' | 'f32' | 'f64';

    constructor(type: string);
}
```

#### `ChunkDataObjectAllocation`

Represents a field for any serializable data type.

```js
class ChunkDataObjectAllocation<RepresentedType> implements ChunkDataFieldAllocation<RepresentedType> {
    dataType: DataType<RepresentedType>;

    constructor(dataType: DataType<RepresentedType>);
}
```

## Class: `ChunkDataField`

> **Status:** Implemented

A `ChunkDataField` is an object where data for the field can be contained. It requires methods to get and set values at positions.

```js
abstract class ChunkDataField<RepresentedType> {
    constructor();

    chunkData: ChunkData;

    get(position: Vector3D): RepresentedType;
    get(index: number): RepresentedType;
    get(x: number, y: number, z: number): RepresentedType;

    set(position: Vector3D, value: RepresentedType): void;
    set(index: number, value: RepresentedType): void;
    set(x: number, y: number, z: number, value: RepresentedType): void;

    abstract _get(index: number): RepresentedType;
    abstract _set(index: number, value: RepresentedType): void;
}
```

### Generic Parameters
#### `RepresentedType`

The type of data that this field represents and the data type used when calling `get()` and `set()` on an instance of this field.

### Constructor
#### `new ChunkDataField()`

Creates a new field.

### Methods
#### `get(position)`

Gets the value of the field at a given position.

```ts
get(position: Vector3D): RepresentedType;
get(index: number): RepresentedType;
get(x: number, y: number, z: number): RepresentedType;
```

#### `set(position, value)`

Sets the value of the field at a given position.

```ts
set(position: Vector3D, value: RepresentedType): void;
set(index: number, value: RepresentedType): void;
set(x: number, y: number, z: number, value: RepresentedType): void;
```

#### `_get(index)`

Gets the value of the field at a given index.

```ts
_get(index: number): RepresentedType;
```

#### `_set(index, value)`

Sets the value of the field at a given index.

```ts
_set(index: number, value: RepresentedType): void;
```

### Properties
#### `chunkData`

The `ChunkData` object that this field is contained in.

```ts
chunkData: ChunkData;
```

### Subclasses

#### `ChunkDataBitField`

```js
class ChunkDataBitField extends ChunkDataField<boolean> {
    constructor();
}
```

```js
class ChunkDataNumberField extends ChunkDataField<number> {
    type: 'u4' | 'u8' | 'u16' | 'u32' | 'i4' | 'i8' | 'i16' | 'i32' | 'f32' | 'f64';

    constructor(type: 'u4' | 'u8' | 'u16' | 'u32' | 'i4' | 'i8' | 'i16' | 'i32' | 'f32' | 'f64');
}
```

```js
class ChunkDataObjectField<T> extends ChunkDataField<T> {
    constructor();
}
```

## Class: `ChunkData`

The `ChunkData` class is an additional abstraction from the raw block data inside a chunk and the outer `Chunk` object which has references to the world and contains entities.

```js
class ChunkData {
    getField(id: string): ChunkDataField;
}
```