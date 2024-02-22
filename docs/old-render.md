# Terrain Rendering

## WebGPU Renderer

### Uniforms

#### `model_geometry`

**Data Type:** `array<vec4<float32>>`<br>
**Binding:** `0`

Does not change after initialization. Contains all of the model geometries.

#### `model_texture_mappings`

**Data Type:** `array<vec4<u32>>`<br>
**Binding:** `1`

Does not change after initialization. Contains all of the model UVs.

#### `model_textures`

**Data Type:** `texture2d`<br>
**Bindings:**
 * Group `2`, Binding `0` - Sampler
 * Group `2`, Binding `1` - Texture

Does not change after initialization. Contains all of the model textures, baked into a single texture.

#### `chunk_offset`

**Data Type:** `vec2<f32>`<br>
**Binding:** `3`

The position of the chunk, in block coordinates, relative to the player.

#### `view_projection_matrix`

**Data Type:** `mat4x4<f32>`<br>
**Binding:** `4`

The view projection matrix, multiplied with a position to get the final position on the screen.

### Chunk Draw Calls

Rendering is done using [`RenderPassEncoder.drawIndirect()`](https://developer.mozilla.org/en-US/docs/Web/API/GPURenderPassEncoder/drawIndirect), passing in the instances to draw and their indexes in the model geometry.

This means that only a single draw call is made for all of the instances of a model, which is very efficient. No data needs to be transferred into vertex buffers before drawing a chunk.

## Geometry & Texture Baking

The model geometries and textures are baked into a single buffer and texture, respectively, to reduce the number of draw calls and texture bindings.

Each `StaticModel` can return `ArrayBuffer`s containing the geometry, UVs, and textures used in the the component. These are then baked into a a buffers and a single texture by the `MeshAssembler`, which are then used in the rendering process.

### Class `MeshAssembler`

The `MeshAssembler` is responsible for baking all of the model's geometries and textures together. It is used by the WebGPU renderer to create the buffers and textures used in the rendering process.

#### Constructor

```ts
new MeshAssembler(...models: StaticModel)
```

The constructor initializes the `MeshAssembler` with some models.

#### Methods

##### `assembleMeshes()`

```ts
assembleMeshes(): AssembledMesh
```

Assembles the meshes, and returns an `AssembledMesh`.

### Class `AssembledMesh`

The `AssembledMesh` class is used to represent a mesh that has been assembled by the `MeshAssembler`.

#### Methods

##### `getVertexPositions()`

```ts
getVertexPositions(): Float32Array
```

Gets the vertex buffer.

##### `getTextureMappings()`

```ts
getTextureMappings(): Uint32Array
```

Gets the texture mappings buffer.

##### `getTexture()`

```ts
getTexture(): Texture
```

Gets the combined texture.

##### `getModelStartIndex()`

```ts
getModelStartIndex(model: StaticModel): number
```

Returns the start index of the model in the geometry and texture mapping buffer.

##### `getModelEndIndex()`

```ts
getModelEndIndex(model: StaticModel): number
```

Returns the end index of the model in the geometry and texture mapping buffer.

### Interface `StaticModel` implements `IndexedRegistryItem`

The `StaticModel` interface is used to represent a model that can be baked by the `MeshAssembler`.

#### Methods

##### `getVertexPositions()`

```ts
getVertexPositions(): Float32Array
```

Returns the vertex positions of the model.

##### `getTextureMappings()`

```ts
getTextureMappings(): Uint32Array
```

Returns the UVs of the model.

##### `getTextureIds()`

```ts
getTextureIds(): Uint32Array
```

Returns the texture ids used by each triangle.