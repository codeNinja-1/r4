# Adding Behaviors to an Entity

In this tutorial, we will add behaviors to the cube entity created in the [Creating an Entity](./creating-an-entity.md) tutorial. This will allow it to interact with the world and other entities, or pathfind to targets.

## Creating a Behavior Model

To add behaviors to the cube entity, we will need to provide a `BehaviorModel` object. It decides what the entity should do each tick, based on the `EntityBehavior` objects we initialize it with.

We can create a `BehaviorModel` object for our cube entity. This can be stored as a static property of our `CubeEntity` class because it is constant for all instances of the entity.

```ts
private behaviorModel: BehaviorModel = new BehaviorModel(new DoNothingBehavior());
```

When creating the `BehaviorModel`, we need to pass it a `Behavior` object. This object chooses what the entity should do, but cannot store any state. We're using the `DoNothingBehavior` for our cube entity for now, but let's make it more complicated by replacing it with a `ConditionBehavior`.

```ts
new ConditionBehavior(
    new RandomCondition(
        0.5, // chance of being true
        10 // frequency of change (seconds)
    ),
    new RandomMovementBehavior(
        1.0, // walking speed of entity (blocks/second)
        0.5 // turning speed of entity (radians/second)
    ),
    new DoNothingBehavior()
)
```

The `ConditionBehavior` takes a `EntityBehaviorCondition` object and two behaviors. If the condition is true, the first behavior is used, otherwise the second behavior is used. In this case, the `RandomCondition` has a 50% chance of being true, and if it is, the `RandomMovementBehavior` is used, otherwise the `DoNothingBehavior` is used.

### Behavior Conditions

A `EntityBehaviorCondition` object is a condition that can be used in a `ConditionBehavior`. It has a `value()` method that returns `true` if the condition is met, and `false` if it is not.

Some examples of conditions are:
  * `RandomCondition` - A condition that is true with a certain chance, and changes at a certain frequency.
  * `SeesEntityCondition` - A condition that is true if the entity can see another entity that passes a specific check.
  * `HasPathCondition` - A condition that is true if the entity has a path to a specific target.

### Behavior Objects

A `EntityBehavior` object is an object that can be used in a `BehaviorModel`. It has a `tick()` method that is called each tick, and can modify the entity's state.