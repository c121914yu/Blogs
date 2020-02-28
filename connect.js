const mysql = require('mysql')

const db = mysql.createConnection({
	host:'',
	user: '',
	password: '', // root 密码
	database: '', // 数据库名
	port:3306
})

db.connect((err) => {
	if(err) throw err
	console.log('数据库连接成功')
})


module.exports = db