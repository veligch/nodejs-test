function xx1() {
  console.log(1);
}

const xx2 = '哈哈';

// 方式二：
// exports.xx2 = () => {
//   console.log(2)
// };
// 方式一：module.exports 可以暴露任意数据
// 需要暴露多个数据时，可以用对象形式
module.exports = {
  xx1
}

