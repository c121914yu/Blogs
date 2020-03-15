<template>
<div class="article">
  <load v-if="loading"></load>
  <i class="iconfont icon-totop totop" @click="totop"></i>
  <div class="catalogActive"><i class="iconfont icon-mulu"></i></div>
  <div class="catalog" :class="catalogActive ? 'active':''">
    <h2>{{blog.title}}</h2>
    <div class="navs"></div>
  </div>
  <div class="main">
    <header>
      <h1>{{blog.title}}</h1>
      <div class="info">
        <div class="item">
          <i class="iconfont icon-mine"></i>
          <span>{{blog.author}}</span>
        </div>
        <div class="item">
          <i class="iconfont icon-shijian"></i>
          <span>{{date}}</span>
        </div>
        <div class="item">
          <i class="iconfont icon-readed"></i>
          <span>{{blog.readed}}</span>
        </div>
        <div class="item">
          <i class="iconfont icon-tag"></i>
          <span
            v-for="tag in blog.tags"
            :key="tag"
          >
            {{tag}}
          </span>
        </div>
      </div>
      <p>{{blog.brief}}</p>
    </header>
    <!-- <div class="md markdown" v-highlight></div> -->
    <article class="md markdown" v-highlight></article>
    <div class="navArticle">
      <div v-if="lastBlog!=''" class="last">
        <router-link :to="'/article/'+lastBlog.id">
          <i class="iconfont icon-last"></i>
          <span>{{lastBlog.title}}</span>
        </router-link>
      </div>
      <div v-if="nextBlog!=''" class="next">
        <router-link :to="'/article/'+nextBlog.id">
          <span>{{nextBlog.title}}</span>
          <i class="iconfont icon-next"></i>
        </router-link>
      </div>
    </div>
    <!-- 留言区 -->
    <div class="message md">
      <h3>留言区</h3>
      <textarea  rows="5" v-model="editor.content" placeholder="留下点东西……">
      </textarea>
      <div class="editor">
        <div class="info">
          <span>昵称：</span>
          <input type="text" placeholder="留下你的昵称(选填)" v-model="editor.name">
        </div>
        <div class="info">
          <span>联系方式：</span>
          <input type="text" placeholder="你的联系方式(选填)" v-model="editor.relation">
        </div>
        <div class="Lmessage" @click="Lmessage">留言</div>
      </div>
      <div class="comment">
        <div 
          class="item"
          v-for="(item,index) in comment"
          :key="index"
        >
          <header>
            <span class="name"><i class="iconfont icon-mine"></i>{{item.name}}</span>
            <span class="relation" v-if="item.relation!=''"><i class="iconfont icon-email"></i>{{item.relation}}</span>
            <span class="date"><i class="iconfont icon-shijian"></i>{{item.date}}</span>
          </header>
          <div>{{item.content}}</div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import marked from 'marked'
import load from '../components/loading.vue'
var timer
export default{
  data(){
    return{
      loading : false,
      catalogActive : false,
      oldID : "",
      blog : {},
      date : "",
      current : 0,
      lastBlog : '',
      nextBlog : '',
      editor : {
        name : "",
        relation : "",
        content : ""
      },
      comment : []
    }
  },
  watch:{
    '$route' : 'routeChange',
  },
  methods:{
    routeChange(){
      const articleID = this.$route.params.id
      if(articleID != this.oldID){
        if(timer)
          clearInterval(timer)
        this.loading = true
        this.oldID = articleID
        this.$axios.get('/blogs/article/'+articleID)
        .then(res => {
          this.comment = res.data.comment
          this.getBLogsInfo(articleID)
          this.getDate()
          this.getHtml(res.data.html)
          this.getTitle()
          this.getNavArticle(articleID)
          // document.body.scrollIntoView()
          this.loading = false
          timer = setInterval(() => {//若停留5分钟则阅读量+1
            clearInterval(timer)
            this.$axios.post('/blogs/addReaded',{
              id : articleID,
              readed : this.blog.readed
            })
            .then(res => {
              console.log('阅读+1')
            })
          },60000 * 5)
        })
        .catch(err => {
          console.log(err)
          alert('请求错误' + err)
          this.loading = false
        })
      }
    },
    getBLogsInfo(articleID){
      //查询博客题目，小标题等信息
      this.blog = global.blogsInfo.blogsList.find(item => {
        return item.id === articleID
      })
    },
    getDate(){
      const date = new Date(this.blog.date)
      this.date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    },
    getHtml(data){//获取目录跟文章
      //将数据切割成2分
      let md = data
      const reg = /articleLine/
      md = md.split('articleLine')
      // markdown转html
      document.querySelector('.catalog .navs').innerHTML = marked(md[0])
      document.querySelector('.main .markdown').innerHTML = marked(md[1])
      document.querySelectorAll('.catalog .navs p').forEach(item => {
        item.onclick = (e) => {
          e.preventDefault()
          const id = item.children[0].hash.replace('#','')
          const dom = document.getElementById(id).parentElement
          window.scrollTo(0,dom.offsetTop+150)
          // console.log(document.querySelector('#2'))
        }
      })
    },
    getTitle(){//监听当前属于哪个标题
      const titles = document.querySelectorAll(".markdown .title")
      const dom = document.querySelector('.catalog .navs').children
      let current = titles.length-1
      for(let i=0;i<titles.length;i++){
        const top = titles[i].getBoundingClientRect().top
        if(top > -5){
          current = i
          break
        }
      }
      if(titles.length > 0){
        for(let i=0;i<titles.length;i++)
          dom[i].classList.remove('current')
        dom[current].classList.add('current')
        var currentMB = document.documentElement.clientHeight - dom[current].offsetTop - 170
        if(currentMB < 37)
          document.querySelector('.catalog').scrollTop  += 37
        else{
          document.querySelector('.catalog').scrollTop -= 10
        }
      }
    },
    getNavArticle(articleID){
      const blogsList = global.blogsInfo.blogsList
      blogsList.find((item,index) => {
        if(item.id == articleID){
          this.lastBlog = index === 0 ? '' : blogsList[index-1]
          this.nextBlog = index === blogsList.length-1 ? '' : blogsList[index+1]
        }
        return item.id == articleID
      })
    },
    totop(){
      document.body.scrollIntoView()
    },
    Lmessage(){
      if(this.editor.content === "")
        alert("未有留言内容")
      else{
        if(this.editor.name === "")
          this.editor.name = "游客"
        this.editor.id = this.blog.id
        const date = new Date()
        this.editor.date = `${date.getFullYear()}/${date.getMonth()+1}/${date.getDate()}`
        this.$axios.post('/blogs/Lmessage',this.editor)
        .then(res => {
          if(res.data != 'success')
            alert('留言保存失败')
        })
        this.comment.unshift(this.editor)
        this.editor = {
          name : "",
          relation : "",
          content : ""
        }
      }
    }
  },
  created() {
    this.loading = true
    this.routeChange()
  },
  mounted() {
    window.addEventListener("scroll",this.getTitle); 
    document.querySelector('.article').onclick = (e) => {
      if (!document.querySelector('.article .catalogActive').contains(e.target) || this.catalogActive===true)
        this.catalogActive = false
      else
        this.catalogActive = true
    }
  },
  destroyed() {
    window.removeEventListener('scroll',this.getTitle)
    if(timer)
      clearInterval(timer)
  },
  components:{
    load
  }
}
</script>

<style>
@import url("../../static/markdown.css");
.article{
  width: 100vw;
  margin-top: 0;
  padding-bottom: 15px;
  overflow: auto;
}
.article .totop{
  position: fixed;
  z-index: 9999;
  right: 0.8em;
  bottom: 4em;
  padding: 5px 10px;
  border-radius: 10px;
  color: #FFFFFF;
  background-color: var(--green1);
  font-size: 1.2em;
  border-radius: 50%;
  opacity: 0.9;
  cursor: pointer;
}

/* 目录 */
.article .catalogActive{
  position: fixed;
  display: none;
  z-index: 9999;
  right: 1em;
  bottom: 2em;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: var(--green1);
  opacity: 0.9;
  cursor: pointer;
}
.article .catalogActive i{
  font-size: 1.2em;
  color: #F4F4F4;
}
.article .catalog{
  z-index: 9;
  position: fixed;
  top: 0;
  left: 0;
  height:100%;
  min-width: 250px;
  min-height: 100vh;
  padding: 90px 10px;
  background-color: #FFFFFF;
  border-right: var(--border1);
  transition: var(--transition-speed);
  overflow-y:auto;
}
.article .catalog .navs{
  transition: var(--transition-speed);
}
.article .catalog{
  user-select: none;
}
.article .catalog .navs{
  padding: 10px 5px;
}
.article .catalog .navs p{
  padding-left: 10px;
  border-radius: 5px;
  margin: 5px 0;
  background-color: #FFFFFF;
  cursor: pointer;
}
.article .catalog .navs p a{
  text-decoration: none;
  line-height: 2;
}
.article .catalog .navs p:hover a{
  color: var(--green2);
  text-decoration: none;
}
.article .catalog .navs .current{
  background-color: var(--green1);
  color: #FFFFFF;
}
.article .catalog .navs .current a{
  color: #f4f4f4;
}
.article .catalog .navs .current:hover a{
  color: #f4f4f4;
}
.article .catalog h2{
  color: var(--font-dark1);
  transition: var(--transition-speed);
}

.article .main{
  margin-left: 30%;
  margin-right: 5%;
  padding: 100px 30px 30px 30px;
  max-width: 800px;
}
.article .main header h1{
  padding-bottom: 5px;
  padding-left: 5px;
  border-bottom: var(--border2);
  color: var(--font-dark1);
}
.article .main header .info{
  display: flex;
  flex-wrap: wrap;
  margin-left: -10px;
  border-bottom: var(--border2);
}
.article .main header .info .item{
  display: flex;
  align-items: center;
  margin: 5px 10px;
}
.article .main header .info .item i{
  font-size: 1.5em;
  margin-right: 5px;
  color: var(--font-dark-remark);
}
.article .main header .info .item span{
  color: var(--font-dark-remark);
  font-weight: 500;
  margin-right: 5px;
}
.article .main header p{
  margin: 20px 0 30px 5px;
}

.article .main .navArticle{
  margin: 10px;
}
.article .main .navArticle span,.article .main .navArticle i{
  font-weight: 500;
  color: var(--green2);
}
.article .main .navArticle .last{
  float: left;
}
.article .main .navArticle .next{
  float: right;
}
.article .main .navArticle .last:hover span,
.article .main .navArticle .last:hover i,
.article .main .navArticle .next:hover span,
.article .main .navArticle .next:hover i
{
  color: var(--blue);
}

/* 留言区 */
.article .main .message{
  margin-top: 50px;
}
.article .main .message textarea{
  padding: 5px;
  width: 100%;
  resize: none;
}
.article .main .message .editor{
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
}
.article .main .message .editor .info{
  margin-right: 5px;
}
.article .main .message .editor .info input{
  padding: 5px 10px;
}
.article .main .message .editor .Lmessage{
  padding: 5px 10px;
  border: var(--border1);
  border-radius: 5px;
  cursor: pointer;
}
.article .main .message .editor .Lmessage:hover{
  border-color: var(--green1);
  background-color: var(--green1);
  color: #FFFFFF;
}
.article .main .message .comment{
  margin-top: 25px;
}
.article .main .message .comment .item{
  margin-bottom: 15px;
  box-shadow: var(--box-shadow2);
  padding: 5px;
  border-radius: 10px;
}
.article .main .message .comment header{
  border-bottom: var(--border2);
  padding-bottom: 5px;
}
.article .main .message .comment header span{
  margin-right: 10px;
}

@media (max-width:900px) {
  .article .catalogActive{
    display: block;
  }
  .article .catalog{
    transform: translateX(-100%);
    min-width: 220px;
  }
  .article .catalog.active{
    transform: translateX(0);
  }
  .article .main{
    width: 90%;
    margin: 0 auto;
  }
}

@media (max-width:720px) {
  .article .main{
    width: 100%;
    padding: 80px 10px 10px 20px;
  }
  .article .main header .info .item{
    margin: 0 10px;
  }
  .article .main header p{
    margin: 10px 0 20px 5px;
  }
  .article .main .navArticle{
    padding-top: 10px;
    margin: 10px 0;
    border-top: var(--border1);
  }
}
@media (max-width:400px) {
  .article .main .navArticle .last{
    float: none;
  }
  .article .main .navArticle .next{
    float: right;
    padding-bottom: 20px;
  }
}
</style>
