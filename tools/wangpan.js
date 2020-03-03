var qiniu = require("qiniu");
var user = {
  AK : "oYIp_ibr_Gx0pRf2laF9BYGJVP3kPk0jA3iTXoUe",
  SK : "sX1JclJwmyx9W-HiHNmxqsE5mdtUopB-CbKktjIG"
}

var mac = new qiniu.auth.digest.Mac(user.AK, user.SK);
var config = new qiniu.conf.Config()
var bucketManager = new qiniu.rs.BucketManager(mac, config)

var bucket = "download121914"
var options = {
  limit: 10,
  prefix: ''
}

function wangpan(app,db){
  app.get('/tools/getWangpanFiles',(req,res) => {
    bucketManager.listPrefix(bucket,options,(err, respBody, respInfo) => {
      if(err) throw err
      if(respInfo.statusCode === 200)
        res.send(respBody.items)
      else
        res.send({
          status : 500,
          text : "获取失败"
        })
    })
  })
}

module.exports = wangpan