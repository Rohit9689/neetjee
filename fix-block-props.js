const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

let filesFixed = 0;
let totalReplacements = 0;

walkDir('src', (filePath) => {
    if (!filePath.endsWith('.jsx') && !filePath.endsWith('.js')) return;
    if (filePath.includes('node_modules')) return;
    if (filePath.includes('student_bck')) return; // Skip backup folder

    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Replace patterns like: block> or block /> or block disabled
    // Pattern 1: block> at end of tag
    content = content.replace(/(\s)block>/g, '$1className="w-100">');

    // Pattern 2: block /> self-closing
    content = content.replace(/(\s)block\s*\/>/g, '$1className="w-100" />');

    // Pattern 3: block followed by space and another attribute
    content = content.replace(/(\s)block(\s+)(?=[a-zA-Z])/g, '$1className="w-100"$2');

    // Pattern 4: block} (in JSX expressions)
    content = content.replace(/(\s)block}/g, '$1className="w-100"}');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        filesFixed++;
        let count = (originalContent.match(/\sblock[>\s\/]/g) || []).length;
        totalReplacements += count;
        console.log(`Fixed: ${filePath} (${count} replacements)`);
    }
});

console.log(`\nTotal files fixed: ${filesFixed}`);
console.log(`Total replacements: ${totalReplacements}`);
