export class EventClock {
    private tasks: Set<() => unknown> = new Set();
    private delta: number = 0;
    private time: number = 0;

    constructor() {
    }

    runOnce(task: () => unknown) {
        const wrapper = () => {
            task();

            this.unschedule(wrapper);
        };

        this.schedule(wrapper);
    }

    schedule(task: () => unknown) {
        this.tasks.add(task);
    }

    unschedule(task: () => unknown) {
        this.tasks.delete(task);
    }

    getDelta() {
        return this.delta;
    }

    getCurrentTime() {
        return this.time;
    }

    async start() {
        let start = Date.now();

        for (const task of this.tasks) {
            await task();
        }

        this.delta = Date.now() - start;

        this.time++;
    }
}