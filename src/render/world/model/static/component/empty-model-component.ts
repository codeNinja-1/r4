import { ModelComponent } from "../model-component.js";

export class EmptyModelComponent implements ModelComponent {
    getVertexPositions(): Float32Array {
        return new Float32Array();
    }

    getTextureMappings(): Float32Array {
        return new Float32Array();
    }
    
    getTextureIds(): Uint32Array {
        return new Uint32Array();
    }
}