const fs = require('node:fs');
const http = require('node:http');
const path = require('node:path');

const repoRoot = path.resolve(__dirname, '..');
const port = Number(process.env.PORT || 3000);

const contentTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.js', 'text/javascript; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.svg', 'image/svg+xml']
]);

function safePath(urlPath) {
  const cleanPath = decodeURIComponent(urlPath.split('?')[0]);
  const relativePath = cleanPath === '/' ? 'index.html' : cleanPath.replace(/^\/+/, '');
  const resolved = path.resolve(repoRoot, relativePath);

  if (!resolved.startsWith(repoRoot)) {
    return null;
  }

  return resolved;
}

const server = http.createServer((request, response) => {
  const filePath = safePath(request.url || '/');

  if (!filePath) {
    response.writeHead(403, { 'content-type': 'text/plain; charset=utf-8' });
    response.end('Forbidden');
    return;
  }

  fs.readFile(filePath, (error, content) => {
    if (error) {
      response.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
      response.end('Not found');
      return;
    }

    const contentType = contentTypes.get(path.extname(filePath)) || 'application/octet-stream';
    response.writeHead(200, { 'content-type': contentType });
    response.end(content);
  });
});

server.listen(port, () => {
  console.log(`Security Program Scaffolding Demo running at http://localhost:${port}`);
});
