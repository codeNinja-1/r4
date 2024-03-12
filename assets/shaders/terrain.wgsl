struct Camera {
    view: mat4x4f,
    projection: mat4x4f
}

@group(0) @binding(0) var<uniform> camera: Camera;
@group(1) @binding(0) var<storage> blockGeometry: array<vec3f>;
@group(1) @binding(1) var<storage> blockTexcoords: array<vec2f>;
@group(1) @binding(2) var blockTexture: texture_2d<f32>;
@group(1) @binding(3) var blockTextureSampler: sampler;

struct VertexOut {
    @builtin(position) position: vec4f,
    @location(0) texcoord: vec2f
}

@vertex fn vertex_main(
    @builtin(instance_index) instanceIndex: u32,
    @builtin(vertex_index) vertexIndex: u32
) -> VertexOut {
    var x = f32(instanceIndex & 15);
    var y = f32(instanceIndex >> 8);
    var z = f32((instanceIndex >> 4) & 15);

    var vertex: VertexOut;

    vertex.texcoord = blockTexcoords[vertexIndex];
    vertex.position = camera.projection * camera.view * vec4f(vec3(x, y, z) + blockGeometry[vertexIndex], 1.0);

    return vertex;
}

@fragment fn fragment_main(
    @location(0) texcoord : vec2f
) -> @location(0) vec4f {
    return textureSample(blockTexture, blockTextureSampler, texcoord);
}