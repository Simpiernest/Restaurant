const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../out');
const types = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.woff2':'font/woff2','.json':'application/json','.txt':'text/plain; charset=utf-8'};
http.createServer((req,res)=>{
  let url;
  try { url = decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch { res.writeHead(400); res.end(); return; }
  let target = path.resolve(root, '.' + (url==='/'?'/index.html':url));
  if (!target.startsWith(root+path.sep)) { res.writeHead(403); res.end(); return; }
  if (!path.extname(target)) target += '.html';
  fs.readFile(target,(error,data)=>{
    if(error){res.writeHead(404,{'Content-Type':'text/html'});res.end(fs.readFileSync(path.join(root,'404.html')));return;}
    res.writeHead(200,{'Content-Type':types[path.extname(target)]||'application/octet-stream'});res.end(data);
  });
}).listen(3001,'127.0.0.1',()=>console.log('BellaVista production preview: http://localhost:3001'));
