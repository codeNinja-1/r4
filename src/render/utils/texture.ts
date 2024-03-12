import { IndexedRegistryItem } from "../../game/registry/indexed-registry-item.js";
import { Registries } from "../../game/registry/registries.js";

export class Texture extends IndexedRegistryItem {
    private data: Uint8ClampedArray;
    private width: number;
    private height: number;

    private constructor(data: Uint8ClampedArray, width: number, height: number) {
        super();
        
        this.data = data;
        this.width = width;
        this.height = height;
    }

    getTextureWidth() {
        return this.width;
    }

    getTextureHeight() {
        return this.height;
    }

    toDataArray() {
        return this.data;
    }

    toImageData() {
        return new ImageData(this.data, this.width, this.height);
    }

    static fromImage(source: HTMLImageElement) {
        const canvas = new OffscreenCanvas(source.width, source.height);
        const context = canvas.getContext('2d')!;

        context.drawImage(source, 0, 0);

        const imageData = context.getImageData(0, 0, source.width, source.height);

        return Texture.fromImageData(imageData);
    }

    static fromImageData(imageData: ImageData) {
        return new Texture(imageData.data, imageData.width, imageData.height);
    }

    static fromDataArray(data: Uint8ClampedArray, width: number, height: number) {
        return new Texture(data, width, height);
    }

    static load(name: string): Promise<Texture> {
        const url = '/assets/textures/' + name.replace(/\./g, '/') + '.png';
        
        return new Promise((resolve, reject) => {
            const image = new Image();

            image.onload = () => {
                const texture = Texture.fromImage(image);

                Registries.textures.register(name, texture);

                resolve(texture);
            };

            image.onerror = () => {
                reject(new Error(`Failed to load image from ${url}`));
            };

            image.src = url;
        });
    }
}