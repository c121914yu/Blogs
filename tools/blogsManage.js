const fs = require("fs")
const schedule = require('node-schedule')

module.exports = function(app,db){
	// 定时任务
	timePlan(db)
	// 登录
	app.post('/tools/managerLogin',(req,res) => {
		const password = req.body.password
		if(password == "121914yu")
			res.send('success')
		else
			res.status(501).send("密码错误")
	})
	
	// 获取信息
	app.get('/tools/getInfo',(req,res) => {
	  //读取json文件数据
	  let json = JSON.parse(fs.readFileSync(__dirname+"/../jsonData/baseInfo.json",'utf8'))
	  let sql = `select * from statistics`
	  db.query(sql,(err,result) => {
	    if(err) throw err
	    json.statistics = result
	    res.send(json)
	  })
	})
	
	// 设置个人资料
	app.post('/tools/setMyInfo',(req,res) => {
		const data = req.body
		let json = JSON.parse(fs.readFileSync(__dirname+"/../jsonData/baseInfo.json",'utf8'))
		json.name = data.name
		json.email = data.email
		json.github = data.github
		json = JSON.stringify(json,"","\t")
		fs.writeFileSync(__dirname+'/../jsonData/baseInfo.json',json)
		res.send(data)
	})
}

function timePlan(db){
	schedule.scheduleJob('1 0 0 * * *',() => {//每天0点1秒增加当天记录
		const sql = 'insert into statistics set?'
		let date = new Date()
		date = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
		let json = JSON.parse(fs.readFileSync(__dirname+"/../jsonData/baseInfo.json",'utf8'))
		const data = {
			date,
			blogs : json.article
		}
		db.query(sql,data,(err,result) => {
			if(err) throw err
			console.log("new day")
		})
	})
}