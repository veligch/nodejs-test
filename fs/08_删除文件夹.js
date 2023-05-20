const fs = require('fs');

fs.rmdir('./a',{recursive:true},err=>{
  console.log('删除成功')
})