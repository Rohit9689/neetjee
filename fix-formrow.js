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

    // Replace Form.Row with Row
    content = content.replace(/<Form\.Row/g, '<Row');
    content = content.replace(/<\/Form\.Row>/g, '</Row>');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        filesFixed++;
        let count = (originalContent.match(/Form\.Row/g) || []).length;
        totalReplacements += count;
        console.log(`Fixed: ${filePath} (${count} replacements)`);
    }
});

console.log(`\nTotal files fixed: ${filesFixed}`);
console.log(`Total replacements: ${totalReplacements}`);
