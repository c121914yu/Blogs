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

  app.get('/blogs/article',(req,res) => {
    const fileName = req.param('id') + '.md'
    let html = fs.readFileSync(__dirname+'/../blogs/' + fileName,"utf8")
    let comment = JSON.parse(fs.readFileSync(__dirname+"/../jsonData/Lmessage.json","utf8"))
    comment = comment.filter(item => {
      return item.id === req.params.id
    })
    res.send({
      html,
      comment
    })
  })
}
module.exports = getBlogsInfo