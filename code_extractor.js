#!/usr/bin/env node

/**
 * Script Name: code_extractor.js
 *
 * Description:
 * This script recursively reads TypeScript (.ts, .tsx) files from specified directories,
 * optionally excluding certain folders within those directories, and writes their content
 * into an output file in a 'codetxt' folder.
 *
 * Usage:
 *     node code_extractor.js [include_dirs...] [-exclude folder_to_exclude ...]
 *
 * Arguments:
 *     include_dirs         List of directories to include (relative to the script location).
 *     -exclude folder      Specify folders to exclude within the included directories.
 *
 * Example:
 *     node code_extractor.js src/app src/lib -exclude components -exclude types
 *
 *     This command will process 'src/app' and 'src/lib' directories, excluding any folders
 *     named 'components' or 'types' within those directories.
 *
 * Output:
 *     The script generates an output file in the 'codetxt' folder, named based on the included 
 *     directories and excluded folders. For example, the above command might generate:
 *     'codetxt/code_from_src_app_src_lib_without_components_types.txt'.
 */

const fs = require('fs');
const path = require('path');

function shouldIncludeFile(filePath, excludeFolders, baseDir) {
    const includeExtensions = ['.ts', '.tsx'];
    const relativePath = path.relative(baseDir, filePath);
    const shouldExclude = excludeFolders.some(folder => relativePath.startsWith(folder + path.sep));
    return includeExtensions.includes(path.extname(filePath).toLowerCase()) && !shouldExclude;
}

function readFilesRecursively(dir, excludeFolders, outputStream, baseDir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        const relativePath = path.relative(baseDir, filePath);
        const isExcluded = excludeFolders.some(folder => relativePath === folder || relativePath.startsWith(folder + path.sep));

        if (stat.isDirectory()) {
            if (!isExcluded) {
                readFilesRecursively(filePath, excludeFolders, outputStream, baseDir);
            }
        } else if (shouldIncludeFile(filePath, excludeFolders, baseDir)) {
            outputStream.write(`\n--- File: ${relativePath} ---\n\n`);
            const content = fs.readFileSync(filePath, 'utf8');
            outputStream.write(content + '\n');
        }
    });
}

// Get the list of directories to include and folders to exclude from command-line arguments
const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('Please specify the directories to include.');
    console.log('Usage: node script.js [include_dirs...] [-exclude folder_to_exclude ...]');
    process.exit(1);
}

let includeDirs = [];
let excludeFolders = [];

// Parse arguments
let i = 0;
while (i < args.length) {
    if (args[i] === '-exclude' && i + 1 < args.length) {
        excludeFolders.push(args[i + 1]);
        i += 2;
    } else {
        includeDirs.push(args[i]);
        i++;
    }
}

// Create 'codetxt' folder if it doesn't exist
const outputFolder = path.join(__dirname, 'codetxt');
if (!fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
}

// Generate output file name
let outputFileName = 'code_from_';
outputFileName += includeDirs.map(dir => dir.replace(/[\\/]/g, '_')).join('_');
if (excludeFolders.length > 0) {
    outputFileName += `_without_${excludeFolders.join('_')}`;
}
outputFileName += '.txt';

const fullOutputPath = path.join(outputFolder, outputFileName);

// Delete the old file if it exists
if (fs.existsSync(fullOutputPath)) {
    fs.unlinkSync(fullOutputPath);
}

const outputStream = fs.createWriteStream(fullOutputPath);

includeDirs.forEach(dir => {
    const absoluteDir = path.join(__dirname, dir);
    if (fs.existsSync(absoluteDir)) {
        console.log(`Processing ${dir}...`);
        readFilesRecursively(absoluteDir, excludeFolders, outputStream, absoluteDir);
    } else {
        console.log(`Directory ${dir} not found.`);
    }
});

outputStream.end(() => {
    console.log(`File ${fullOutputPath} has been created.`);
});