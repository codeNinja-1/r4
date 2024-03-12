# WebGPU Rendering

## Things to be done
### Setup
 * `GraphicsDevice`:
    * Get an adapter
    * Get a device
    * Get a context and configure it with the preferred canvas format
 * `TerrainRenderPass`:
    * Using `BindGroupManager`:
        * Create GPUBuffers using `device.createBuffer` often with `mappedAtCreation` set to `true`.
        * Set the contents of the buffers and unmap them.
    * Using `ShaderModule`:
        * Create a shader module.
    * Using `PipelineManager`:
        * Create a pipeline descriptor and render pipeline instance.
    * Using `BindGroupManager`:
        * Create bind group layouts and bind groups.
    * Define the indirect draw buffer.
 * `BindGroupManager`:
    * Create bind group layouts and bind groups for use between render passes.
### Prerendering
 * `TerrainRenderPass`:
    * Using `BindGroupManager`:
        * Map, write, then unmap some of the buffers.
    * Update the indirect draw buffer.
### Rendering
 * `Renderer`:
    * Create a command encoder.
    * Create a render pass encoder with a clear operation to clear the canvas texture.
 * `TerrainRenderPass`:
    * Using `PipelineManager`:
        * Set the render pipeline.
    * Using `BindGroupManager`:
        * Bind the bind groups to indicies.
    * Create a render pass encoder.
    * Draw the geometry using indirect drawing.
    * End the render pass.
 * `Renderer`:
    * Submit the command encoder to the queue.
### Other
 * Rendering is done using [`RenderPassEncoder.drawIndirect()`](https://developer.mozilla.org/en-US/docs/Web/API/GPURenderPassEncoder/drawIndirect), passing in the instances to draw and their indexes in the model geometry.
### Bing Groups
 * Only full bind groups can be swapped out, so we need to seperate different types of data into different bind groups.
    * **Camera Bind Group**: Contains the view and projection matrices. Used by `TerrainRenderPass`, `EntityRenderPass`, and `ParticleRenderPass`.
    * **Block Model Bind Group**: Contains the model data (geomtry, textures, uvs). Used by `TerrainRenderPass`.
### Drawing Blocks
 * The blocks are drawn using indirect drawing, with series of blocks in a single draw call.