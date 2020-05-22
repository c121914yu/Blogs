const express = require('express')
const app = express()

const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 路由
require('./route')(app,express)

// 连接数据库
const db = require('./connect')
// 用户系统
require("./tools/user.js")(app,db)
//用户获取博客
require('./serverBlogs/getBlogsInfo')(app,db)
//编写博客信息
require('./serverBlogs/setBlogsInfo')(app,db)
// 后台管理系统
require('./tools/blogsManage.js')(app,db)
//网盘
require('./tools/wangpan')(app,db)
//任务列表
require('./tools/taskList')(app,db)
// 记账本
require("./tools/tallyBook.js")(app,db)

const port = 5000
app.listen(port,(err) => {
  if(err) throw err
  console.log(`server running in ${port}`)
})