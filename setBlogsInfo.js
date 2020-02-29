const fs = require("fs")
const uuid = require('uuid')
function setBlogsInfo(app,db){
  app.post('/blogs/addBlogs',(req,res) => {
    const param = req.body
    let blogsInfo = JSON.parse(fs.readFileSync(__dirname + "/blogsInfo/baseInfo.json",'utf8'))
    addBlogs(param,blogsInfo,db)//更新json数据
    .then((data,err) => {
      if(err) throw err
      res.send(data)
    })
  })
  
  /* 增加阅读量*/
  app.post('/blogs/addReaded/',(req,res) => {
    const data = req.body
    let sql = `select * from blogsList`
    db.query(sql,(err,result) => {
      if(err) throw err
      let blogs = result.find(item => {
        return item.id === data.id
      })
      sql = `update blogsList
             set readed=${++blogs.readed}
             where id='${blogs.id}'
            `
      db.query(sql,(err,result) => {
        if(err) throw err
        res.send(result)
      })
    })
  })
}
module.exports = setBlogsInfo

function addBlogs(param,blogsInfo,db){
  return new Promise((resolve,reject) => {
    /* 更新数据库*/
    param.date = new Date()
    param.id = uuid.v1()
    const sql = 'insert into blogsList set ?'
    db.query(sql,param,(err,res) => {
      if(err) reject(err)
      /* 更新json数据*/
      // 更新categeroys的amount 以及标签
      blogsInfo.categeroy.find(item => {
        if(item.text === param.categeroy){
          item.amount++
          switch(item.text){//更新tags
            case "日记":item.tags=updateTags(item.tags,param.tags);break;
            case "游记":item.tags=updateTags(item.tags,param.tags);break;
            case "技术":item.tags=updateTags(item.tags,param.tags);break;
          }
        }
        return item.text === param.categeroy
      })
      blogsInfo.article++//更新总数
      //保存json文件
      let json = JSON.stringify(blogsInfo,"","\t")
      fs.writeFileSync('./blogsInfo/baseInfo.json',json)
      //修改blogs文件名称
      fs.renameSync(__dirname+'/blogs/blogs.md',__dirname+"/blogs/"+param.id+".md")
      resolve(blogsInfo)
    })
  })
}

function updateTags(tags,param){
  param = param.split(',')
  param.forEach(tag => {
    if(tags.indexOf(tag) === -1)
      tags.push(tag)
  })
  return tags
}