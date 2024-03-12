export class Color {
    constructor(public red: number, public green: number, public blue: number, public alpha: number) {
    }

    static fromHex(hex: string): Color {
        const red = parseInt(hex.substring(1, 3), 16);
        const green = parseInt(hex.substring(3, 5), 16);
        const blue = parseInt(hex.substring(5, 7), 16);

        return new Color(red / 255, green / 255, blue / 255, 1);
    }

    static fromRGB(red: number, green: number, blue: number): Color {
        return new Color(red / 255, green / 255, blue / 255, 1);
    }

    static fromRGBA(red: number, green: number, blue: number, alpha: number): Color {
        return new Color(red / 255, green / 255, blue / 255, alpha);
    }

    static toHex(color: Color): string {
        const red = Math.round(color.red * 255).toString(16).padStart(2, "0");
        const green = Math.round(color.green * 255).toString(16).padStart(2, "0");
        const blue = Math.round(color.blue * 255).toString(16).padStart(2, "0");

        return `#${red}${green}${blue}`;
    }

    static toRGB(color: Color): string {
        const red = Math.round(color.red * 255);
        const green = Math.round(color.green * 255);
        const blue = Math.round(color.blue * 255);

        return `rgb(${red}, ${green}, ${blue})`;
    }

    static toRGBA(color: Color): string {
        const red = Math.round(color.red * 255);
        const green = Math.round(color.green * 255);
        const blue = Math.round(color.blue * 255);

        return `rgba(${red}, ${green}, ${blue}, ${color.alpha})`;
    }

    static toGPUColor(color: Color): GPUColor {
        return {
            r: color.red,
            g: color.green,
            b: color.blue,
            a: color.alpha
        };
    }

    static blend(color1: Color, color2: Color, factor: number): Color {
        const inverseFactor = 1 - factor;

        const red = color1.red * factor + color2.red * inverseFactor;
        const green = color1.green * factor + color2.green * inverseFactor;
        const blue = color1.blue * factor + color2.blue * inverseFactor;
        const alpha = color1.alpha * factor + color2.alpha * inverseFactor;

        return new Color(red, green, blue, alpha);
    }
}