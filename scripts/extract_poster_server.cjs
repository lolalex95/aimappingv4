const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5432;
const ROOT = path.join(__dirname, '..');

const server = http.createServer((req, res) => {
  if (req.method === 'POST' && req.url === '/save_poster') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const { image } = JSON.parse(body);
        const base64Data = image.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');
        
        const outPath1 = path.join(ROOT, 'public', 'Assets', 'hero-poster.webp');
        const outPath2 = path.join(ROOT, 'Assets', 'hero-poster.webp');
        const outPath3 = path.join(ROOT, 'dist', 'Assets', 'hero-poster.webp');
        
        fs.mkdirSync(path.dirname(outPath1), { recursive: true });
        fs.writeFileSync(outPath1, buffer);
        fs.mkdirSync(path.dirname(outPath2), { recursive: true });
        fs.writeFileSync(outPath2, buffer);
        if (fs.existsSync(path.dirname(outPath3))) {
          fs.writeFileSync(outPath3, buffer);
        }
        
        console.log('Saved hero-poster.webp, size:', (buffer.length / 1024).toFixed(1), 'KB');
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Poster saved successfully!');
        setTimeout(() => process.exit(0), 1000);
      } catch (err) {
        console.error('Error saving poster:', err);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Error: ' + err.message);
      }
    });
    return;
  }

  let filePath = path.join(ROOT, req.url === '/' ? 'public/extract_poster.html' : req.url);
  if (!fs.existsSync(filePath)) {
    filePath = path.join(ROOT, 'public', req.url);
  }

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath).toLowerCase();
    const isVideo = ext === '.mp4';
    const contentType = isVideo ? 'video/mp4' : (ext === '.html' ? 'text/html' : 'application/octet-stream');

    // HTTP range request support for video
    if (isVideo && req.headers.range) {
      const range = req.headers.range;
      const stat = fs.statSync(filePath);
      const total = stat.size;
      const parts = range.replace(/bytes=/, "").split("-");
      const partialstart = parts[0];
      const partialend = parts[1];
      const start = parseInt(partialstart, 10);
      const end = partialend ? parseInt(partialend, 10) : total - 1;
      const chunksize = (end - start) + 1;
      
      const file = fs.createReadStream(filePath, { start: start, end: end });
      res.writeHead(206, {
        'Content-Range': 'bytes ' + start + '-' + end + '/' + total,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunksize,
        'Content-Type': contentType,
        'Access-Control-Allow-Origin': '*'
      });
      file.pipe(res);
      return;
    }

    res.writeHead(200, {
      'Content-Type': contentType,
      'Access-Control-Allow-Origin': '*'
    });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(PORT, () => {
  console.log(`Poster extraction server running on http://127.0.0.1:${PORT}`);
});
