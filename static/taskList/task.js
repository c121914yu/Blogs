var user,task,login,findPsw,register,loading,Axios
var timer
new Vue({
  el: '#app',
  data(){
    return{
      time : 0,
      loginInfo : {
        email : "",
        password : "",
        rand : "",
      },
      surePsw : "",
      userInfo : {},
      tasks : [],
      taskContent : ""
    }
  },
  methods:{
    linkTo(e){
      if(e === "findPsw"){
        login.style.transform = "translateX(105%)"
        findPsw.style.transform = "translateX(-100%)"
      }
      else{
        login.style.transform = "translateX(-105%)"
        register.style.transform = "translateX(-200%)"
      }
      this.initData()
    },
    backLogin(e){
      if(e === "findPsw"){
        login.style.transform = "translateX(0)"
        findPsw.style.transform = "translateX(-210%)"
      }
      else{
        login.style.transform = "translateX(0)"
        register.style.transform = "translateX(-90%)"
      }
      this.initData()
    },
    numberSet(type){
      const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if(this.loginInfo.email === "")
        alert('邮箱不能为空')
      else if(!reg.test(this.loginInfo.email))
        alert('邮箱格式错误')
      else if(this.loginInfo.password === "")
        alert('密码不能为空')
      else if(this.surePsw === "" && type != "login")
        alert("请再次输入密码")
      else if(this.surePsw != this.loginInfo.password && type != "login")
        alert("两次密码不一致")
      else if(this.loginInfo.rand === "" && type != "login")
        alert("请输入验证码")
      else{
        Axios.post('/tools/'+type,this.loginInfo)
        .then(res => {
          if(res.data.status === 200){
            this.userInfo = {
              email : this.loginInfo.email,
              id : res.data.id
            }
            localStorage.setItem('userInfo',JSON.stringify(this.userInfo))
            this.initData()
            this.showTask()
          }
        })
      }
    },
    getRand(id){
      if(this.time > 0)
        return
      const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if(this.loginInfo.email === "")
        alert('邮箱不能为空')
      else if(!reg.test(this.loginInfo.email))
        alert('邮箱格式错误')
      else{
        Axios.post('/tools/getRand',{
          email : this.loginInfo.email
        })
        .then(res => {
          if(res.data.status === 200){
            alert('验证码已发送')
            this.time = 30
            document.getElementById(id).style.backgroundColor = "#909090"
            document.getElementById(id).style.cursor = "no-drop"
            timer = setInterval(() => {
              this.time--
              if(this.time <= 0){
                clearInterval(timer)
                document.getElementById(id).style.backgroundColor = "rgba(90,216,166,0.8)"
                document.getElementById(id).style.cursor = "pointer"
              }
            },1000)
          }
        })
      }
    },
    loginOut(){
      localStorage.removeItem('userInfo')
      this.userInfo = {}
      this.initData()
      task.style.display = 'none'
      user.style.display = 'flex'
    },
    initData(){
      this.loginInfo = {
        email : "",
        password : "",
        rand : "",
      }
      this.surePsw = ""
    },
    judgeLogin(){//判断登录
      if(localStorage.key('userInfo')){
        this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
        Axios.post('/tools/judgeLogin',this.userInfo)
        .then(res => {
          if(res.data.status === 200)
            this.showTask()
          else
            localStorage.removeItem('userInfo')
        })
      }
    },
    showTask(){
      Axios.post('/tools/getTask',{
        email : this.userInfo.email
      })
      .then(res => {
        if(res.data.status === 200){
          task.style.display = 'block'
          user.style.display = 'none'
          this.tasks = res.data.tasks
        }
      })
    },
    addTask(){
      if(this.taskContent === "")
        return
      else
        Axios.post('/tools/addTask',{
          email : this.userInfo.email,
          content : this.taskContent
        })
        .then(res => {
          if(res.data.status === 200){
            this.tasks.unshift({
              content : this.taskContent,
              completed : 0,
              id : res.data.id
            })
            this.taskContent = ""
          }
        })
    },
    remove(e){
      let Index
      const task = this.tasks.find((item,index) => {
        if(item.id === e.id)
          Index = index
        return item.id === e.id
      })
      Axios.post('/tools/removeTask',{
        id : task.id
      })
      .then(res => {
        if(res.data.status === 200)
          this.tasks.splice(Index,1)
      })
    },
    changeTask(item,completed){
      Axios.post('/tools/changeTask',{
        id : item.id,
        completed
      })
      .then(res => {
        if(res.data.status === 200){
          this.tasks.find(task => {
            if(task.id === item.id)
              task.completed = completed
          })
        }
      })
    }
  },
  mounted(){
    user = document.querySelector('.user')
    task = document.querySelector('.task')
    login = document.querySelector('.login')
    findPsw = document.querySelector('.findPsw')
    register = document.querySelector('.register')
    loading = document.querySelector('.load')
    //axios配置
    Axios = axios.create({
    	baseURL : "http://49.232.38.113"
    })
    //请求拦截 每次请求开始都会执行一次
    Axios.interceptors.request.use(
    	res => {
    		loading.style.display = 'flex'
    		return res
    	},
    	err => {
        alert('请求错误')
        loading.style.display = 'none'
    		return Promise.reject(err)
    	}
    )
    //响应拦截 收到响应后统一处理
    Axios.interceptors.response.use(
    	res => {
        loading.style.display = 'none'
        if(res.data.status != 200)
          alert(res.data.err)
    		return res
    	},
    	err => {
        alert('服务器错误')
        loading.style.display = 'none'
        return Promise.reject(err);
    	}
    )
    this.initData()
    this.judgeLogin()
  },
  computed:{
    randText(){
      if(this.time <= 0)
        return "获取验证码"
      else{
        if(this.time >= 10)
          return `重新获取${this.time}s`
        else
          return `重新获取0${this.time}s`
      }
    },
    countTask(){
      let completed = 0
      const sum = this.tasks.length
      this.tasks.forEach(item => {
        if(item.completed === 1)
          completed++
      })
      const unfinish = sum - completed
      return [
        {text : "总数",value : sum},
        {text : "待完成",value : unfinish},
        {text : "已完成",value : completed}
      ]
    },
    completedTasks(){
      let tasks = this.tasks.filter(item => {
        return item.completed === 1
      })
      return tasks
    },
    unfinishTasks(){
      let tasks = this.tasks.filter(item => {
        return item.completed === 0
      })
      return tasks
    }
  }
})