const http = require('http');
const fs = require('fs');
const host = 'localhost';
const port = 8080;

const requestListener = function(req, res) {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200);
        res.end(indexFile);}
    else if (req.method === 'POST' && req.url === '/passInn') {
        let data = '';
        req.on('data', chunk => {
            data += chunk;
        });
        req.on('end', () => {
            console.log('Form data: ', data);
            res.end(`You have submitted the following data: ${data}`);
        });
    } else {
        res.writeHead(404);
        res.end('Page not found');
    }
};

const server = http.createServer(requestListener);

fs.readFile(__dirname + '/passInn.html', 'utf-8', (err, contents) => {
    if (err) {
        console.error(`Could not read passInn.html file: ${err}`);
        process.exit(1);
    } else {
        indexFile = contents;
        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`);
        });
    }
});
