const fs = require('fs');

// 异步 unlink 删除
// fs.unlink('./xxx.html', (err) => {
//   console.log('删除成功');
// })

// 同步 unlink 删除
// fs.unlinkSync('./xxx.html');
// console.log('删除成功')

// 异步 rm 删除
// fs.rm('./xxx.html', err => {
//   console.log('删除成功');
// })

// 同步 rm 删除
fs.rmSync('./xxx.html');