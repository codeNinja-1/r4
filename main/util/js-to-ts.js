import fs from "node:fs/promises";
import { readParallel } from "./read-parallel.js";

const files = await readParallel('src');

for (const file of files) {
    if (file.endsWith('.js')) {
        console.log('src/' + file, '->', 'src/' + file.slice(0, -3) + '.ts');
        fs.rename('src/' + file, 'src/' + file.slice(0, -3) + '.lts');
    }
}