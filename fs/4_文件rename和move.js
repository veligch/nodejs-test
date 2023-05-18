const fs = require('fs');

// 异步重命名
// fs.rename('4_rename and move.txt', '4_rename and move.js', err => {
//   if (err) {
//     console.log(err);
//     return
//   }
//   console.log('异步文件重命名成功');
// });

// 异步移动
// fs.rename('4_rename and move.txt', './move/4_rename and move.txt', err => {
//   if (err) {
//     console.log(err);
//     return
//   }
//   console.log('异步文件移动成功');
// });

// 同步重命名
// fs.renameSync('4_rename and move.txt', '4_rename and move.js');
// fs.renameSync('4_rename and move.js', '4_rename and move.txt');

// 同步移动
// fs.renameSync('4_rename and move.txt', './move/4_rename and move.txt');
