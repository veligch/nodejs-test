# express 框架

安装

~~~shell
npm i express
~~~

初体验

~~~js
1. 导入 express
const express = require('express');

2. 创建应用对象
const app = express();

3. 创建路由
app.get('/home', (req, res) => {
  // 表示请求方式为 get 请求
  // url为 /home
  res.end('hello express');
})

4. 监听端口，启动服务
app.listen(3000, () => {
  console.log('服务启动了，正在监听 3000 端口');
})
~~~

## 路由

### 使用格式

~~~js
const express = require('express');
const app = express();

// 语法
// 一个路由组成为请求方法，路径，回调函数组成
// method: get/post/all(所有方式)/...
// app.all("*",(req,res)=>{}) 表示 404
app.<method>(path, (req, res) => {
  res.end('hello express');
})

app.listen(端口号, () => {
  console.log('服务启动了');
})
~~~



### 获取请求参数

~~~js
const express = require('express');
const app = express();

app.get('/request', (req, res) => {
  1. 获取路径
  console.log(req.path); // req.url
  
  2. 获取请求参数
  console.log(req.query);
  
  3. 获取 IP
  console.log(req.ip);
  
  4. 获取请求头
  console.log(req.get('请求头名'));
  
  res.end('hello express');
});

app.listen(3000, () => {
  console.log('服务启动了');
});
~~~



### 获取路由参数

指 URL 路径中的参数

~~~js
const express = require('express');
const app = express();

// /:占位符
app.get('/:id', (req, res) => {
  console.log(req.params.id);	// 获取路由参数
  res.setHeader('content-type', 'text/html;charset=utf-8');
  res.end('商品详情');
});

app.listen(3000, () => {
  console.log('服务启动了');
});
~~~



## 响应设置

### 兼容原生 http 模块的方法

~~~js
const express = require('express');
const app = express();

app.get('/res', (req, res) => {
  res.statusCode = 404;
  res.statusMessage = 'love';
  res.setHeader('xxx', 'yyy');
  res.write('say hello');
  res.end('res');
});

app.listen(3000, () => {
  console.log('服务启动了');
});
~~~



### express 方法

~~~js
const express = require('express');
const app = express();

app.get('/res', (req, res) => {
  // 可以链式调用
  res.status(404);	// 状态码
  res.set('xxx', 'yyy');	// 响应头
  res.send('你好啊');	//	类似 end , 会自动添加字符集 utf-8
  
  // 其他方法
  res.redirect(ip);	// 重定向
  res.download(filePath);	// 下载
  res.json();	// 响应 json
  res.sendFile(__dirname + '/home.html');	// 响应文件内容
});

app.listen(3000, () => {
  console.log('服务启动了');
});
~~~

## express 中间件

> 类型：全局中间件、路由中间件等

### 声明中间件函数

~~~js
let recordMiddleware = (req, res, next) => {
  // 实现功能代码
  // ...
  next();
}
~~~



### 全局中间件函数

> 记录访问日志等

~~~js
const express = require('express');
const app = express();

let recordMiddleware = (req, res, next) => {
  // ...
  next();
}
// 使用中间件函数
app.use(recordMiddleware);

app.get('/res', (req, res) => {
  // ...
});
app.listen(3000, () => {
  console.log('服务启动了');
});
~~~



### 路由中间件函数

> 校验用户身份和权限

~~~js
const express = require('express');
const app = express();

let recordMiddleware = (req, res, next) => {
  // ...
  next();
}

// 将路由中间件函数放在受约束的路由函数中
app.get('/res', recordMiddleware, (req, res) => {
  // ...
});
app.listen(3000, () => {
  console.log('服务启动了');
});
~~~



### 静态资源中间件

> 1. 不写路径默认请求 index.html
> 2. 静态资源与路由同时匹配时，按代码顺序匹配
> 3. 路由响应动态资源，静态资源中间件响应静态资源

~~~js
const express = require('express');
const app = express();

// 设置静态资源文件目录
// 设置完成后，可以直接以根目录形式访问静态资源
// 如 https://127.0.0.1/css/css.css
// 会自动设置 mine 类型，并设置字符集
app.use(express.static(__dirname + '/public'));

app.get('/res', (req, res) => {
  // ...
});
app.listen(3000, () => {
  console.log('服务启动了');
});
~~~



## 获取请求体

安装 body-parse 中间件

~~~shell
npm i body-parser
~~~

使用

~~~js
// 导入
const bodyParser = require('body-parse');
const express = require('express');

const app = express();
// 解析 JSON 格式的请求体中间件，根据请求体格式使用
const jsonParser = bodyParser.json();

// 解析 querystring 格式请求体的中间件，根据请求体格式使用
const urlencodedParser = boyParser.urlencoded({ extended : false});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/login.html');
})
// urlencodedParser 执行完毕后会往 req 请求对象添加 body 属性
app.post('/login', urlencodedParser, (req, res) => {
  // 获取请求体
  console.log(req.body);
  res.send('获取数据');
})
~~~



## 防盗链

> 防止外部网站盗用本网站资源

~~~js
const express = require('express');
const app = express();

app.use((res, res, next) => {
  // 检测请求头的 referer 属性
  let referer = req.get('referer');
  if(referer){
    let url = new URL(referer);
    let hostname = url.hostname;
    if(hostname !== '127.0.0.1'){
      res.status(404).send('404');
      return;
    }
  }
   
})
app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {
  console.log('服务启动了');
});
~~~



## 路由模块化

### 创建路由模块

~~~js
// homeRouter.js
const express = require('express');
const router = express.Router();

router.get('/home', (req, res) => {
  res.send('前台首页');
})
router.get('/search', (req, res) => {
  res.send('前台收索');
})

module.exports = router;
~~~

~~~js
// adminRouter.js
const express = require('express');
const router = express.Router();

router.get('/admin', (req, res) => {
  res.send('后台首页');
})
router.get('/setting', (req, res) => {
  res.send('后台设置');
})

module.exports = router;
~~~



### 导入路由模块

~~~js
const express = require('express');
const app = express();

// 导入路由模块
const homeRouter = require('./homeRouter.js');
const adminRouter = require('./adminRouter.js');

// 使用路由模块
app.use(homeRouter);
app.use(adminRouter);
// 也可以添加路由前缀
// app.use('/', homeRouter);
// app.use('/admin', adminRouter);

module.exports = router;
~~~



## EJS 模板引擎

> EJS 是一个高效的 Javascript 的模板引擎，用于分离
>
> 有ejs 、pug 、twing 等

安装

~~~shell
npm i ejs
~~~

### 初体验

~~~js
const fs = require('fs');
// 导入 ejs
const ejs = require('ejs');

let fileData = fs.readFileSync(./xxx.html).toString();
// 使用 ejs 渲染
// ejs 识别 <%= js表达式 %>
let result = ejs.render(fileData, {a, b, ...});
~~~

~~~html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h1><%= a %></h1>
  <h1><%= b %></h1>
</body>
</html>
~~~



### 列表渲染

~~~js
const fs = require('fs');
const ejs = require('ejs');

let xiyouji = ['唐僧', '孙悟空', '猪八戒', '沙僧'];
let fileData = fs.readFileSync(./xxx.html).toString();
// 使用 ejs 渲染
// ejs 识别 <%= js表达式 %>, 识别 <% js语法 %>
let result = ejs.render(fileData, {xiyouji});
~~~

~~~ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <ul>
    <% xiyouji.forEach(item) => { %>
      <li><%= item %></li>
    <% }) %>  
  </ul>
</body>
</html>
~~~



### 条件渲染

~~~js
const fs = require('fs');
const ejs = require('ejs');

let flag = false;
let fileData = fs.readFileSync(./xxx.html).toString();
// 使用 ejs 渲染
// ejs 识别 <%= js表达式 %>, 识别 <% js语法 %>
let result = ejs.render(fileData, {flag});
~~~

~~~ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <% if (flag) { %>
    <button>登录</button>
  <% }else{ %>
    <button>注册</button>
  <% } %> 
</body>
</html>
~~~



### express 使用 ejs

~~~js
const express = require('express');
const path = require('path');
const app = express();

// 设置模板引擎
app.set('view engine', 'ejs');
// 设置模板文件存放位置, 在存放位置新建 xxx.ejs 后缀的文件
app.set('view', path.resolve(__dirname, './views'));

app.get('/home', (req, res) => {
  // 响应 ejs 文件
  res.render('xxx', '数据');
})

app.listen(3000, () => {
  console.log('服务启动了，正在监听 3000 端口');
})
~~~



## express-generator

> 快速搭建 express 代码骨架

安装

~~~shell
npm install -g express-generator
~~~

使用

~~~shell
1. 创建
express -e dirPath
-e 			表示 ejs 模板引擎
dirPath		表示新建在哪个目录

2. 安装依赖：到新建的文件夹内执行
npm i

3. 启动
npm start
~~~



## 文件上传

> 处理上传文件需要 formidable 包

### 安装

~~~shell
npm i formidable
~~~

### 使用

~~~js
const express = require('express');
const formidable  = require('formidable');
const path  = require('path');

const app = express();

// 设置模板引擎
app.set('view engine', 'ejs');
// 设置模板文件存放位置, 在存放位置新建 xxx.ejs 后缀的文件
app.set('view', path.resolve(__dirname, './views'));

// 显示网页表单
app.get('/portrait', (req, res) => {
  res.render('portrait');
})

// 上传
app.post('/portrait', (req, res) => {
  // 创建 form 对象
  const form = formidable({ 
    multiples : true,
    // 设置上传文件的保存目录
    uploadDir: __dirname + '/../public/images',
    // 保持文件后缀
    keepExtensions: true
  });
  
  // 解析请求报文，将结果存放到 fields，fields 中
  // @fields	存放一般字段
  // @fields	存放文件数据
  form.parse(req, (err, fields, files) => {
    if(err){
      next(err);
      return;
    }
      
    // 保存图片的存放路径，一般放数据库
    let fileUrl = '/images/' + files.portrait.newFilename;
    res.send(fileUrl);
  })
})

app.listen(3000, () => {
  console.log('server is running')
})
~~~

~~~ejs
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
  <h2>文件上传</h2>
  <form 
    action="https://127.0.0.1:3000" 
    method="post" 
    enctype="multipart/form-data"
  >
    用户名：<input type="text" name="username"/><br>
    头像：<input type="file" name="portrait"/><br>
    <hr>
    <button>提交</button>
  </form>
</body>
</html>
~~~

## lowdb

> 借助 json 文件实现数据库的功能

安装

~~~shell
npm i lowdb@1.0.0
~~~

使用

~~~js
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
// 数据存放点
const adapter = new FileSync('db.json');
// 获得 db 对象
const db = low(adapter);

// 初始化对象
db.defaults({
  posts : [], 
  user : {}
}).write();

// 获取单条数据
let res = db.get('post').find(条件).value();
let res = db.get('post').find({id:1}).value();

// 写入数据
// write 写入文件
// push  尾部追加
// unshift 	首部追加
db.get('post').push(data).write();

// 获取数据
db.get('post').value();

// 删除数据，返回删除的对象
db.get('post').remove(条件).write();

// 更新数据
db.get('post').find({id:1}).assign({title:'哈哈'}).write();
~~~

