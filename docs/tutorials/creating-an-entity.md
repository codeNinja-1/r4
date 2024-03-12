# Creating an Entity

In this tutorial, we will create a simple entity that is drawn as a cube.

Every entity needs two classes, one that implements `EntityPrototype` and one that implements `Entity`. The prototype is used to create new entities, and an `Entity` instance is created for each entity. The `EntityPrototype` is basically a factory for creating new entities.

## Creating the Prototype

To create an entity prototype, we can extend the `BaseEntityPrototype` class.

```ts
class CubeEntityPrototype extends BaseEntityPrototype {
}
```

An entity prototype describes how to create an entity using the `createEntity` method. This method should return a new instance of our entity class.

```ts
createEntity(): CubeEntity {
    return new CubeEntity();
}
```

You may have noticed that `BaseEntityPrototype` requires a generic type. This type is the entity class that the prototype creates. In this case, we can call it `CubeEntity`.

```ts
class CubeEntityPrototype extends BaseEntityPrototype<CubeEntity> {
    ...
}
```

Next, let's move on to creating the entity class.

## Creating the Entity

Now that we have the prototype, we can create the entity class. This class should extend the `BaseEntity` class.

```ts
class CubeEntity extends BaseEntity {
}
```

Classes extending the abstract `BaseEntity` require two methods that describe how the entity interacts with the world.

 * `getPrototype()` - This method should return the prototype that created the entity.
 * `canLoadChunks()` - This method should return `true` if the entity can load chunks, and `false` if it cannot.

We need to make sure that the `getPrototype` method returns the `CubeEntityPrototype` that we created earlier. This lets the game know what kind of entity this is.

```ts
getPrototype(): CubeEntityPrototype {
    return Registries.entities.get('cube');
}
```

The `canLoadChunks` method can return `true` for now. This makes it simpler for testing because we don't need to worry about chunk loading, but it should usually be set to `false` if the entity isn't a player.

```ts
canLoadChunks(): boolean {
    return true;
}
```

This entity can now be placed into the world, but it's otherwise useless. Let's next make a model for it so it can be rendered.

### Adding a Render Model

To add a render model to the entity, we can override the `getDynamicModel` method. This method should return a `DynamicModel` object that describes how the entity should be rendered.

```ts
getDynamicModel(): DynamicModel {
    return this.model;
}
```

Instead of directly returning a model, it can be useful to store the model as a property of the entity. This way, the model can be modified at runtime.

```ts
private model: DynamicModel;
```

For a simple cube-like model, we can use a `CubeModelComponent`. We can add this in the `whenJoinWorld` function, which runs whenever the entity has joined a world.

```ts
whenJoinWorld(): void {
    this.model = new DynamicModel();

    const texture = /* ... */;
    
    const cube = new CubeModelComponent(
        1, 1, 1,
        new Array(6).fill(texture)
    );
    this.model.addComponent(cube);
}
```

The `CubeModelComponent` constructor takes the width, height, and depth of the cube. The cube's bottom left front corner is at `(0, 0, 0)`, and the top right back corner is at `(1, 1, 1)`. All sides of the cube have the texture contained in the `texture` variable. Let's load a texture next.

### Loading a Texture

To load a texture, we can use the `Texture.load` method. This method takes a resource location and returns a promise that resolves to a `Texture` object. We can put this in the `CubeEntityPrototype`'s asynchronous `setup()` method.

```ts
async setup() {
    this.texture = await Texture.load('entity.cube');
}
```

The identifier `entity.cube` is a *resource location*. It designates the key that the texture should be stored in the `Registries.textures` registry.

It also indicates that the texture should be loaded from `assets/textures/entity/cube.png`. That's where you can place an image file to use as a texture.

We can store this texture in a property of the prototype.

```ts
private texture: Texture;
```

We can then use this texture in the `CubeEntity` class.

```ts
const texture = Registries.textures.get('entity.cube');
```

## Registering the Entity Prototype

To register the entity prototype, we can use the `Registries.entities` registry. This is required before the entity can be used in the world.

```ts
Registries.entities.register('cube', new CubeEntityPrototype());
```

This line should be added to `content.ts` for now, but a better system is in the works.

## Making an Instance of the Entity

Now that the entity is registered, it can be used in the world. To create an instance of the entity, we can use the `createEntity` method of the `EntityPrototype`.

```ts
const entity = Registries.entities.createEntity('cube');
```

This will create a new instance of the `CubeEntity` class. We can then add it to the world.

```ts
world.addEntity(entity);
```

This should create a cube entity at `(0, 0, 0)` in the world, which will be underground. To move the entity onto the surface, we can use the `setPosition` method.

```ts
entity.setPosition(0, 20, 0);
```

There we go! We have created a simple cube entity, floating at `(0, 20, 0)` in the world. This is the basic process for creating an entity in the game.

But what if we want a creature? Let's move on to more advanced topics, such as adding physics and behaviors to the entity, as well as animating the model.

**Next Tutorial:** [Adding Physics to an Entity](./adding-physics-to-an-entity.md)