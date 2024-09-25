const fs = require('fs');
const path = require('path');

function shouldIncludeFile(filePath) {
    const includeExtensions = ['.ts', '.tsx'];
    return includeExtensions.includes(path.extname(filePath).toLowerCase());
}

function readFilesRecursively(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            readFilesRecursively(filePath);
        } else if (shouldIncludeFile(filePath)) {
            console.log(`\n--- File: ${filePath} ---\n`);
            const content = fs.readFileSync(filePath, 'utf8');
            console.log(content);
        }
    });
}

const srcDir = path.join(__dirname, 'src');

if (fs.existsSync(srcDir)) {
    console.log('Contents of .ts and .tsx files in src folder:');
    readFilesRecursively(srcDir);
} else {
    console.log('src folder not found in the current directory.');
}