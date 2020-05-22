var timer,time=0
const loading = document.querySelector(".loading")
const Axios = axios.create({
	baseURL : "http://localhost:5000/"
})
//请求拦截 每次请求开始都会执行一次
Axios.interceptors.request.use(
	res => {
		loading.style.display = "flex"
		return res
	},
	err => {
		return Promise.reject(err)
	}
)
//响应拦截 收到响应后统一处理
Axios.interceptors.response.use(
	res => {
		loading.style.display = "none"
		return res
	},
	err => {
		loading.style.display = "none"
    vant.Toast({
    	message: "服务器错误",
    	icon: "cross",
    	duration: 1500,
    	closeOnClick: true
    })
    return Promise.reject(err);
	}
)

new Vue({
	el: '#app',
	data: {
		time: 0,
		loginInfo: {
			name: "",
			email: "",
			password: "",
			random_code: ""
		},
		sure_password: "",
		navClass: "in",
		user: "",
		httpDay: 0,
		allData: false,
		statistics_nav: [
			{text:"今天",param:"count_day"},
			{text:"本周",param:"count_week"},
			{text:"本月",param:"count_month"},
			{text:"今年",param:"count_year"},
			{text:"累计",param:"count_all"}
		],
		current_statistics: 0,
		show_mask: false,
		show_detail: false,
		detail_record: {}
	},
	watch:{
		navClass: "loginChange",
		current_statistics: "statistics_change"
	},
	methods:{
		showToast(type,text,time=1000){
			vant.Toast({
				message: text,
				icon: type,
				duration: time,
				closeOnClick: true
			})
		},
		loginChange(){
			this.loginInfo = {
				name: "",
				email: "",
				password: "",
				random_code: ""
			}
			this.sure_password = ""
		},
		closeMask(){
			this.show_mask = false
			this.show_detail = false
		},
		get_randomCode(e){
			e.preventDefault()
			if(this.time > 0) return
			const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
			if(this.loginInfo.email === "")
				this.showToast("fail","邮箱不能为空")
			else if(!reg.test(this.loginInfo.email))
				this.showToast("fail","邮箱格式错误")
			else{
				this.time = 10
				timer = setInterval(() => {
					this.time--
					if(this.time <= 0)
						clearInterval(timer)
				},1000)
				this.showToast("success","验证码已发送")
				Axios.get("api/getRandom?email="+this.loginInfo.email)
			}
				
		},
		login(e){
			e.preventDefault()
			const reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
			if(this.loginInfo.email === "")
				this.showToast("fail","邮箱不能为空")
			else if(!reg.test(this.loginInfo.email))
				this.showToast("fail","邮箱格式错误")
			else if(this.loginInfo.password === "")
				this.showToast("fail","密码不能为空")
			else if(this.navClass != "in" && this.sure_password != this.loginInfo.password)
				this.showToast("fail","两次密码不一致")
			else if(this.navClass != "in" && this.loginInfo.random_code === "")
				this.showToast("fail","验证码不能为空")
			else if(this.navClass === "register" && this.loginInfo.name === "")
			this.showToast("fail","名称不能为空")
			else
				Axios.post("api/"+this.navClass,this.loginInfo)
				.then(res => {
					if(res.data.code === 200){
						this.showToast("success","success")
						if(this.navClass != "in")
							this.navClass = "in"
						else{
							let data = {
								email: this.loginInfo.email,
								id: res.data.id,
								name: res.data.name
							}
							localStorage.setItem("user",JSON.stringify(data))
							this.getUserInfo(data)
						}
					}
					else
						this.showToast("cross",res.data.err_message)
				})
		},
		
		joinRecord(record){
			// 查询同一天记录
			let date = new Date(record.date)
			let dateText = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
			let userRecord = this.user.records.find(item => item.date === dateText)
			if(userRecord){
				userRecord.data.unshift(record)
				userRecord.money += record.money
				userRecord.data.sort((a,b) => {
					let Adate = new Date(a.date).getTime()
					let Bdate = new Date(b.date).getTime()
					return Bdate - Adate
				})
			}
			else{
				const recordList = {
					date: dateText,
					money: +record.money,
					show: false,
					data: [record]
				}
				this.user.records.unshift(recordList)
				// 排序
				this.user.records.sort((a,b) => {
					let Adate = new Date(a.date).getTime()
					let Bdate = new Date(b.date).getTime()
					return Bdate - Adate
				})
			}
			this.count_day()
		},
		getUserInfo(data){
			this.user = {
				name: data.name,
				id: data.id,
				records: [],
				count_day: {
					expend: 0,
					income: 0
				},
				count_week: {
					expend: 0,
					income: 0,
					data: []
				},
				count_month: {
					expend: 0,
					income: 0,
					data: []
				},
				count_year: {
					expend: 0,
					income: 0,
					data: []
				},
				count_all: {
					expend: 0,
					income: 0
				}
			}
			this.getRecord()
		},
		getRecord(){
			if(this.allData) return
			Axios.get(`api/getRecord?id=${this.user.id}&day=${this.httpDay}`)
			.then(res => {
				if(res.data.code === 200){
					if(res.data.day === this.httpDay)
						this.allData = true
					this.httpDay = res.data.day
					if(res.data.data.length === 0)
						this.getRecord()
					res.data.data.forEach(record => {
						record.show = false
						this.joinRecord(record)
					})
				}
			})
		},
		addRecord(){
			this.detail_record = {
				title: "新纪录",
				oneText: "添加",
				oneFun: this.sure_addRecord,
				twoText: "取消",
				twoFun: this.closeMask,
				content: "",
				money: "-",
			}
			this.show_detail = true
			this.show_mask = true
		},
		sure_addRecord(){
			if(this.detail_record.content === ""){
				this.showToast("fail","内容不能为空")
				return
			}
			else if(this.detail_record.money === ""){
				this.showToast("fail","金额不能为空")
				return
			}
			else if(isNaN(+this.detail_record.money)){
				this.showToast("fail","金额格式错误")
				return
			}
			const record = {
				userID: this.user.id,
				content: this.detail_record.content,
				money: +this.detail_record.money,
				date: new Date()
			}
			const dateText = `${record.date.getFullYear()}/${record.date.getMonth()+1}/${record.date.getDate()}`
			Axios.post("/api/addRecord",record)
			.then(res => {
				if(res.data.code === 200){
					record.id = res.data.id
					record.date = dateText
					record.show = false
					this.joinRecord(record)
					this.closeMask()
				}
			})
		},
		show_record_detail(item,index1,index2){
			let oldRecord = {
				content: item.content,
				money: +item.money,
			}
			const change_record = () => {
				let newRecord = {
					content: this.detail_record.content,
					money: +this.detail_record.money ,
				}
				if(newRecord.content != oldRecord.content || newRecord.money != oldRecord.money){
					vant.Dialog.confirm({
					  title: '提示',
					  message: '记录存在修改，确认改动?',
						confirmButtonColor: "#5ad8a6"
					})
					.then(() => {
						Axios.post("api/changeRecord",{
							id: this.user.records[index1].data[index2].id,
							...newRecord
						})
						.then(res => {
							if(res.data.code === 200){
								this.user.records[index1].money -= this.user.records[index1].data[index2].money
								this.user.records[index1].money += +this.detail_record.money
								this.user.records[index1].data[index2].content = newRecord.content
								this.user.records[index1].data[index2].money = newRecord.money
								this.showToast("success","修改成功")
							}
							else
								this.showToast("cross","未知错误")
							this.closeMask()
						})
					})
				}
				else
					this.closeMask()
			}
			const delete_record = () => {
				vant.Dialog.confirm({
				  title: '提示',
				  message: '确认删除该记录?',
					confirmButtonColor: "#e86452"
				})
				.then(() => {
					Axios.get("api/deleteRecord?id="+this.user.records[index1].data[index2].id)
					.then(res => {
						if(res.data.code === 200){
							this.user.records[index1].money -= this.user.records[index1].data[index2].money
							this.user.records[index1].data.splice(index2,1)
							this.showToast("success","删除成功")
						}
						else
							this.showToast("cross","未知错误")
						this.closeMask()
					})
				})
			}
			this.detail_record = {
				title: "历史消费",
				oneText: "确认",
				oneFun: change_record,
				twoText: "删除",
				twoFun: delete_record,
				content: item.content,
				money: +item.money,
			}
			this.show_detail = true
			this.show_mask = true
		},
		statistics_change(){
			switch(this.current_statistics){
				case 1: this.count_week();break;
				case 2: this.count_month();break;
				case 3: this.count_year();break;
			}
		},
		count_firstDay(diff){
			let diffVal = new Date(new Date().toLocaleDateString()) - (diff-1)*24*60*60*1000
			return diffVal
		},
		count_day(){
			let date = new Date()
			let dateText = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
			let userRecord = this.user.records.find(item => item.date === dateText)
			if(userRecord){
				userRecord.data.forEach(item => {
					if(item.money > 0)
						this.user.count_day.income += item.money
					else
						this.user.count_day.expend += item.money
				})
				// 绘图
				let expend=[],income=[]
				userRecord.data.forEach(item => {
					if(item.money > 0)
						income.push([item.content,item.money])
					else
						expend.push([item.content,item.money])
				})
				let option = {
					xAxis: {
						type: "category",
						axisTick: {
							show: false
						},
						axisLabel: {
							show: false
						}
					},
					yAxis: {
						show: false,
						type: "value",
					},
					tooltip: {},
					grid: {
						top: 5,
						left: 0,
						height : "80%",
						width: "100%"
					},
					series: [
						{
							name: "收入",
							type: "bar",
							barWidth: 10,
							label: {
								show: true, //开启显示
								position: 'bottom', //在上方显示
								formatter: (param) => {
									return param.data[1]
								}
							},
							data: income
						},
						{
							name: "支出",
							type: "bar",
							barWidth: 10,
							label: {
								show: true, //开启显示
								position: 'bottom', //在上方显示
								formatter: (param) => {
									return param.data[1]
								}
							},
							data: expend
						}
					]
				}
				// let myChart = echarts.init(document.getElementById('day'))
				// myChart.setOption(option)
			}
		},
		count_week(){
			if(this.user.count_week.data.length > 0) return
			const monday = this.count_firstDay(new Date().getDay())
			let weekArr = []
			let count = () => {
				for(let i=0;i<7;i++){
					let date = new Date(monday + i*24*60*60*1000)
					let dataText = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
					let record = this.user.records.find(record => record.date === dataText)
					this.user.count_week.data.push(record ? record.money : 0)
					if(record)
						record.data.forEach(item => {
							if(item.money > 0)
								this.user.count_week.income += item.money
							else
								this.user.count_week.expend += item.money
						})
				}
			}
			// 获取周1的时间戳
			count()
			console.log(this.user.count_week)
		},
		count_month(){
			if(this.user.count_month.data.length > 0) return
			let firstDay = this.count_firstDay(new Date().getDate())
			let monthArr = []
		},
		count_year(){
			
		}
	},
	computed:{
		randomText(){
			if(this.time >= 10)
				return `${this.time}s后重新获取`
			else if(this.time > 0)
				return `0${this.time}s后重新获取`
			else
				return "获取验证码"
		}
	},
	mounted() {
		loading.style.display = "none"
		document.getElementById("app").style.display = "block"
		const info = JSON.parse(localStorage.getItem("user"))
		if(info){
			Axios.post("api/judgeUser",{
				email: info.email,
				id: info.id
			})
			.then(res => {
				if(res.data.code === 200)
					this.getUserInfo(info)
				else
					this.showToast("cross",res.data.err_message)
			})
		}
	}
})
