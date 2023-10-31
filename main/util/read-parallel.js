import fs from 'fs/promises';

export function readParallel(base) {
    return new Promise((res, rej) => {
        let output = new Set();
        let batch = new Set([ base ]);

        let runBatch = () => {
            let nextBatch = new Set();

            let done = () => {
                unresolved--;

                if (unresolved == 0) {
                    batch = nextBatch;

                    if (batch.size > 0) {
                        runBatch();
                    } else {
                        res(output);
                    }
                }
            };

            let unresolved = batch.size;

            for (const path of batch) {
                fs.readdir(path, { withFileTypes: true}).then((files) => {
                    for (const file of files) {
                        if (file.isDirectory()) {
                            nextBatch.add(`${path}/${file.name}`);
                        } else {
                            output.add(`${path}/${file.name}`.slice(base.length + 1));
                        }
                    }

                    done();
                });
            }
        };

        runBatch();
    });
}