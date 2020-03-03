new Vue({
  el: '#app',
  data: {
    files : [],
    path : ['File'],
    searchFile : ""
  },
  created() {
    axios.get('http://www.jinlongyuchitang.cn/tools/getWangpanFiles')
    .then(res => {
      let data = new Array()
      res.data.forEach(item => {
        const keySplit = item.key.split('/')
        data.push({
          url : "http://load.jinlongyuchitang.cn/" + item.key + '?attname=',
          key : item.key,
          name : keySplit[keySplit.length-1],
          size : this.renderSize(item.fsize),
          type : item.mimeType,
          icon : "icon-picture",
          keySplit : this.path.concat(keySplit)
        })
      })
      this.files = data
    })
  },
  computed:{
    currentFiles(){
      //筛选当前路径
       let data = this.files.filter(item => {
         const reg = new RegExp(`^${this.path[this.path.length-1]}`,'gi')
         return reg.test(item.keySplit[this.path.length-1])
       })
      //去重
       let savePath = []
       data = data.filter(item => {
         if(savePath.indexOf(item.keySplit[this.path.length]) === -1){
           savePath.push(item.keySplit[this.path.length])
           return true
         }
         else if(item.keySplit[this.path.length] === item.name)
             return true
         else
           return false
       })
       return data
    },
    searchResult(){
      let data = this.files.filter(item => {
        const reg = new RegExp(`${this.searchFile}`,'gi')
        return reg.test(item.name)
      })
      console.log(data)
      return data
    }
  },
  methods:{
    inDir(name){
      this.path.push(name)
    },
    back(){
      this.path.splice(-1,1)
    },
    navPath(index){
      this.path.splice(index+1,this.path.length-index-1)
    },
    renderSize(value){//格式化文件大小
      if(null === value || value === '')
          return "0 Bytes"
      var unitArr = new Array("Bytes","KB","MB","GB","TB","PB","EB","ZB","YB")
      var index = 0
      srcsize = parseFloat(value)
      index = Math.floor(Math.log(srcsize)/Math.log(1024))
      var size = srcsize/Math.pow(1024,index)
      //保留的小数位数
      size = size.toFixed(2)
      return size + unitArr[index]
    }
  }
})

