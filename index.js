const express = require('express')
const app = express()
const favicon = require('serve-favicon')

const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// 路由
require('./route')(app,express)

// 连接数据库
const db = require('./connect')
//用户获取博客
require('./serverBlogs/getBlogsInfo')(app,db)
//编写博客信息
require('./serverBlogs/setBlogsInfo')(app,db)
//网盘
require('./tools/wangpan')(app,db)

const port = 5000
app.listen(port,(err) => {
  if(err) throw err
  console.log(`server running in ${port}`)
})