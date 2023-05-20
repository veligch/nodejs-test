const fs = require('fs');

fs.readdir(__dirname, (err, data) => {
  if (err) {
    return
  }

  // 匹配文件类型
  const verify = /.js$/i;

  // 得到相同类型的文件名数组
  const jsFileArr = data.filter(item => verify.test(item));

  // 数组遍历
  jsFileArr.forEach(item => {
    let [num, name] = item.split('_');

    if (Number(num) < 10) {
      if (num[0] === '0') {
        return
      }
      num = '0' + num + '_';
    } else {
      num = num + '_';
    }

    const newName = num + name;


    console.log("旧名字：" + __dirname + `/${item}`);
    console.log("新名字：" + __dirname + `/${newName}`);

    // 文件改名
    // fs.rename(__dirname + `/${item}`, __dirname + `/${newName}`, (err) => {
    //   if (err) {
    //     console.log(err)
    //   }
    // })
  })
})