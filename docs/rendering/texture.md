# `Texture` class

The `Texture` class is used to represent a texture that can be used in rendering.

> The `Texture` class extends `IndexedRegistryItem`, allowing it to have an index when registered in `Registries.textures`.

## Methods

### `getTextureWidth()`

```ts
getTextureWidth(): number
```

Gets the width of the texture.

### `getTextureHeight()`

```ts
getTextureHeight(): number
```

Gets the height of the texture.

### `toDataArray()`

```ts
toDataArray(): Uint8ClampedArray
```

Gets the data of the texture as a `Uint8ClampedArray`.

### `toImageData()`

```ts
toImageData(): ImageData
```

Gets the data of the texture as an `ImageData`.

## Static Methods

### `fromImage()`

```ts
fromImage(image: HTMLImageElement): Texture
```

Creates a new texture from an image.

### `fromImageData()`

```ts
fromImageData(imageData: ImageData): Texture
```

Creates a new texture from an `ImageData`.

### `fromDataArray()`

```ts
fromDataArray(data: Uint8ClampedArray, width: number, height: number): Texture
```

Creates a new texture from a `Uint8ClampedArray`.

### `load()`

```ts
load(location: string): Promise<Texture>
```

Loads a texture from a *recourse location*. The location is in the format:

```ts
folder.file
```

This is converted to a path in the form of:

```ts
assets/textures/folder/file.png
```

The texture is then registered in the `Registries.textures` registry, using the *recourse location* as a key.