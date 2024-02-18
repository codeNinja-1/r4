export class InitDispatcher {
    private tasks: Set<InitTask>;

    constructor() {
        this.tasks = new Set();
    }

    schedule(name: string, timing: InitDispatcher.Timing, func: () => Promise<unknown>): void;
    schedule(name: string, timing: InitDispatcher.Timing): (f: () => Promise<unknown>, _context: any) => void;
    schedule(name: string, timing: InitDispatcher.Timing, func?: () => Promise<unknown>): void | ((f: () => Promise<unknown>, _context: any) => void) {
        if (func instanceof Function && typeof timing == 'number') {
            this.tasks.add(new InitTask(name, func, timing));
        } else if (typeof func == 'number') {
            return (f: () => Promise<unknown>, _context: any) => this.schedule(name, timing, f);
        } else {
            throw new Error("Invalid arguments");
        }
    }

    unschedule(func: () => Promise<unknown>) {
        for (const task of this.tasks) {
            if (task.func == func) {
                this.tasks.delete(task);

                break;
            }
        }
    }

    async run(): Promise<void> {
        let start = Date.now();
        let timings: InitTask[][] = [];

        for (const task of this.tasks) {
            timings[task.timing] = timings[task.timing] || [];

            timings[task.timing].push(task);
        }

        for (const timing of timings) {
            console.log("InitDispatcher: Beginning tasks of Timing." + timing[0].timing + " in parallel.");

            await new Promise<void>((resolve) => {
                let resolved = 0;

                for (const task of timing) {
                    task.func().then(() => {
                        resolved++;

                        if (resolved == timing.length) {
                            resolve();
                        }
                    });
                }
            });
        }

        let end = Date.now();

        console.log("Game started in " + (end - start) + "ms.");
    }
}

class InitTask {
    constructor(
        public name: string,
        public func: () => Promise<unknown>,
        public timing: InitDispatcher.Timing
    ) {}
}

export namespace InitDispatcher {
    export enum Timing {
        Cache = "Cache",
        Instantiate = "Instantiate",
        Register = "Register",
        Build = "Build"
    }
}