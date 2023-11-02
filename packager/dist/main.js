import $doaur$nodeprocess from "node:process";
import $doaur$path from "path";
import {createWorkerFarm as $doaur$createWorkerFarm, Parcel as $doaur$Parcel} from "@parcel/core";
import $doaur$parcelfs from "@parcel/fs";
import $doaur$chalk from "chalk";
import $doaur$fspromises from "fs/promises";


class $a6e90e1dc245dbbf$export$d0d38e7dec7a1a61 {
    currentTask = null;
    constructor(){
        (0, $doaur$nodeprocess).on("uncaughtException", (err)=>{
            this.currentTask?.onError(err);
        });
        (0, $doaur$nodeprocess).on("beforeExit", ()=>{
            this.currentTask?.onExit();
        });
    }
    execute(task) {
        if (this.currentTask) this.currentTask.onExpire();
        this.currentTask = task;
        return task._execute();
    }
}





class $be1695a6f1de46ff$export$2dea7024bcdd7731 {
    message;
    complete;
    constructor(message){
        this.message = message;
    }
    onError(error) {
        console.log((0, $doaur$chalk).redBright(this.message));
        console.log((0, $doaur$chalk).red(error.stack));
        (0, $doaur$nodeprocess).exit(1);
    }
    onExit() {
        if (this.complete) return;
        console.log((0, $doaur$chalk).yellowBright(this.message));
        console.log((0, $doaur$chalk).yellow("Process exited before task was resolved"));
    }
    onExpire() {
        if (this.complete) return;
        console.log((0, $doaur$chalk).yellowBright(this.message));
        console.log((0, $doaur$chalk).yellow("Another task began before this one completed"));
    }
    resolve() {
        console.log((0, $doaur$chalk).greenBright(this.message));
        this.complete = true;
    }
    reject(message) {
        console.log((0, $doaur$chalk).redBright(this.message));
        console.log((0, $doaur$chalk).red(message));
        (0, $doaur$nodeprocess).exit(1);
    }
    _execute() {
        return new Promise((resolve)=>{
            this.execute().then((result)=>{
                this.resolve();
                resolve(result);
            }).catch((error)=>{
                this.reject(error);
            });
        });
    }
}




const { MemoryFS: $2201342dd3f9f2be$var$MemoryFS } = (0, $doaur$parcelfs);
class $2201342dd3f9f2be$export$b8beb47de4ca9a99 extends (0, $be1695a6f1de46ff$export$2dea7024bcdd7731) {
    directory;
    root;
    constructor(directory, root){
        super(`Bundle ${directory}`);
        this.directory = directory;
        this.root = root;
    }
    async execute() {
        const workerFarm = (0, $doaur$createWorkerFarm)();
        const memoryFs = new $2201342dd3f9f2be$var$MemoryFS(workerFarm);
        const bundler = new (0, $doaur$Parcel)({
            entries: this.directory,
            defaultConfig: "@parcel/config-default",
            mode: "production",
            outputFS: memoryFs
        });
        try {
            let { bundleGraph: bundleGraph } = await bundler.run();
            for (let bundle of bundleGraph.getBundles()){
                console.log(bundle.filePath);
                console.log(await memoryFs.readFile(bundle.filePath, "utf8"));
            }
        } finally{
            await workerFarm.end();
        }
    }
}




class $830077778dc4673b$export$8928e6af40bd5c16 extends (0, $be1695a6f1de46ff$export$2dea7024bcdd7731) {
    directory;
    constructor(directory){
        super(`List ${directory}`);
        this.directory = directory;
    }
    async execute() {
        let files;
        try {
            files = await (0, $doaur$fspromises).readdir(this.directory);
        } catch (err) {
            throw new Error("Failed to read directory: ", err.stack);
        }
        return files;
    }
}


class $dbe61589b2b8f631$export$c966ad745d3fb05e {
    source;
    target;
    manager;
    constructor(source, target){
        this.source = source;
        this.target = target;
        this.manager = new (0, $a6e90e1dc245dbbf$export$d0d38e7dec7a1a61)();
    }
    async bundle() {
        let startTime = Date.now();
        await this.manager.execute(new (0, $2201342dd3f9f2be$export$b8beb47de4ca9a99)((0, $doaur$path).join(this.source, "main"), "@main"));
        const packages = await this.manager.execute(new (0, $830077778dc4673b$export$8928e6af40bd5c16)((0, $doaur$path).join(this.source, "package")));
        for (const name of packages)await this.manager.execute(new (0, $2201342dd3f9f2be$export$b8beb47de4ca9a99)((0, $doaur$path).join(this.source, "package", name), "@package/" + name));
        console.log(Date.now() - startTime);
    }
}



const $b013a5dd6d18443e$var$packager = new (0, $dbe61589b2b8f631$export$c966ad745d3fb05e)((0, $doaur$nodeprocess).cwd(), (0, $doaur$nodeprocess).cwd() + "/packager/dist");
$b013a5dd6d18443e$var$packager.bundle();


//# sourceMappingURL=main.js.map
