# Models

There are three common types of models, static  models (for most blocks), dynamic models (for some block and all entities), and item models.

```ts
class Model3D {
}
```

```ts
class BlockModel extends Model3D {
    root: RootModelComponent;
}
```

```ts
class RootModelComponent extends ModelComponent {
    model: Model3D;
}
```

## StaticMesh

```ts
class StaticMesh {
    geometry: Float16Array;
    mapping: Uint8Array;
    texture: TextureData;
}
```



```ts
interface Renderable3D {
    draw(transform: Matrix4D, context: GPUContext);
    drawInstances(data: InstanceData, content: GPUContext);
}
```

## Model Components

Each model consists of a few components. In a static model, each component has a position stored as a `Vector3D`, whereas a dynamic model has individual `Matrix4` transforms per component. This allows for rotations.

```ts
class ModelComponent {
    parent: ModelComponent;
    children: Set<ModelComponent>;
    transform: Vector3D | Matrix4;

    buildStaticMesh(): StaticMesh;
}
```

### Empty

The `EmptyModelComponent` class makes an empty object that generates no geometry.

```ts
class EmptyModelComponent extends ModelComponent {
}
```

### Cube

The `CubeModelComponent` class makes a cube with a width, height and depth. It uses six `RectTexture`s.

```ts
class CubeModelComponent extends ModelComponent {
    size: Vector3D;
    textures: {
        top: RectTexture,
        north: RectTexture,
        east: RectTexture,
        south: RectTexture,
        west: RectTexture,
        bottom: RectTexture
    }
}
```

### Plane

The `PlaneModelComponent` class makes a plane with a width, height, and orientation. It uses two `RectTexture`s.

```ts
class PlaneModelComponent extends ModelComponent {
    size: Vector2D;
    orientation: {
        base: "top" | "north" | "east" | "south" | "west" | "bottom",
        tilt: "x+" | "x-" | "y+" | "y-"
    },
    textures: {
        front: RectTexture,
        back: RectTexture
    }
}
```

## Textures

Textures are various formats for storing the images visible on the faces of model components.

All textures are subclasses or implement the abstract `Texture` class.

```ts
interface Texture {
    data: TextureData;
}
```

All textures that can be rendered on a model implement the `ModelTexture` interface.

```ts
interface ModelTexture {
    uv: Uint16Array;
}
```

Texture data contains raw data, a width and height, and a few methods for manipulating the texture data.

```ts
class TextureData {
    constructor(image: Image);
    constructor(data: ImageData);
    constructor();

    size: Vector2D;
    data: ArrayBuffer;
}
```

### Raw Textures

```ts
class RawTexture implements Texture {
    constructor(data: TextureData);
}
```

### Rectangle Textures

`RectTexture`s are rectangular or quadrilateral sections of an image that can be drawn onto rectangular shapes.

```ts
class RectTexture implements Texture, ModelTexture {
    constructor(
        source: Texture,
        uv: [
            Vector2D,
                      Vector2D
        ] | [
            Vector2D, Vector2D,
            Vector2D, Vector2D
        ]
    );
}
```

## Transfer Format

Models are transfered to the vertex shader in the format of a bunch of rectangles, along with uvs in a combined texture.

### Model Processing

This explains the way models are processed to make them efficient to render.