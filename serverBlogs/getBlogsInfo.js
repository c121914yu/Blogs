const fs = require('fs')

function getBlogsInfo(app,db){
  app.get('/blogs/getInfo',(req,res) => {
    //读取json文件数据
    let result = JSON.parse(fs.readFileSync(__dirname+"/../jsonData/baseInfo.json",'utf8'))
    // 读取数据库中博客列表
    const sql = `select * from blogsList`
    db.query(sql,(err,dbres) => {
      if(err) throw err
      result.blogsList = dbres
      res.json(result)
    })
  })

  app.get('/blogs/article/:id',(req,res) => {
    const fileName = req.params.id + '.md'
    let html = fs.readFileSync(__dirname+'/../blogs/' + fileName)
    res.send(html)
  })
}
module.exports = getBlogsInfo