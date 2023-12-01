const http = require('http');
const fs = require('fs');

const host = 'localhost';
const port = 8080;

http.createServer((req, res) => {
  let fileName = '';
  const reqURL = new URL(req.url, `http://${host}:${port}/`);
  if (reqURL.pathname === '/') {
    fileName = './index.html';
  } else {
    fileName = `.${reqURL.pathname}.html`;
  }

  fs.readFile(fileName, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.write(
        fs.readFileSync('./404.html', (err, data) => {
          if (err) throw (err);
          return data;
        })
      );
      return res.end();
    }

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(data);
    return res.end();
  });
}).listen(port);
