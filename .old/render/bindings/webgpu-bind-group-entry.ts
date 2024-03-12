export interface WebGPUBindGroupEntry {
    getLayoutEntry(): GPUBindGroupLayoutEntry;
    getBindGroupEntry(): GPUBindGroupEntry;
}