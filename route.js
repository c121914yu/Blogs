function route(app,express){
  /* 跨域配置 */
  app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-type');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS,PATCH");
    res.header('Access-Control-Max-Age',1728000);//预请求缓存20天
    next();  
  });
  
  //请求界面
  app.use(express.static(__dirname+'/static'))
  app.use(express.static(__dirname+'/static/dist'))
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/static/dist/index.html')
  })
  
  //访问图片
  app.get('/img/:name',(req,res) => {
    const name = req.params.name
    const rs = fs.createReadStream(`${__dirname}/static/img/${name}`) //获取图片的文件名
    rs.pipe(res)
  })
}
module.exports = route
