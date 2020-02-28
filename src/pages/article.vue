<template>
<div class="article">
  <load v-if="loading"></load>
  <div class="catalog">
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
    <div class="markdown-body md" v-highlight></div>
    <div class="navArticle">
      <div v-if="lastBlog!=''" class="last">
        <router-link :to="'/article/'+lastBlog.date">
          <i class="iconfont icon-last"></i>
          <span>{{lastBlog.title}}</span>
        </router-link>
      </div>
      <div v-if="nextBlog!=''" class="next">
        <router-link :to="'/article/'+nextBlog.date">
          <span>{{nextBlog.title}}</span>
          <i class="iconfont icon-next"></i>
        </router-link>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import showdown from 'showdown'
import load from '../components/loading.vue'
export default{
  data(){
    return{
      loading : false,
      blog : {},
      date : "",
      current : 0,
      lastBlog : '',
      nextBlog : ''
    }
  },
  watch:{
    '$route' : 'routeChange',
  },
  methods:{
    routeChange(){
      this.loading = true
      const articleID = this.$route.params.id
      this.$axios.get('/blogs/article/'+articleID)
      .then(res => {
        this.getBLogsInfo(articleID)
        this.getDate()
        this.getHtml(res.data)
        this.getTitle()
        this.getNavArticle(articleID)
        this.loading = false
      })
      .catch(err => {
        alert('请求错误' + err)
        this.loading = false
      })
    },
    getBLogsInfo(articleID){
      //查询博客题目，小标题等信息
      this.blog = global.blogsInfo.blogsList.find(item => {
        return item.date == articleID
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
      // //初始化markdown
      let converter = new showdown.Converter()
      
      document.querySelector('.main .markdown-body').innerHTML = converter.makeHtml(md[1])
      document.querySelector('.catalog .navs').innerHTML = converter.makeHtml(md[0])
    },
    getTitle(){//监听当前属于哪个标题
      const titles = document.querySelectorAll(".markdown-body .title")
      for(let i=0;i<titles.length;i++){
        const top = titles[i].getBoundingClientRect().top
        if(top > 60){
          const dom = document.querySelector('.catalog .navs').children
          dom[i].classList.add('current')
          if(dom[i-1])
            dom[i-1].classList.remove('current')
          if(dom[i+1])
            dom[i+1].classList.remove('current')
          return
        }
      }
    },
    getNavArticle(articleID){
      const blogsList = global.blogsInfo.blogsList
      blogsList.find((item,index) => {
        if(item.date == articleID){
          this.lastBlog = index === 0 ? '' : blogsList[index-1]
          this.nextBlog = index === blogsList.length-1 ? '' : blogsList[index+1]
        }
        return item.date == articleID
      })
    }
  },
  created() {
    this.routeChange()
  },
  mounted() {
    window.addEventListener("scroll",this.getTitle); 
  },
  destroyed() {
    window.removeEventListener('scroll',this.getTitle)
  },
  components:{
    load
  }
}
</script>

<style>
@import url("../../static/markdown.css");
.article{
  margin-top: 0;
}
.article .catalog{
  position: fixed;
  top: 0;
  left: 0;
  width: 250px;
  min-height: 100vh;
  padding: 90px 10px;
  border-right: var(--border1);
  overflow: hidden;
}
.article .catalog h2{
  color: var(--font-dark1);
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
.article .main .navArticle:hover span,.article .main .navArticle:hover i{
  color: var(--blue);
}
.article .main .navArticle .last{
  float: left;
}
.article .main .navArticle .next{
  float: right;
}

/* 目录 */
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
}
.article .catalog .navs p a{
  text-decoration: none;
  line-height: 2;
  cursor: pointer;
}
.article .catalog .navs p a:hover{
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
.article .catalog .navs .current a:hover{
  color: #f4f4f4;
}

@media (max-width:900px) {
  .article .catalog{
    display: none;
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
    margin: 10px 0;
    padding-bottom: 20px;
  }
}
</style>
