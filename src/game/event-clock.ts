export class EventClock {
    private tasks: Set<{ name: string, handler: () => unknown }> = new Set();
    private delta: number = 0;
    private tick: number = 0;
    private startTime: number | null = null;
    private lastTime: number | null = null;
    private taskInfo: EventClock.TaskInfo | null = null;

    constructor() {
    }

    runOnce(name: string, task: () => unknown) {
        const wrapper = () => {
            task();

            this.unschedule(wrapper);
        };

        this.schedule(name, wrapper);
    }

    schedule(name: string, task: () => unknown) {
        this.tasks.add({
            name,
            handler: task
        });
    }

    unschedule(identifier: string | (() => unknown)) {
        for (const task of this.tasks) {
            if (task.handler === identifier || task.name === identifier) {
                this.tasks.delete(task);
            }
        }
    }

    getDelta() {
        return this.delta / 1000;
    }

    getTime() {
        if (this.startTime === null) throw new Error("Clock not started");

        return Date.now() - this.startTime;
    }

    getTick() {
        return this.tick;
    }

    getTaskInfo(): EventClock.TaskInfo | null {
        return this.taskInfo!;
    }

    async start() {
        if (this.lastTime === null) {
            this.lastTime = Date.now();
            this.startTime = Date.now();
        }

        const frameDelay = Date.now() - this.lastTime;
        const tasks: { name: string, time: number }[] = [];

        for (const task of this.tasks) {
            let start = Date.now();

            await task.handler();

            tasks.push({
                name: task.name,
                time: Date.now() - start
            });
        }

        this.delta = Date.now() - this.lastTime;
        this.lastTime = Date.now();

        tasks.unshift({
            name: "frameDelay",
            time: frameDelay
        });
            
        this.taskInfo = {
            tasks,
            delta: this.delta,
            tick: this.tick,
            time: this.getTime()
        };

        this.tick++;

        requestAnimationFrame(() => this.start());
    }
}

export namespace EventClock {
    export type TaskInfo = {
        tasks: { name: string, time: number }[],
        delta: number,
        tick: number,
        time: number
    };
}