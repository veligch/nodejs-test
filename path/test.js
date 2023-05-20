const path = require('path');

// 当前文件所在的目录
console.log(__dirname);

// 当前文件的路径
// 第二参数必须为相对路径
const dirname = path.resolve(__dirname, 'test.js');
console.log(111)
console.log(dirname);
console.log(222)

// 当前系统的路径分隔符
console.log(path.sep)

// 解析当前路径，返回对象形式的解析体
console.log(path.parse('./test.js'));

// 获取路径的文件名或文件夹名
console.log(path.basename(dirname));  // test.js

// 获取文件所在的文件夹名
console.log(path.dirname(dirname)); // path

// 获取文件的拓展名
console.log(path.extname(dirname));   // .js
