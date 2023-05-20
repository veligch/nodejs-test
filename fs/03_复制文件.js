const fs = require('fs');

// 同步复制
// const data = fs.readFileSync('./3_复制文件.js');
// fs.writeFileSync('./3_复制文件 copy.txt', data);
// console.log('同步复制成功');

// 异步复制
// nodemon 命令会死循环
// fs.readFile('./3_复制文件.js', (err, data) => {
//   if (err) {
//     return
//   }
//   fs.writeFile('./3_复制文件.js', data, (err1) => {
//     if (err1) {
//       console.log(err1)
//       return
//     }
//     console.log('异步复制成功');
//   })
// })


// 流式复制
// const rs = fs.createReadStream('./3_复制文件.js');
// const ws = fs.createWriteStream('./3_复制文件.txt');
// rs.on('data', chunk => {
//   ws.write(chunk);
// })
// rs.on('end', () => {
//   console.log('流式复制完成');
// })

// rs.pipe 复制
const rs = fs.createReadStream('./3_复制文件.js');
const ws = fs.createWriteStream('./3_复制文件.txt');
rs.pipe(ws)