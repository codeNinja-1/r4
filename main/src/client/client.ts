import { Renderer } from "../render/renderer.js";
import { Component } from "../view/component.js";
import { DOM } from "../view/dom.js";
import { World } from "../world/world.js";

export class Client extends Component {
    _element: HTMLDivElement;
    renderer: Renderer;
    world: World;

    constructor() {
        super();

        this.world = new World();
        (this.element);
    }

    init() {
        
    }

    render() {
        const client = DOM.element('div', 'cubecraft-client', 'cubecraft-layers', 'cubecraft-screen');

        const canvas = DOM.element('canvas', 'cubecraft-client-canvas') as HTMLCanvasElement;

        this.renderer = new Renderer(this.world, canvas);

        client.appendChild(canvas);

        return client;
    }
}