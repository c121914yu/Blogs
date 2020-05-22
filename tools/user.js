var uuid = require('uuid')
const nodemailer = require('nodemailer')
var numberSet = new Array()

function userCtr(app,db){
	app.post("/api/judgeUser",(req,res) => {
		const data = req.body
		const sql = `select * from user where email='${data.email}'`
		db.query(sql,(err,result) => {
		  if(err) throw err
		  if(data.id != result[0].id)
		    sendErr(res,510,'登录信息已过期')
		  else
		    res.send({
		      code : 200
		    })
		})
	})
	app.post('/api/in',(req,res) => {
	  const data = req.body
	  let sql = `select * from user where email='${data.email}'`
	  db.query(sql,(err,result) => {
	    if(err) throw err
	    if(result.length === 0)
	      sendErr(res,512,'用户不存在')
	    else if(result[0].password != data.password)
	      sendErr(res,513,'密码错误')
	    else
	      res.send({
	        code : 200,
					name: result[0].name,
	        id : result[0].id
	      })
	  })
	})
	app.post("/api/findPsw",(req,res) => {
		const data = req.body
		const numbers = numberSet.find(item => item.email === data.email)
		if(!numbers)
		  sendErr(res,520,'请先发送验证码')
		else if(numbers.random_code != data.random_code)
		  sendErr(res,521,'验证码错误')
		else{
		  let sql = `select * from user where email='${data.email}'`
		  db.query(sql,(err,result) => {
		    if(err) throw err
		    if(result.length === 0)
		      sendErr(res,512,'用户不存在')
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
		          code : 200,
		          id
		        })
		      })
		    }
		  })
		}
	})
	app.post("/api/register",(req,res) => {
		const data = req.body
		const numbers = numberSet.find(item => item.email === data.email)
		if(!numbers)
		  sendErr(res,520,'请先发送验证码')
		else if(numbers.random_code != data.random_code)
		  sendErr(res,521,'验证码错误')
		else{
		  let sql = `select * from user where email='${data.email}'`
		  db.query(sql,(err,result) => {
		    if(err) throw err
		    if(result.length != 0)
		      sendErr(res,511,'账号已存在')
		    else{
		      sql = `insert into user set?`
		      data.id = uuid.v1()
		      delete data.random_code
		      db.query(sql,data,(err,result) => {
		        if(err) throw err
		        spliceNumbers(data.email)
		        res.send({
		          code : 200,
		          id : data.id
		        })
		      })
		    }
		  })
		}
	})
	app.get("/api/getRandom",(req,res) => {
	  const email = req.query.email
	  let random_code = ""
	  for(let i=0;i<6;i++)
	    random_code += Math.floor(Math.random()*9.9)
	  const number = numberSet.find(item => item.email === email)
	  if(!number)
	    numberSet.push({
	      email,
	      random_code
	    })
	  else
	    numberSet.find(item => {
	      if(item.email === email)
	        item.random_code = random_code
	      return item.email === email
	    })
	  setTimeout(() => {
	    spliceNumbers(email)
	  },60000)
	  sendEmail(email,random_code)
	  res.send({
	    code : random_code
	  })
	})
}

module.exports = userCtr

function sendErr(res,code,err_message){
  res.send({
    code,
    err_message
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
function sendEmail(email,random_code){
  let transporter = nodemailer.createTransport({
    host:'smtp.qq.com',
    //开启安全连接
    secure:false,
    auth:{
      user:'2979223533@qq.com',
      pass:'opxzzrkgbwebdehb'
    }
  })
  
  let mailOptions = {
    from:'2979223533@qq.com',
    to:email,
    subject:'验证码接受',
    text : "验证码为：" + random_code
  }
  transporter.sendMail(mailOptions,(error,info) => {
    if(error)	 
			console.error("邮箱不存在")
  })
}