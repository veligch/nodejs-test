const http = require('http');
// const url = require('url');

const server = http.createServer((request, response) => {
  response.setHeader('content-type', 'text/html;charset=utf-8');

  // const { pathname, query } = url.parse(request.url);
  const { pathname, searchParams } = new URL(request.url, 'http://127.0.0.1:9000');
  if (pathname === '/login') {
    response.end('登录页面' + searchParams.get('wd'));
  } else if (pathname === '/reg') {
    response.end('注册页面' + searchParams.get('wd'));
  } else {
    // response.end('Not Found')
  }


});

server.listen(9000, () => {
  console.log('服务正常启动');
});