# Rendering Abstraction

Rendering the world is done using an abstraction that allows for the use of different rendering APIs. Each *Rendering Implementation* must have a class which implements the `WorldRenderer` interface.

The `Texture` class is used to represent a texture that can be used in rendering. It is essentially the same as an `ImageData` object, but has a few extra methods for loading textures from `<image>` elements and from a url.

For instancing, the `InstancedData` and `InstancedDataSegment` classes can be used and/or extended. These store a list of draw calls for instancing, which can be updated when the world changes.