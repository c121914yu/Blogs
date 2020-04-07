const fs = require("fs")
const schedule = require('node-schedule')

// 七牛配置
var qiniu = require("qiniu");
var user = {
  AK : "oYIp_ibr_Gx0pRf2laF9BYGJVP3kPk0jA3iTXoUe",
  SK : "sX1JclJwmyx9W-HiHNmxqsE5mdtUopB-CbKktjIG"
}
var bucket = "blogs121914"
// 创建mac
var mac = new qiniu.auth.digest.Mac(user.AK, user.SK)
var options = {// 默认有效时间为1h
	scope: bucket,
}
var putPolicy = new qiniu.rs.PutPolicy(options)
var config = new qiniu.conf.Config()
config.zone = qiniu.zone.Zone_z0
var bucketManager = new qiniu.rs.BucketManager(mac, config)

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
	// 获取博客信息
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
	// 获取博客列表
	app.get('/tools/getBlogsList',(req,res) => {
		const sql = `select * from blogsList`
		db.query(sql,(err,result) => {
		  if(err) throw err
		  res.send(result)
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
	// 获取上传token
	app.get('/tools/getUpToken',(req,res) => {
		const uploadToken = putPolicy.uploadToken(mac)
		res.send(uploadToken)
	})
	// 上传新音乐
	app.post('/tools/saveMusic',(req,res) => {
		const data = req.body
		let json = JSON.parse(fs.readFileSync(__dirname+"/../jsonData/baseInfo.json",'utf8'))
		json.music.push(data)
		json = JSON.stringify(json,"","\t")
		fs.writeFileSync(__dirname+'/../jsonData/baseInfo.json',json)
		res.send('success')
	})
	// 删除音乐
	app.post('/tools/deleteMusic',(req,res) => {
		const data = req.body
		bucketManager.delete(bucket, data.key, function(err, respBody, respInfo) {
		  if (err) throw err
		})
		let json = JSON.parse(fs.readFileSync(__dirname+"/../jsonData/baseInfo.json",'utf8'))
		json.music.splice(data.index,1)
		json = JSON.stringify(json,"","\t")
		fs.writeFileSync(__dirname+'/../jsonData/baseInfo.json',json)
		res.send("删除成功")
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