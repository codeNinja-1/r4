import { EventClock } from "./event-clock.js";

export class EventClockViewer {
    private enabled: boolean = false;
    private element: HTMLDivElement;

    constructor(private clock: EventClock) {
        document.addEventListener('keypress', event => {
            if (event.code == 'KeyT' && event.altKey) {
                this.enabled = !this.enabled;

                if (this.enabled) {
                    document.body.appendChild(this.element);
                } else {
                    document.body.removeChild(this.element);
                }
            }
        });

        this.element = document.createElement('div');
        this.element.style.position = "fixed";
        this.element.style.top = "5px";
        this.element.style.left = "5px";
        this.element.style.color = "white";
        this.element.style.fontFamily = "monospace";
        this.element.style.background = "#00000088";
        this.element.style.padding = "5px";
        this.element.style.borderRadius = "5px";
    }

    update(): void {
        if (!this.enabled) return;

        const taskInfo = this.clock.getTaskInfo();

        if (taskInfo == null) return;

        let text: string[] = [];

        for (const task of taskInfo.tasks) {
            text.push( `${task.name} - ${task.time}ms`);
        }

        this.element.innerText = text.join('\n');
    }
}