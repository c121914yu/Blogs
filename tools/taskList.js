var uuid = require('uuid')
const nodemailer = require('nodemailer')
var numberSet = new Array()
function taskList(app,db){
  app.post('/tools/getTask',(req,res) => {
    const email = req.body.email
    const sql = `select * from taskList where email='${email}'`
    db.query(sql,(err,result) => {
      if(err) throw err
      res.send({
        status : 200,
        tasks : result
      })
    })
  })

  app.post('/tools/addTask',(req,res) => {
    const data = req.body
    const sql = `insert into taskList set?`
    const id = uuid.v1()
    data.id = id
    db.query(sql,data,(err,result) => {
      if(err) throw err
      res.send({
        status : 200,
        id
      })
    })
  })

  app.post('/tools/removeTask',(req,res) => {
    const id = req.body.id
    const sql = `delete from taskList where id='${id}'`
    db.query(sql,(err,result) => {
      if(err) throw err
      res.send({
        status : 200
      })
    })
  })

  app.post('/tools/changeTask',(req,res) => {
    const data = req.body
    const sql = `update taskList set completed=${data.completed} where id='${data.id}'`
    db.query(sql,(err,result) => {
      if(err) throw err
      res.send({
        status : 200
      })
    })
  })
}
module.exports = taskList

