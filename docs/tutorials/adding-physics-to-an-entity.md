# Adding Physics to an Entity

In this tutorial, we will add physics to the cube entity created in the [previous tutorial](./creating-an-entity.md). This will allow it to fall to the ground and collide with blocks.

## Physical Properties

To add physics to the cube entity, we will need to provide a `PhysicalEntityProperties` object. This object describes the physical properties of the entity. It contains the following properties:

  * `friction` - An object describing the friction of the entity. The values are multiplied with the entities velocity to slow it down (i.e. `0` is no friction and `1` is immobile).
    * `air` - The friction of the entity in the air.
    * `ground` - The friction of the entity when it's on the ground.
  * `gravity` - How much the entity is affected by gravity, in blocks/second squared.

We can create a plain object with these properties for our cube entity. This can be stored as a static property of our `CubeEntity` class because it is constant for all instances of the entity.

```ts
private physicalProperties: EntityPhysicalProperties = {
    friction: {
        air: 0.1,
        ground: 0.5
    },
    gravity: 9.8
};
```

We can also make it accessible to the physics system through a getter method in the `CubeEntity` class.

```ts
getPhysicalProperties(): EntityPhysicalProperties {
    return CubeEntity.physicalProperties;
}
```

### Physical model

To add physics to the cube entity, we will need to create a physical model for it, describing the shape of the entity in hitboxes. This is done by creating a `PhysicalModel` object.

A `PhysicalModel` can contain components, of which there are two:

 * `BoxPhysicalComponent` - A box-shaped hitbox, with a position and size.
 * `GroupPhysicalComponent` - A group of physical components, which can be used to create complex shapes.

We can create a `BoxPhysicalComponent` for our cube entity. This can be stored in the `model` property of the `EntityPhysicalProperties` object.

```ts
private physicalProperties: EntityPhysicalProperties = {
    friction: {
        air: 0.1,
        ground: 0.5
    },
    gravity: 9.8,
    model: new BoxPhysicalComponent({
        position: new ImmutableVector3D(0, 0, 0),
        size: new ImmutableVector3D(1, 1, 1)
    })
};
```

The position is relative to the entity's position, and all units are in blocks.

## Physical State

Each cube entity needs to know it's current physical state, which includes it's velocity. This can be stored as a property of the `CubeEntity` class.

```ts
private physicalState = new EntityPhysicalState();
```

This state can be modified by the physics system, and must be accessible through a getter method.

```ts
getPhysicalState(): EntityPhysicalState {
    return this.physicalState;
}
```

## Simulation with `EntityPhysics`

The `EntityPhysics` namespace contains methods for simulating entities. The `simulateEntity` method can be used to simulate the cube entity. This can be called in the entity's `tickEntity` method.

```ts
tickEntity(delta): void {
    EntityPhysics.simulateEntity(this, delta);
}
```

This will simulate the entity's physics, and update it's position and velocity every frame.

Yay, we did it! We have added physics to the cube entity, allowing it to fall to the ground and collide with blocks.