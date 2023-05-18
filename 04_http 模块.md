# http 模块

~~~js
const http = require('http');

1. 创建服务对象
const server = http.createServer((request, response) => {
  // 接收到请求后执行
  // request  请求报文对象
  // response 响应报文对象
  response.end('Hello HTTP Server'); // 设置响应体
});

2. 监听端口，启动服务
server.listen(端口号, () => {
  // 服务启动成功后执行
})
~~~

## 注意事项

~~~js
1. 停止服务
ctrl + C 

2. 更新服务后必须重启服务

3. 响应体有中文
response.setHeader('content-type', 'text/html;charset=utf-8 ');

4. 端口被占用
  1) 关闭当前服务
  2) 修改为其他端口号
  
5. http 默认 80 端口，http 默认 443 端口
  http 开发常用端口 3000 , 8080 , 8090 , 9000
~~~

## 获取请求报文

~~~js
const http = require('http');
const url = require('url');

const server = http.createServer((request, response) => {
  // 常用
  console.log("请求方法：" + request.method);
  console.log("请求路径：" + request.url);	// 只包含 url 的路径与查询字符串
  console.log("请求头：" + request.headers);
  console.log("URL 路径" + url.parse(request.url).pathname);
  console.log("URL 查询字符串" + url.parse(request.url, true).query);
    
  // 请求体提取
  1. 声明一个变量
  let body = '';
  2. 绑定事件
  request.on('data', chunk => {
    body += chunk;
  })
  3. 绑定 end 事件
  request.on('end', () => {
    console.log(body);
    response.end('hello http');
  })
    
  // 不常用
  console.log("请求 http 协议版本号：" + request.httpVersion);
});

server.listen(9000, () => {
})
~~~

## 获取请求报文的 url 和查询字符串(新)

~~~js
const http = require('http');

const server = http.createServer((request, response) => {
  1. 实例化 URL 对象
  // let url = new URL('/search?wd=100', 'https://www.baidu.com:443');
  // let url = new URL('https://www.baidu.com:443/search?wd=100');
  let url = new URL(request.url, 'https://www.baidu.com:443');
  console.log(url.pathname);
  console.log(url.searchParams.get('wd'));
});

server.listen(9000, () => {
})
~~~

## 练习------搭建 HTTP 服务

~~~js
const http = require('http');
// 方式二：const url = require('url');

const server = http.createServer((request, response) => {
  response.setHeader('content-type', 'text/html;charset=utf-8');

  // 方式二：const { pathname, query } = url.parse(request.url);
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
~~~

## 设置响应报文

~~~js
const http = require('http');

const server = http.createServer((request,response) => {
  1. 响应状态码
  response.statusCode = xxx;
  2. 响应状态描述
  response.statusMessage = 'xxx';
  3. 响应头
  response.setHeader('content-type', 'text/html;charset=utf-8');
  response.setHeader('myHeader', '哈哈哈');
  response.setHeader('sameHeader', ['1', '2', '3']); // 同名响应头
  4. 响应体
  response.write('iloveyou');	// 追加在 end 之前，所以一般不和 end 同时用
  
  response.end('response')
})
~~~

## 练习-----响应一个表格

~~~js
const http = require('http');
const fs = require('fs');

const server = http.createServer((request,response) => {
  // 获取请求url
  let { pathname } = new URL(request.url, 'http://127.0.0.1');
  let root = __dirname + '/page';
  // 拼接文件路径
  let filePath = root + pathname;
  let file = fs.readFileSync(filePath);
  response.end(file);
})
~~~

## 练习----响应文件

## 静态资源服务

~~~js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request,response) => {
  // 获取请求url
  let { pathname } = new URL(request.url, 'http://127.0.0.1');
  let root = __dirname + '/page';
  // 拼接文件路径
  let filePath = root + pathname;
  fs.readFile(filePath, (err, data) => {
    if(err) {
      response.statusCode = 500;
      response.end('文件读取失败');
      return
    }
    response.end(data)
  })
})
~~~

## 网页 url

~~~js
// 绝对路径
"http://www.baidu.com"
"//www.baidu.com"	// 会补充上本机web协议
"/api"	// 相当与本机地址加上改url

// 相对路径，使用较少
"./js/app.css"
"js/app.css"
"../img/logo.png"
"../../mp4/show.mp4"	// 返回上一级只能到顶的根目录
~~~

## mine 媒体类型

~~~js
// application/octet-stream	未知类型

// 设置mine类型
const http = require('http');
const fs = require('fs');
const path = require('path');
const mines = {
  html:'text/html',
  css:'text/css',
  js:'text/javascript',
  png:'image/png',
  jpg:'image/jpeg',
  gif:'image/gif',
  mp4:'video/mp4',
  mp3:'audio/mpeg',
  json:'application/json'
}

const server = http.createServer((request,response) => {
  // 获取请求url
  let { pathname } = new URL(request.url, 'http://127.0.0.1');
  let root = __dirname + '/page';
  // 拼接文件路径
  let filePath = root + pathname;
  fs.readFile(filePath, (err, data) => {
    if(err) {
	  response.statusCode = 500;
        response.end('文件读取失败');
        return
    }
    // 获取 .后缀名，去除 .
    let ext = path.extname(filePath).slice(1);
    // 获取类型
    let type = mines[ext];
    if(type){
      // css,js,图片等资源不需要字符集设置
      // 它们会根据当前网页的字符集
      if(ext === 'html'){
        response.setHeader('content-type', type + ';charset=utf=8');
      }else{
        response.setHeader('content-type', type);
      } 
    }else{
      response.setHeader('content-type', 'application/octet-stream');
    }
    response.end(data)
  })
})
~~~

## 响应错误状态处理

~~~js
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((request,response) => {
  // 请求方式错误
  if(request.method !== 'GET'){
    response.statusCode = 405;
    response.end('<h1>405 Method Not Allowed</h1>');
    return
  }
 
  let { pathname } = new URL(request.url, 'http://127.0.0.1');
  let root = __dirname + '/page'
  let filePath = root + pathname;
  fs.readFile(filePath, (err, data) => {
    if(err) {
      // 响应错误
      swith(err.code){
        case 'ENOENT':
          response.statusCode = 404;
          response.end('<h1>404 Not Found</h1>');
        case 'ENOENT':
          response.statusCode = 404;
          response.end('<h1>403 Forbidden</h1>');
        default:
          response.statusCode = 500;
          response.end('<h1>Internal Server Error</h1>');
      }
    }
  })
})
~~~

