import chalk from "chalk";
import process from "node:process";

export abstract class Task<T> {
    private complete: boolean;

    constructor(protected message: string) {
    }

    public onError(error: Error) {
        console.log(chalk.redBright(this.message));
        console.log(chalk.red(error.stack));

        process.exit(1);
    }

    public onExit() {
        if (this.complete) return;

        console.log(chalk.yellowBright(this.message));
        console.log(chalk.yellow("Process exited before task was resolved"));
    }

    public onExpire() {
        if (this.complete) return;

        console.log(chalk.yellowBright(this.message));
        console.log(chalk.yellow("Another task began before this one completed"));
    }

    private resolve() {
        console.log(chalk.greenBright(this.message));

        this.complete = true;
    }

    private reject(message: string) {
        console.log(chalk.redBright(this.message));
        console.log(chalk.red(message));

        process.exit(1);
    }

    public _execute(): Promise<T> {
        return new Promise(resolve => {
            this.execute().then((result) => {
                this.resolve();

                resolve(result);
            }).catch((error) => {
                this.reject(error);
            });
        });
    }

    public abstract execute(): Promise<T>;
}