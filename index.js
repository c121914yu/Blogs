const express = require('express')
const app = express()
const favicon = require('serve-favicon')

const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//解决history模式刷新找不到界面
var history = require('connect-history-api-fallback')
//重定向
app.use(history({
  rewrites: [
    { 
      from: /^\/blogs\/.*$/, 
      to: function(context) {
        return context.parsedUrl.path
      }
    },
  ]
}))

require('./route')(app,express)

const db = require('./connect')

//用户获取博客
require('./getBlogsInfo')(app,db)

//编写博客信息
require('./setBlogsInfo')(app,db)

const port = 5000
app.listen(port,(err) => {
  if(err) throw err
  console.log(`server running in ${port}`)
})