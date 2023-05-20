const fs = require('fs');

// 异步读取
fs.readdir('./', (err, data) => {
  console.log(data)
})