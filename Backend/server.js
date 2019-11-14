const http = require('http');
const app = require('./app');
const { port } = require('./config');


const serverPort = port || 3000;
console.log(`Node.js is running on port ${serverPort}`);

const server = http.createServer(app);

server.listen(serverPort);