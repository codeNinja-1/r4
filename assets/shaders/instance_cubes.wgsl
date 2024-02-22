struct Uniforms {
    position: vec2u,
    matrix: mat4x4f
}

@group(0) @binding(0) var<uniform> uniforms: Uniforms;

struct VertexOut {
    @builtin(position) position: vec4f;
    color: vec4f;
}

@vertex fn vertexShader(
    @location(0) blockIndex: u32,
    @location(1) blockId: u32,
    @location(2) vertexIndex: u32
) -> VertexOut {
    let x = blockIndex & 0b1111;
    let y = blockIndex >> 8;
    let z = blockIndex >> 4 & 0b1111;

    let vertex: VertexOut;

    

    vertex.position = vec4f(geometry[vertexIndex], 0.0, 1.0);

    return vertex;
}
@fragment fn fragment() -> @location(0) vec4f {
    return ourStruct.color;
}