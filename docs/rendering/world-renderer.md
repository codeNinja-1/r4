# `WorldRenderer` interface

Rendering the world is done using an abstraction that allows for the use of different rendering APIs. Each *renderer implementation* must have a class which implements the `WorldRenderer` interface.

The `WorldRenderer` interface requires a `render()` method which should render the world onto the canvas. It can contain references to the following objects:

 * `Renderer` - The renderer that contains this world renderer.
 * `Perspective` - The perspective that the world is being rendered from, which is usually from the eyes of an entity.
 * `Projector` - The projector that is being used to project the world onto the canvas. This object contains the near, far, field of view, and aspect ratio.
 * `World` - The world that is being rendered.

### Methods

#### `getRenderer()`

```ts
getRenderer(): Renderer
```

Gets the `Renderer` object that contains this world renderer instance.

#### `getCanvas()`

```ts
getCanvas(): HTMLCanvasElement
```

Gets the canvas that this world renderer renders to.

#### `getPerspective()`

```ts
getPerspective(): Perspective
```

Gets the perspective that this world renderer is rendering from.

#### `setPerspective(perspective)`

```ts
setPerspective(perspective: Perspective): void
```

Sets the perspective that this world renderer is rendering from.

#### `getProjector()`

```ts
getProjector(): Projector
```

Gets the projector that this world renderer is using.

#### `setProjector(projector)`

```ts
setProjector(projector: Projector): void
```

Sets the projector that this world renderer is using. Preferably, the `Projector` object should be modified instead of replaced.

#### `getWorld()`

```ts
getWorld(): World
```

Gets the world that this world renderer is rendering.

#### `setWorld(world)`

```ts
setWorld(world: World): void
```

Sets the world that this world renderer is rendering. This cannot be called more than once.

#### `setupWorldRenderer()`

```ts
setupWorldRenderer(): Promise<void>
```

Sets up the world renderer. This should be called before rendering the world.

#### `render()`

```ts
render(): void
```

Renders the world.