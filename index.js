import { readdir, stat } from 'fs/promises';
import nodePath from 'path';
import nodeProcess from 'node:process';

const path = nodeProcess.argv[2];
const toMatch = [
    'bin', // .Net
    'obj', // .Net
    'packages',  // Nuget
    'node_modules', // npm
    'bower_components', // bower
    '.venv', //python venv
    'venv', //python venv
    'registry.terraform.io', // terraform providers
    '.next', //nextjs build output
    '.sst', // sst build output
    'cdk.out', // cdk build output
    '.parcel-cache', // parcel build output
    '.vs', // visual studio temp files
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