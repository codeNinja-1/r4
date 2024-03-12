export class WebGPUShaderVisibility {
    constructor(private visibleInVertex: boolean, private visibleInFragment: boolean) {
    }

    isVertex(): boolean {
        return this.visibleInVertex;
    }

    isFragment(): boolean {
        return this.visibleInFragment;
    }

    getBitwise(): number {
        return (this.visibleInVertex ? GPUShaderStage.VERTEX : 0) | (this.visibleInFragment ? GPUShaderStage.FRAGMENT : 0);
    }
}