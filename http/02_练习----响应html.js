const http = require('http');
const fs = require('fs');

const server = http.createServer((request, response) => {
  let html = fs.readFileSync(__dirname + '/练习----响应html.html')
  // let html = fs.readFileSync('./hello.html');
  response.setHeader('content-type', 'text/html;charset=utf-8');
  // let {pathname} = new URL(request.url);
  response.end(html);
});

server.listen(9001, () => {
  console.log('服务已经启动')
});