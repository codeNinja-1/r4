export namespace DOM {
    export function element(tag: string, ...classes: string[]): HTMLElement {
        let element = document.createElement(tag);
        element.classList.add(...classes);

        return element;
    }

    export function text(data: string): Text {
        return document.createTextNode(data);
    }
}