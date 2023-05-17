## url 模块

~~~js
const url = require('url');

// 解析
let urlObj = url.parse('/login?key=123',true);
console.log(urlObj.pathname);	// /login
console.log(urlObj.query);	// {key : 123}
~~~

