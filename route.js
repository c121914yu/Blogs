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
  
  app.use(express.static(__dirname+'/static'))
     .use(express.static(__dirname+'/static/dist'))
     .use(express.static(__dirname+'/static/wangpan'))
  //请求界面
  app.get('/', (req,res) => {
    res.sendFile(__dirname + '/static/dist/index.html')
  })

  app.get('/tools/wangpan',(req,res) => {
    res.sendFile(__dirname + '/static/wangpan/index.html')
  })
}
module.exports = route
