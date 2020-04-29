var history = require('connect-history-api-fallback')  //解决history模式刷新找不到界面
function route(app,express){
  //重定向
  app.use(history({
    rewrites: [
      { 
        from: /^\/blogs\/.*$/, 
        to: function(context) {
          return context.parsedUrl.path
        }
      },
      {
        from: /^\/tools\/.*$/, 
        to: function(context) {
          return context.parsedUrl.path
        }
      },
    ]
  }))
  
  /* 跨域配置 */
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Max-Age',1728000);//预请求缓存20天
    next();  
  });
  
  
  // //请求界面
	app.use(express.static(__dirname+'/static/dist'))
  app.get('/', (req,res) => {
    res.sendFile(__dirname + '/static/dist/index.html')
  })
	
	// 后台管理系统
	app.use(express.static(__dirname+'/static/manager'))
	app.get('/tools/manager', (req,res) => {
	  res.sendFile(__dirname + '/static/manager/index.html')
	})

  //网盘
  app.use(express.static(__dirname+'/static/wangpan'))
  app.get('/tools/wangpan',(req,res) => {
    res.sendFile(__dirname + '/static/wangpan/wangpan.html')
  })
  
  //任务列表
  app.use(express.static(__dirname+'/static/taskList'))
  app.get('/tools/task',(req,res) => {
    res.sendFile(__dirname + '/static/taskList/task.html')
  })
	
	// 词汇表
	app.use(express.static(__dirname+'/static/wordTable'))
	app.get('/tools/wordTable',(req,res) => {
	  res.sendFile(__dirname + '/static/wordTable/wordTable.html')
	})
}
module.exports = route
