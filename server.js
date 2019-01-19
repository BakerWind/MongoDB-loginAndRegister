const http = require('http');
const url = require('url');
const routes = require('./modules/routes.js');

http.createServer((req, res) => {

    if (req.url === '/favicon') {
        res.end();
        return;
    }

    var pathName = url.parse(req.url).pathname.substr(1);

    try {
        routes[pathName](req, res);
        console.log(pathName);
    } catch (error) {
        console.log(error.message);
        routes.home(req, res);
    }

}).listen(3000);

console.log('服务启动成功');