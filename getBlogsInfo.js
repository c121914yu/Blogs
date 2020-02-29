const fs = require('fs')

function getBlogsInfo(app,db){
  app.get('/blogs/getInfo',(req,res) => {
    let result = new Object()
    getBaseInfo()
    .then((data,err) => {
      if(err) throw err
      result = data
      /* 读取数据库中博客列表*/
      const sql = `select * from blogsList`
      db.query(sql,(err,dbres) => {
        if(err) throw err
        result.blogsList = dbres
        res.json(result)
      })
    })
  })

  app.get('/blogs/article/:id',(req,res) => {
    const fileName = Math.floor(req.params.id/1000) + '.md'
    let html = fs.readFileSync(__dirname + '/blogs/' + fileName)
    res.send(html)
  })
}
module.exports = getBlogsInfo

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