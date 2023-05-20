# path 模块

~~~js
const path = require('path');

// 拼接输出绝对路径
// 第二参数必须为相对路径
path.resolve('绝对路径', '相对路径', ...);
path.resolve(__dirname, 'index.html');

// 获取当前系统的路径分隔符
path.sep

// 解析当前路径，返回对象形式的解析体
// __filename: 文件的绝对路径
path.parse(<path or pathStr>);
let str = 'D:\\nodeJS\\path.js';
path.parse(str);
path.parse(__dirname);

// 获取文件名或文件夹名
path.basename(str);	// path.js

// 获取文件所在的目录
path.dirname(str);	// D:\nodeJS

// 获取文件扩展名
path.extname(str);	// .js
~~~
