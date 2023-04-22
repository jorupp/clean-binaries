import { readdir, stat } from 'fs/promises';
import nodePath from 'path';
import process from 'node:process';

const path = process.argv[2];
const toMatch = [
    'bin', // .Net
    'obj', // .Net
    'packages',  // Nuget
    'node_modules', // npm
    'bower_components', // bower
    '.venv', //python venv
]

async function process(path) {
    const children = await readdir(path, { withFileTypes: true });
    for(const i of children) {
        if (!i.isDirectory()) continue;
        const child = nodePath.join(path, i.name);
        if (toMatch.includes(i.name)) {
            console.log(child);
        } else {
            process(child);
        }
    }
}

await process(path);