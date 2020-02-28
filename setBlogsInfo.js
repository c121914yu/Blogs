const fs = require("fs")

function setBlogsInfo(app,db){
  app.post('/blogs/addBlogs',(req,res) => {
    const param = req.body
    getBaseInfo()
    .then((blogsInfo,err) => {
      if(err) throw err
      addBlogs(param,blogsInfo,db)//更新json数据
      .then((data,err) => {
        if(err) throw err
        res.send(data)
      })
    })
  })
}
module.exports = setBlogsInfo

function getBaseInfo(){
  return new Promise((resolve,reject) => {
    fs.readFile("./blogsInfo/baseInfo.json",'utf8',(err, data) => {
      if(err)
        reject(err)
      let obj = JSON.parse(data)
      resolve(obj)
    })
  })
}

function addBlogs(param,blogsInfo,db){
  return new Promise((resolve,reject) => {
    /* 更新数据库*/
    param.date = new Date()
    const sql = 'insert into blogsList set ?'
    db.query(sql,param,(err,res) => {
      if(err) reject(err)
      /* 更新json数据*/
      // 更新categeroys的amount 以及标签
      blogsInfo.categeroy.find(item => {
        if(item.text === param.categeroy){
          item.amount++
          switch(item.text){//更新tags
            case "日记":blogsInfo.tags1=updateTags(blogsInfo.tags1,param.tags);break;
            case "游记":blogsInfo.tags2=updateTags(blogsInfo.tags2,param.tags);break;
            case "技术":blogsInfo.tags3=updateTags(blogsInfo.tags3,param.tags);break;
          }
        }
        return item.text === param.categeroy
      })
      blogsInfo.article++//更新总数
      //保存
      let json = JSON.stringify(blogsInfo,"","\t")
      fs.writeFileSync('./blogsInfo/baseInfo.json',json)
      fs.renameSync(__dirname+'/blogs/blogs.md',__dirname+"/blogs/"+Math.floor(new Date(param.date).getTime()/1000)+".md")
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