const fs = require('fs');

// fs.stat('./', (err, data) => {
//   console.log(data)
// })

fs.stat('./xxx.html', (err, data) => {
  console.log(data)
  console.log(__dirname + '/move');
})