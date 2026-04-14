const fs = require('fs');
const path = require('path');

const directoryPaths = [
    path.join(__dirname, 'src', 'student_module'),
    path.join(__dirname, 'src', 'neetjee_guru'),
    path.join(__dirname, 'src', 'student_bck'),
    path.join(__dirname, 'src', 'components'),
    path.join(__dirname, 'src')
];

const allowedExtensions = ['.js', '.jsx', '.html'];

function processFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let originalContent = content;

    // Let's replace startrizee with startELAPP anywhere we find it.
    content = content.replace(/startrizee/g, 'startELAPP');
    content = content.replace(/startRizee/g, 'startELAPP');

    // Replace "Logging into rizee.in" with "Logging into ELAPP"
    content = content.replace(/Logging into rizee\.in/g, 'Logging into ELAPP');

    // Replace rizee-effects with ELAPP-effects
    content = content.replace(/rizee-effects/g, 'ELAPP-effects');

    // Replace rizee in package tracking or object props where it's safe: 
    // We saw `{ name: 'rizee' }` in GA.
    content = content.replace(/name: 'rizee'/g, "name: 'ELAPP'");

    if (content !== originalContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function traverseDirectory(dir) {
    if (!fs.existsSync(dir)) return;

    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            traverseDirectory(fullPath);
        } else if (stat.isFile() && allowedExtensions.includes(path.extname(fullPath))) {
            processFile(fullPath);
        }
    }
}

directoryPaths.forEach(dir => traverseDirectory(dir));
console.log('Done processing final cleanup.');
