var uuid = require('uuid')
const nodemailer = require('nodemailer')
var numberSet = new Array()
function taskList(app,db){
  app.post('/tools/judgeLogin',(req,res) => {
    const data = req.body
    const sql = `select * from user where email='${data.email}'`
    db.query(sql,(err,result) => {
      if(err) throw err
      if(data.id != result[0].id)
        sendErr(res,'登录信息已过期')
      else
        res.send({
          status : 200
        })
    })
  })
  
  app.post('/tools/login',(req,res) => {
    const data = req.body
    let sql = `select * from user where email='${data.email}'`
    db.query(sql,(err,result) => {
      if(err) throw err
      if(result.length === 0)
        sendErr(res,'用户不存在')
      else if(result[0].password != data.password)
        sendErr(res,'密码错误')
      else
        res.send({
          status : 200,
          id : result[0].id
        })
    })
  })
  
  app.post('/tools/findPsw',(req,res) => {
    const data = req.body
    const numbers = numberSet.find(item => item.email === data.email)
    if(!numbers)
      sendErr(res,'请先发送验证码')
    else if(numbers.rand != data.rand)
      sendErr(res,'验证码错误')
    else{
      let sql = `select * from user where email='${data.email}'`
      db.query(sql,(err,result) => {
        if(err) throw err
        if(result.length === 0)
          sendErr(res,'用户不存在')
        else{
          const id = uuid.v1()
          sql = `
                  update user set 
                  password='${data.password}',id='${id}'
                  where email='${data.email}'
                `
          db.query(sql,(err,result) => {
            if(err) throw err
            spliceNumbers(data.email)
            res.send({
              status : 200,
              id
            })
          })
        }
      })
    }
  })
  
  app.post('/tools/register',(req,res) => {
    const data = req.body
    const numbers = numberSet.find(item => item.email === data.email)
    if(!numbers)
      sendErr(res,'请先发送验证码')
    else if(numbers.rand != data.rand)
      sendErr(res,'验证码错误')
    else{
      let sql = `select * from user where email='${data.email}'`
      db.query(sql,(err,result) => {
        if(err) throw err
        if(result.length != 0)
          sendErr(res,'账号已存在')
        else{
          sql = `insert into user set?`
          data.id = uuid.v1()
          delete data.rand
          db.query(sql,data,(err,result) => {
            if(err) throw err
            spliceNumbers(data.email)
            res.send({
              status : 200,
              id : data.id
            })
          })
        }
      })
    }
  })
  
  app.post('/tools/getRand',(req,res) => {
    const email = req.body.email
    let rand = ""
    for(let i=0;i<6;i++)
      rand += Math.floor(Math.random()*9.9)
    const number = numberSet.find(item => item.email === email)
    if(!number)
      numberSet.push({
        email,
        rand
      })
    else
      numberSet.find(item => {
        if(item.email === email)
          item.rand = rand
        return item.email === email
      })
    setTimeout(() => {
      spliceNumbers(email)
    },60000)
    sendEmail(email,rand)
    res.send({
      status : 200
    })
  })

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

function sendErr(res,err){
  res.send({
    status : 500,
    err
  })
}
function spliceNumbers(email){
  let index
  numberSet.find((item,i) => {
    if(item.email === email)
      index = i
    return item.email === email
  })
  numberSet.splice(index,1)
}
function sendEmail(email,rand){
  let transporter = nodemailer.createTransport({
    host:'smtp.qq.com',
    //开启安全连接
    secure:false,
    auth:{
      user:'2979223533@qq.com',
      pass:'hlrfpzawvuzadcfe'
    }
  })
  
  let mailOptions = {
    from:'2979223533@qq.com',
    to:email,
    subject:'验证码接受',
    text : "验证码为：" + rand
  }
  transporter.sendMail(mailOptions,(error,info) => {
    if(error)	throw console.err(error)
  })
}