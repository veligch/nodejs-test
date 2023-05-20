const fs = require('fs');

console.log(__dirname);
console.log(__filename);

// 异步创建
// fs.mkdir('./a', err => {

// })

// 同步创建
// fs.mkdirSync('./a');

// 递归创建
// fs.mkdir('./a/b/c', { recursive: true }, err => {
//   console.log(err)
//   console.log('创建成功')
// })