const fs = require('fs');

// 异步读取文件
fs.readFile('./2_读取文件.txt', (err, data) => {
  if (err) {
    console.log(err);
    return
  }
  console.log('异步读取成功');
  console.log(data.toString());
});

// 同步读取文件
const data = fs.readFileSync('2_读取文件.txt');
console.log('同步读取成功');
console.log(data.toString());

// 流式读取
const rs = fs.createReadStream('2_读取文件.txt');
rs.on('data', chunk => {
  console.log('流式读取~~~')
  console.log(chunk.toString());
})
rs.on('end', () => {
  console.log('流式读取成功');
})
