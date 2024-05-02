export interface ModelComponent {
    getVertexPositions(): Float32Array;
    getTextureMappings(): Float32Array;
    getTextureIds(): Uint32Array;
}