const http = require('http');
const fs = require('fs').promises;

const host = 'localhost';
const port = 8080;

let indexFile;

const requestListener = function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  switch (req.url) {
    case '':
      res.writeHead(200);
      res.end(indexFile);
      break;
    case '/about':
      console.log('here');
      res.writeHead(200);
      res.end(indexFile);
      break;
    case '/contact':
      res.writeHead(200);
      res.end(indexFile);
      break;
    default:
      res.writeHead(404);
      res.end(indexFile);
  }
};

const server = http.createServer(requestListener);

fs.readFile(__dirname + '/index.html')
  .then(contents => {
    indexFile = contents;
    server.listen(port, host, () => {
      console.log(`Server is running on http://${host}:${port}`);
    });
  })
  .catch(err => {
    console.error(`Could not read file: ${err}`);
    process.exit(1);
  });

// const requestListener = function (req, res) {
//   fs.readFile(__dirname + '/index.html')
//     .then(contents => {
//       res.setHeader('Content-Type', 'text/html');
//       res.writeHead(200);
//       res.end(contents);
//     })
//     .catch(err => {
//       res.writeHead(500);
//       res.end(err);
//       return;
//     });
// };

// const server = http.createServer(requestListener);

// server.listen(port, host, () => {
//   console.log(`Server is running on http://${host}:${port}`);
// });
