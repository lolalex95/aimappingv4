const http = require('http');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const PORT = 4173;

// Detect root directory (whether run from project root or inside dist folder)
const currentDir = process.cwd();
let serveDir = currentDir;

if (fs.existsSync(path.join(currentDir, 'dist', 'index.html'))) {
  serveDir = path.join(currentDir, 'dist');
} else if (fs.existsSync(path.join(__dirname, 'dist', 'index.html'))) {
  serveDir = path.join(__dirname, 'dist');
}

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.mp4': 'video/mp4',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
};

const server = http.createServer((req, res) => {
  let decodedUrl = decodeURIComponent(req.url.split('?')[0]);
  if (decodedUrl === '/' || decodedUrl === '') {
    decodedUrl = '/index.html';
  }

  let filePath = path.join(serveDir, decodedUrl);

  // If path doesn't exist, try index.html for SPA routing fallback
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(serveDir, 'index.html');
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const contentType = mimeTypes[ext] || 'application/octet-stream';
    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'no-cache',
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

server.listen(PORT, () => {
  const url = `http://127.0.0.1:${PORT}`;
  console.log(`========================================================`);
  console.log(`  AiMapping Web - Servidor Activo en: ${url}`);
  console.log(`========================================================`);
  
  // Open default browser on Windows
  exec(`start ${url}`);
});
