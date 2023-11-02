import { Manager } from "./manager.js";
import path from "path";
import { BundleTask } from "./task/bundle-task.js";
import { ListTask } from "./task/list-task.js";

export class Packager {
    private manager: Manager = new Manager();
    constructor(private source: string, private target: string) {
    }

    async bundle() {
        let startTime = Date.now();

        await this.manager.execute(new BundleTask(path.join(this.source, "main"), "@main"));

        const packages = await this.manager.execute(new ListTask(path.join(this.source, "package")));

        for (const name of packages) {
            await this.manager.execute(new BundleTask(path.join(this.source, "package", name), "@package/" + name));
        }

        console.log(Date.now() - startTime);
    }
}