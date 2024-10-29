struct Camera {
    matrix: mat4x4f
}

@group(0) @binding(0) var<uniform> camera: Camera;
@group(1) @binding(0) var<storage, read> blockGeometry: array<vec3f>;
@group(1) @binding(1) var<storage, read> blockTexcoords: array<vec2f>;
@group(1) @binding(2) var blockTexture: texture_2d<f32>;
@group(1) @binding(3) var blockTextureSampler: sampler;
@group(1) @binding(4) var<uniform> chunkPosition: vec2f;
/* @group(2) @binding(5) var<uniform> depthBufferFac: f32; */

struct VertexOut {
    @builtin(position) position: vec4f,
    @location(0) texcoord: vec2f,
    @location(1) fog: f32
}

@vertex fn vertex_main(@builtin(instance_index) instanceIndex: u32, @builtin(vertex_index) vertexIndex: u32) -> VertexOut {
    var x = f32(instanceIndex & 15);
    var y = f32(instanceIndex >> 8);
    var z = f32((instanceIndex >> 4) & 15);

    var vertex: VertexOut;

    vertex.texcoord = blockTexcoords[vertexIndex];
    vertex.position = camera.matrix * vec4f(vec3(x + chunkPosition.x * 16, y, z + chunkPosition.y * 16) + blockGeometry[vertexIndex], 1.0);
    vertex.fog = max(0, 1.0 - (vertex.position.z / 96.0));

    return vertex;
}

@fragment fn fragment_main(@location(0) texcoord : vec2f, @location(1) fog: f32) -> @location(0) vec4f {
    let sample = textureSample(blockTexture, blockTextureSampler, texcoord);
    let avg = (sample.r + sample.g + sample.b) / 3.0;
    let depthBufferFac = 0.1;

    return (vec4f(1.0, 0.0, 0.0, 1.0) * abs(fog - 0.0) * 0.5 +
            vec4f(0.0, 1.0, 0.0, 1.0) * abs(fog - 0.5) * 0.5 +
            vec4f(0.0, 0.0, 1.0, 1.0) * abs(fog - 1.0) * 0.5) * depthBufferFac +
           vec4f(avg, avg, avg, 1.0) * (1 - depthBufferFac);
}