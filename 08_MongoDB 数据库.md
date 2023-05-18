# MongoDB

## 数据库命令

查看数据库

~~~sql
show dbs
~~~

切换数据库，不存在则创建数据库

~~~sql
use dbname
~~~

显示当前所在的数据库

~~~sql
db	
~~~

删除当前数据库

~~~sql
use dbname
db.dropDatabase
~~~



## 集合命令

创建集合

~~~sql
db.createCollection('<collectionName>')
~~~

显示当前数据库中的所有集合

~~~sql
show collections
~~~

删除某个集合

~~~sql
db.<collectionName>.drop()
~~~

重命名集合

~~~sql
db.<collectionName>.renameCollection('newName')
~~~



## 文档命令

插入文档

~~~sql
db.<collectionName>.insert(obj)
~~~

查询文档

~~~sql
db.<collectionName>.find(条件)
~~~

更新文档

~~~sql
/* 全部更新 */
db.<collectionName>.update(条件, 新的文档)

/* 更新某字段 */
db.<collectionName>.update(条件, {$set:修改的文档对象)
~~~

删除文档

~~~sql
db.<collectionName>.remove(条件)
~~~



## Mongoose

### 安装

~~~sh
npm i mongoose
~~~

### 使用

~~~js
// 导入
const mongoose = require('mongoose');

// 连接 mongodb
mongoose.connect('mongodb://127.0.0.1:27017/dbname')

// 设置回调
mongoose.connection.once('open', () => {
  // 连接成功的回调
})
mongoose.connection.on('error', () => {
  // 连接失败的回调
})
mongoose.connection.on('close', () => {
  // 连接关闭的回调
})

// 关闭 mongodb 连接
setTimeout(() => {
  mongoose.disconnect();
})
~~~

### 插入文档

~~~js
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/dbname')

mongoose.connection.once('open', () => {
  // 创建文档的结构对象，约束集合中文档的属性和属性值的类型
  let BookSchema = new mongoose.Schema({
    name: String,
    author: String,
    price: Number
  });
  
  // 创建模型对象，对文档操作的封装对象
  // books 集合名称
  // 结构对象
  let BookModel = mongoose.model('books', BookSchema)
  
  // 新增
  BookModel.create({
    name: '西游记',
    author: '吴承恩',
    price: 19.9
  }, (err, data) => {
    if(err){
      console.log(err)
      return
    }
    // 如果没有出错，则输出插入的文档对象
    console.log(data);
    
    // 项目运行过程不会运行
    // mongoose.disconnect();
  })
})
mongoose.connection.once('error', () => {
})
mongoose.connection.once('close', () => {
})
~~~

### 字段类型

| 类型       | 描述                                                     |
| ---------- | -------------------------------------------------------- |
| String     | 字符串                                                   |
| Number     | 数字                                                     |
| Boolean    | 布尔值                                                   |
| Array      | 数组，也可以用 [] 来标识                                 |
| Date       | 日期                                                     |
| Buffer     | Buffer 对象                                              |
| Mixed      | 任意类型，需要使用 mongoose.Schema.Type.Mixed指定        |
| ObjectId   | 对象ID，需要使用 mongoose.Schema.Type.ObjectId指定       |
| Decimal128 | 高精度数字，需要使用 mongoose.Schema.Type.Decimal128指定 |

### 字段值验证

~~~js
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/dbname')

mongoose.connection.once('open', () => {
  let BookSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true, // 必填
      default：'西游记',	// 默认值
      unique: true	// 唯一值，必须重建集合才生效
    },
    author: String,
    style:{
      type: String,
      enum: ['志怪', '城市', '言情', '恐怖']	// 枚举
    }
    price: Number,
  });
  
  let BookModel = mongoose.model('books', BookSchema)

  BookModel.create({
    name: '西游记',
    author: '吴承恩',
    price: 19.9
  }, (err, data) => {
    if(err){
      console.log(err)
      return
    }
    console.log(data);
  })
})
~~~

### 删除文档

~~~js
// 删除一条
BookModel.deleteOne({ _id : 123 }, (err, data) => {
  if(err){
    console.log(err)
    return
  }
  console.log(data);
})

// 批量删除
BookModel.deleteMany({ is_hot : false }, (err, data) => {
  if(err){
    console.log(err)
    return
  }
  console.log(data);
})
~~~

### 更新文档

~~~js
// 更新一条
// 更新红楼梦的价格
BookModel.updateOne({ name : '红楼梦' }, { price : 9.9 }, (err, data) => {
  if(err){
    console.log(err)
    return
  }
  console.log(data);
})

// 批量更新
BookModel.updateMany({author : '玉华'}, {is_hot : true}, (err, data) => {
  if(err){
    console.log(err)
    return
  }
  console.log(data);
})
~~~

### 读取文档

~~~js
// 读取一条
// 也可以用BookModel.findById(id, (err, data) => {})
BookModel.findOne({ name : '狂飙' }, (err, data) => {
  if(err){
    console.log(err)
    return
  }
  console.log(data);
})

// 读取更新
BookModel.find({author : '玉华'}, (err, data) => {
  if(err){
    console.log(err)
    return
  }
  console.log(data);
})
~~~

### 条件控制

运算符

| 运算符 | 替代符 |
| ------ | ------ |
| >      | $gt    |
| <      | $lt    |
| >=     | $gte   |
| <=     | $lte   |
| !==    | $ne    |

~~~js
// 查询 price 小于 20 的文档
BookModel.find({price : {$lt:20}}, (err, data) => {
  if(err){
    console.log(err)
    return
  }
  console.log(data);
})
~~~

逻辑运算符

| 运算符 | 替代符 |
| ------ | ------ |
| 或     | $or    |
| 且     | $and   |

~~~js
// 逻辑或
BookModel.find({
  $or : [
    {author:'曹雪芹'},
    {author:'余华'}
  ]}, (err, data) => {
  if(err){
    console.log(err)
    return
  }
  console.log(data);
})
~~~

正则匹配

~~~js
// 查询书名带三的文档
// new RegExp('三') 和 /三/ 可以替换
BookModel.find({name:/三/}, (err, data) => {
  if(err){
    console.log(err)
    return
  }
  console.log(data);
})
~~~



## 个性化读取

### 字段筛选

~~~js
// 只返回 name 和 author 字段
// 1 : 返回字段	0 ：忽略字段
BookModel.find().select({name:1,author:1,_id:0}).exec((err, data)=>{
  
})
~~~

### 数据排序

~~~js
// 1 : 升序   -1 ：倒序
BookModel.find().sort({price:1}).exec((err, data)=>{
  
})
~~~

### 数据截取

~~~js
// limit(3) : 截取3 条
// skip(10) : 跨过 10 条开始截取，用于分页
BookModel.find().sort({price:1}).limit(3).exec((err, data)=>{
  
})
~~~



## mongoose 模块化

~~~js
// /db/db.js

~~~

