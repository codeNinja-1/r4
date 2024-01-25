import { readParallel } from "./read-parallel.js";
import fs from "fs/promises";

function buildExport(file) {
    if (file.endsWith('.ts')) {
        return `export * from './${file.slice(0, -3)}.js';`;
    } else {
        return `export * from './${file}';`;
    }
}

function buildIndex(dir, extension) {
    return readParallel(dir).then((files) => {
        let output = `// Generated file using util/build-index.js\n`;
        
        for (const file of files) {
            if (file.endsWith(`.${extension}`) && file != `index.${extension}`) {
                output += `${buildExport(file)}\n`;
            }
        }

        return fs.writeFile(`${dir}/index.${extension}`, output);
    });
}

buildIndex('src', 'ts');