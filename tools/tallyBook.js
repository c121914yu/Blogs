var uuid = require('uuid')
function tallyBook(app,db){
	app.get("/api/getRecord",(req,res) => {
		const id = req.query.id
		let day = +req.query.day
		if(isNaN(day)) 
			day = 0
		// 计算今天 - day 的日期，与今天 - day -7之间的记录
		let startDate = new Date(new Date() - (7+day)*24*60*60*1000)
		startDate = `${startDate.getFullYear()}/${startDate.getMonth()+1}/${startDate.getDate()}`
		let endDate = new Date(new Date() - day*24*60*60*1000)
		endDate = `${endDate.getFullYear()}/${endDate.getMonth()+1}/${endDate.getDate()} 23:59:59`
		let sql = `select * from tallyBook where 
							 TIMESTAMP(date) >= '${startDate}' 
							 and TIMESTAMP(date) <= '${endDate}' 
							 and userID = '${id}'
							`
		db.query(sql,(err,result) => {
			if(err) throw err
			res.send({
				code: 200,
				data: result,
				day: result.length === 0 ? day : day+ 7
			})
		})
	})
	app.post("/api/addRecord",(req,res) => {
		const data = req.body
		data.id = uuid.v1()
		const sql = "insert into tallyBook set?"
		db.query(sql,data,(err,result) => {
			if(err) throw err
			res.send({
				code: 200,
				id: data.id
			})
		})
	})
	app.post("/api/changeRecord",(req,res) => {
		const data = req.body
		let sql = `update tallyBook set 
							 content='${data.content}',money=${data.money}
							 where id='${data.id}'
							`
		db.query(sql,(err,result) => {
			if(err) throw err
			res.send({
				code: 200
			})
		})
	})
	app.get("/api/deleteRecord",(req,res) => {
		const id = req.query.id
		let sql = `delete from tallyBook where id='${id}'`
		db.query(sql,(err,result) => {
			if(err) throw err 
			res.send({
				code: 200
			})
		})
	})
}
module.exports = tallyBook