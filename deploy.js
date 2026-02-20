// Plesk deployment: After `npm run build`, this script copies
// the standalone output to the right place for Plesk to find server.js
const fs = require('fs');
const path = require('path');

function copyRecursive(src, dest) {
    if (!fs.existsSync(src)) return;
    if (fs.statSync(src).isDirectory()) {
        fs.mkdirSync(dest, { recursive: true });
        for (const file of fs.readdirSync(src)) {
            copyRecursive(path.join(src, file), path.join(dest, file));
        }
    } else {
        fs.copyFileSync(src, dest);
    }
}

const standaloneDir = path.join(__dirname, '.next', 'standalone');

// 1. Copy standalone server.js to root
if (fs.existsSync(path.join(standaloneDir, 'server.js'))) {
    fs.copyFileSync(
        path.join(standaloneDir, 'server.js'),
        path.join(__dirname, 'server.js')
    );
    console.log('✅ server.js copied to root');
}

// 2. Copy static files into standalone .next
copyRecursive(
    path.join(__dirname, '.next', 'static'),
    path.join(standaloneDir, '.next', 'static')
);
console.log('✅ .next/static copied');

// 3. Copy public folder into standalone
copyRecursive(
    path.join(__dirname, 'public'),
    path.join(standaloneDir, 'public')
);
console.log('✅ public/ copied');

console.log('🚀 Plesk deployment ready!');
