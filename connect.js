const mysql = require('mysql')

const db = mysql.createConnection({
	host:'49.232.38.113',
	user: 'myBlogs',
	password: '121914yu', // root 密码
	database: 'myBlogs', // 数据库名
	port:3306
})

db.connect((err) => {
	if(err) throw err
	console.log('数据库连接成功')
})


module.exports = db