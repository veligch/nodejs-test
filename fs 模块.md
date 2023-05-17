# fs 模块

## 写入

~~~js
// 导入 fs 模块
const fs = require('fs');

// 写入文件
----------------------------------------------------------------------------
1. 异步写入
fs.writeFile(path, data[, options], callback);
// fileName	文件名
// data		数据
// options	可选，设置项
// callback	完成回调
fs.writeFile('./座右铭.txt', '三人行必有我师焉', err => {
  // 写入失败：错误对象	写入成功：null
  if( err ){
    console.log('写入失败');
  }
  console.log('写入成功');
})
----------------------------------------------------------------------------
2. 同步写入
fs.writeFileSync(fileName, data[, options]);
fs.writeFileSync('./data.txt', 'test');
~~~

## 追加写入


~~~js

1. 导入 fs 模块
const fs = require('fs');

2. 调用 appendFile
----------------------------------------------------------
// 异步追加
fs.appendFile('./座右铭.txt','，则其善者而从之，其不善者而改之',err => {
    // ...
})
----------------------------------------------------------
// 同步追加
// \r\n	换行
fs.appendFileSync('./座右铭.txt','\r\n温故而知新')
----------------------------------------------------------
// 配置追加法
fs.writeFile('./座右铭.txt','三人行必有我师焉', { flag : 'a' } ,err => {
  // ... 
})
~~~

## 流式写入

~~~js
1. 导入 fs 模块
const fs = require('fs');

2. 创建写入流对象
const ws = fs.createWriteStream('./观书有感.txt');

3. write
ws.write('第1行\r\n');
ws.write('第2行\r\n');
ws.write('第3行\r\n');
ws.write('第4行\r\n');

4. 关闭通道
ws.close(); // ?? ws.end()
~~~

## 读取

~~~js
1. 导入 fs 模块
const fs = require('fs');

2. 读取
----------------------------------------------------------
// 异步
fs.readFile(path[, options], callback);
fs.readFile('./观书有感.txt', (err, data)=>{
  if( err ){
    console.log('读取失败');
  }
  console.log('读取成功');
  console.log(data.toString());	// data 为 Buffer 对象
});
----------------------------------------------------------
// 同步
let data = fs.readFileSync(path);
console.log(data.toString());
----------------------------------------------------------
//流式读取
3. 创建读取流对象
const rs = fs.createReadStream('../资料/笑看风云.mp4');
4. 绑定 data 事件
rs.on('data', chunk => {
  console.log(chunk.length); // 每次读取 64KB (65536)
});
5. end	可选事件
rs.on('end',()=>{
  console.log('读取完成');
})
~~~

## 练习------复制文件

~~~js
const fs = require('fs');

// 方式1：readFile
let data = fs.readFileSync('./xxx.mp4');
fs.writeFileSync('./xxx-1.mp4',data);

// 方式2：流式操作
const rs = fs.createReadStream('./xxx.mp4');
const ws = fs.createWriteStream('./xxx-2.mp4');
rs.on('data',chunk=>{
  ws.write(chunk);
})
// rs.pipe(ws); // 也能复制
~~~

## 文件重命名/移动

~~~js
const fs = require('fs');

1. 调用 rename 方法
fs.rename(oldPath, newPath, callback);	// 异步
fs.rename('./座右铭.txt', './论语.txt', err =>{
  if( err ) {
    console.log('重命名/移动失败');
    return
  }
  console.log('重命名/移动成功')
})

fs.renameSync(oldPath,newPath);	//	同步
~~~

## 文件删除

~~~js
const fs = require('fs');
----------------------------------------------------------------------------
// 调用 unlink 方法
fs.unlink(path, callback);	// 同步方法 fs.unlinkSync(path);
fs.unlink('./观书有感.txt', err => {
  // ...
})
----------------------------------------------------------------------------
// 调用 rm
fs.rm(path, callback);	// 同步方法 fs.rmSync(path);
fs.rm('./观书有感.txt', err => {
  // ...
})
~~~

## 文件夹

~~~js
const fs = require('fs');
----------------------------------------------------------------------------
// 创建文件夹
fs.mkdir(path[, options], callback);		// 异步
fs.mkdirSync(path[, options], callback);	// 同步
fs.mkdir('./html', err => {
})
// 递归创建
// recursive: true
fs.mkdir('./a/b/c', {recursive: true}, err => {
})
----------------------------------------------------------------------------
// 读取文件夹
fs.readdir(path, callback);
fs.readdir('../资料', (err, data) => {
  if ( err ) {
  	return
  }
  console.log(data);	// 以数组形式返回文件夹里的文件名称
})
----------------------------------------------------------------------------
// 删除文件夹
fs.rmdir(path, callback);
fs.rmdir('./html', err => {
});
// 递归删除
// recursive: true
fs.rmdir('./html', {recursive: true}, err => {
})
// 建议使用
fs.rm('./html', {recursive: true}, err => {
})
~~~

## 查看资源状态

~~~js
const fs = require('fs');
----------------------------------------------------------------------------
// 
fs.stat(path, callback);
fs.stat('./笑看风云.mp4', (err, data) => {
  if(err){
    return
  }
  console.log(data);
  // size	文件大小
  // birthtime	文件创建时间
  // atiem	最后访问时间
  // mtime	最后修改时间
  // ctime	最后修改文件状态时间
    
  console.log(data.isFile()); // 查看是否是文件
  console.log(data.isDirectory); // 查看是否是文件夹
})
~~~

## 路径

~~~js
// 相对路径
./	本文件夹(可省略)
../	上一级
// 绝对路径
D:...
----------------------------------------------------------------------------
// 相对路径的 BUG
const fs = require('fs');
fs.writeFileSync('./index.html', 'love');
// fs 模块中的相对路径参照的是 命令行 的路径，而不是当前 js 文件的路径
----------------------------------------------------------------------------
// 绝对路径 '全局变量 __dirname'
// __dirname: 表示所在文件的所在目录的绝对路径
fs.writeFileSync(__dirname + '/index.html', 'love');
~~~

## 练习------批量重命名

~~~js
const fs = require('fs');

const files = fs.readdirSync('./code');
files.forEach(item => {
  let [num,name] = item.split('-');
  if (Number(num) < 10) {
    num = '0' + num; 
  }
  let newName = num + '-' + name;
  fs.renameSync(`./code${item}`, `./code/${newName}`)
})
~~~