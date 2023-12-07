# Chunk Data API

The **Chunk Data API** stores block data in an extensible and memory efficient way.

## Class: `ChunkDataReferencer`

A `ChunkDataReferencer` converts between indexes and positions in chunk data for given chunk dimensions.

### Typings

```ts
class ChunkDataReferencer {
    constructor(dimensions: Vector3D)

    get cells(): number

    index(x: number, y: number, z: number): number

    x(index: number): number
    y(index: number): number
    z(index: number): number

    position(index: number): Vector3D
}
```

### Constructor

#### `new ChunkDataReferencer(dimensions)`

Creates a new `ChunkDataReferencer` using the chunk dimensions passed in through the first argument.

##### Syntax

```ts
constructor(dimensions: Vector3D)
```

### Methods

#### `index(x, y, z)`

Computes the chunk data index for a given position, where any block position will have a different index from 0 to the total number of cells in a chunk minus 1.

```ts
index(position: Vector3D: number)
index(x: number, y: number, z: number): number
```

#### `x(index)`

Computes the `x` position of a specified chunk data index. This can be used with the `y()` and `z()` methods to get the complete position without creating a vector.

```ts
x(index: number): number
```

#### `y(index)`

Computes the `y` position of a specified chunk data index. This can be used with the `x()` and `z()` methods to get the complete position without creating a vector.

```ts
y(index: number): number
```

#### `z(index)`

Computes the `z` position of a specified chunk data index. This can be used with the `x()` and `y()` methods to get the complete position without creating a vector.

```ts
z(index: number): number
```

#### `position(index)`

Computes the position of a specified chunk data index. Equivalent to calling `x()`, `y()`, and `z()`, then assembling a vector from them.

```ts
position(index: number): Vector3D
```

## Class: `ChunkDataAllocator`

The `ChunkDataAllocator` allows multiple fields to be allocated before creating chunks.

```js
class ChunkDataAllocator {
    constructor();
    allocate(id: string, type: string);
    get fields(): Iterable<ChunkDataFieldAllocation>;
}
```

### Constructor
#### `new ChunkDataAllocator()`

Creates a new `ChunkDataAllocator` with a blank set of field allocations.

### Methods
#### `allocate(id, type)`

Allocates a new field under a given identifier.

```ts
allocate(id: string, type: string)
```

The `type` parameter can have one of the following values.

| Representation | 1 Bit | 4 Bits | 1 Byte | 2 Bytes | 4 Bytes | 8 Bytes | Unspecified Length |
|-|-|-|-|-|-|-|-|
| Boolean | `boolean` | | | | | | |
| Unsigned Integer | | `u4` | `u8` | `u16` | `u32` | | |
| Signed Integer | | `i4` | `i8` | `i16` | `i32` | | |
| Floating Point | | | | | `f32` | `f64` | |
| Any Data Type     | | | | | | | `object` |

### Properties
#### `fields`

The `fields` property contains the list of allocated `ChunkDataFieldAllocation` objects.

```ts
get fields(): Iterable<ChunkDataFieldAllocation>
```

## Class: `ChunkDataFieldAllocation`

A `ChunkDataFieldAllocation` describes a field that will be created in each chunk loaded.

```js
abstract class ChunkDataFieldAllocation<RepresentedType> {
    id: string;

    constructor(id: string);
    abstract get type(): string;
    abstract instantiate(): ChunkDataField<RepresentedType>;
}
```

### Generic Parameters
#### `RepresentedType`

The type of data that this field represents and the data type used when calling `get()`
and `set()` on an instance of this field.

### Constructor
#### `new ChunkDataFieldAllocation(id)`

Creates a new allocation with a given identifier.

### Abstract Methods
#### `instantiate()`

Instantiates and returns a data field to be stored in a `ChunkData` object.

```ts
abstract instantiate(): ChunkDataField<RepresentedType>
```

### Abstract Properties
#### `type`

The name of the data type (e.g. `i32`) used by the field.

```ts
abstract get type(): string;
```

### Subclasses

#### `ChunkDataBitAllocation`

Represents a field of the type `boolean`.

```js
class ChunkDataBitAllocation extends ChunkDataFieldAllocation<boolean> {
    type: 'boolean';

    constructor(id: string);
}
```

#### `ChunkDataBytesAllocation`

Represents a field for any size of `number`.

```js
class ChunkDataBytesAllocation extends ChunkDataFieldAllocation<number> {
    type: 'u4' | 'u8' | 'u16' | 'u32' | 'i4' | 'i8' | 'i16' | 'i32' | 'f32' | 'f64';

    constructor(id: string);
}
```

#### `ChunkDataObjectAllocation`

Represents a field for any serializable data type.

```js
class ChunkDataObjectAllocation<RepresentedType> extends ChunkDataFieldAllocation<RepresentedType> {
    constructor(id: string, dataType: DataType<RepresentedType>);

    get type(): 'object';
}
```

## Class: `ChunkDataField`

A `ChunkDataField` is an object where data for the field can be contained. It
requires methods to get and set values at positions.

```js
abstract class ChunkDataField<RepresentedType> {
    id: Identifier;

    constructor(id: Identifier);

    get(position: Vector3D): RepresentedType;
    get(index: number): RepresentedType;
    get(x: number, y: number, z: number): RepresentedType;

    set(position: Vector3D, value: RepresentedType): void;
    set(index: number, value: RepresentedType): void;
    set(x: number, y: number, z: number, value: RepresentedType): void;

    abstract _get(index: number): RepresentedType;
    abstract _set(index: number, value: RepresentedType): void;
    abstract get type(): string;
}
```

### Subclasses

#### `ChunkDataBitField`

```js
class ChunkDataBitField extends ChunkDataFieldAllocation<boolean> {
    type: 'boolean';

    constructor(id: Indentifier);
}
```

```js
class ChunkDataBytesAllocation extends ChunkDataFieldAllocation<number> {
    type: 'u4' | 'u8' | 'u16' | 'u32' | 'i4' | 'i8' | 'i16' | 'i32' | 'f32' | 'f64';

    constructor(id: Indentifier);
}
```

```js
class ChunkDataObjectAllocation<T> extends ChunkDataFieldAllocation<T> {
    id: Identifier;

    constructor(id: Indentifier);

    get type(): 'object';
}
```

## Class: `ChunkData`

The `ChunkData` class is an additional abstraction from the raw block data inside a chunk and
the outer `Chunk` object which has references to the world and contains entities.

```js
class ChunkData {
    getDataField(id: Identifier): ChunkDataField {
    }
}
```