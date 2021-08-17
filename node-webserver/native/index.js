const http = require('http');
const fs = require('fs');

function sendError(res) {
  res.writeHead(500);
  res.end();
}

// Création d'un serveur HTTP
http.createServer((req, res) => {

  if (req.url === '/') {
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end('Example d\'un serveur http nodejs natif');

  } else if (req.url === '/styles.css') {
    fs.readFile('./static/styles.css', (err, data) => {
      if (err) sendError(res);
      res.writeHead(200, {'Content-Type':'text/css'});
      res.end(data);
    })

  } else if (req.url.startsWith('/img/')) {

    const fileName = req.url.split('/img/')[1];
    fs.readFile(`./static/images/${fileName}`, (err, data) => {
      if (err) sendError(res);
      res.writeHead(200, {'Content-Type':'image/png'});
      res.end(data);
    })

  } else {
    res.writeHead(404);
    res.end();
  }

}).listen(3200)