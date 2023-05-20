const url = require('url');

const urlStr1 = '/login?wd=123&pd=456'
const urlStr2 = 'https://localhost:3000/login?wd=123&pd=456'
const urlStr3 = 'https://127.0.0.1:8080/login?wd=123&pd=456'
// 解析 url
console.log(url.parse(urlStr1));
console.log(url.parse(urlStr2));
console.log(url.parse(urlStr3));

// protocol 协议名
// 