# path 模块

~~~js
const path = require('path');

// 拼接输出绝对路径
path.resolve('绝对路径', '相对路径', ...);
path.resolve(__dirname, 'index.html');

// 获取当前系统的路径分隔符
path.sep

// 解析路径
// __filename: 文件的绝对路径
let str = 'D:\\nodeJS\\path.js';
path.parse(str);

// 获取文件名
path.basename(str);	// path.js

// 获取文件的目录
path.dirname(str);	// D:\nodeJS

// 获取文件扩展名
path.extname(str);	// .js
~~~

## 