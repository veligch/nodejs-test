const fs = require('fs');

// 异步写入
fs.writeFile('1_文件写入.txt', '三人行\r\n', err => {
  if (err) {
    console.log(err);
    return
  }
  console.log('写入成功');
})

// 同步写入
fs.writeFileSync('./1_文件写入.txt', '必有我师焉\r\n');

// 异步追加写入
fs.appendFile('./1_文件写入.txt', '则其善者而从之\r\n', err => {
  if (err) {
    console.log(err);
    return
  }
  console.log('追加写入成功');
})

// 同步追加写入
fs.appendFileSync('./1_文件写入.txt', '其不善者而改之\r\n');

// 流式写入
const ws = fs.createWriteStream('./1_文件写入.txt');
ws.write('床前明月光\r\n');
ws.write('疑似地上霜\r\n');
ws.end();



