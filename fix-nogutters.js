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

    // Replace noGutters with className="g-0"
    // Pattern: noGutters> or noGutters className=
    content = content.replace(/noGutters>/g, 'className="g-0">');
    content = content.replace(/noGutters(\s+)className=/g, 'className="g-0 " $1className=');
    content = content.replace(/noGutters={true}/g, 'className="g-0"');
    content = content.replace(/noGutters="true"/g, 'className="g-0"');
    content = content.replace(/(\s)noGutters(\s)/g, '$1className="g-0"$2');

    // Fix duplicate className
    content = content.replace(/className="g-0"\s+className="/g, 'className="g-0 ');

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content);
        filesFixed++;
        let count = (originalContent.match(/noGutters/g) || []).length;
        totalReplacements += count;
        console.log(`Fixed: ${filePath} (${count} replacements)`);
    }
});

console.log(`\nTotal files fixed: ${filesFixed}`);
console.log(`Total replacements: ${totalReplacements}`);
