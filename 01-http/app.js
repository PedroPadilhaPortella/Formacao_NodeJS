var http = require('http')

const port = '3000'
http.createServer((request, response) => {
    response.end('<h1>Http Local Server</h1><h4>guiadoprogramador.com</h4>')
}).listen(port);

console.log(`Server running at port ${port}`);