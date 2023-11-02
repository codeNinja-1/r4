import { Task } from '../task.js';
import { Parcel, createWorkerFarm } from '@parcel/core';
import parcelFs from '@parcel/fs';
const { MemoryFS } = parcelFs;

export class BundleTask extends Task<void> {
    constructor(private directory: string, private root: string) {
        super(`Bundle ${directory}`);
    }

    async execute(): Promise<void> {
        const workerFarm = createWorkerFarm();
        const memoryFs = new MemoryFS(workerFarm);
        const bundler = new Parcel({
            entries: this.directory,
            defaultConfig: '@parcel/config-default',
            mode: 'production',
            outputFS: memoryFs
        });

        try {
            let { bundleGraph } = await bundler.run();

            for (let bundle of bundleGraph.getBundles()) {
              console.log(bundle.filePath);
              console.log(await memoryFs.readFile(bundle.filePath, 'utf8'));
            }
        } finally {
            await workerFarm.end();
        }
    }
}