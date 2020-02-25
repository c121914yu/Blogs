<template>
<div class="home">
  <div class="head">
    <img src="../../static/logo.png">
    <h1>梦在远方,你在心里</h1>
  </div>
  
  <div class="main">
    <div class="info-wrapper">
      <div class="persional">
        <img src="../../static/avator.jpg">
        <h3>yujinlong</h3>
        <div class="count">
          <div class="item">
            <span>10</span>
            <p>文章</p>
          </div>
          <div class="line"></div>
          <div class="item">
            <span>20</span>
            <p>标签</p>
          </div>
        </div>
      </div>
      <div class="blogsInfo">
        <header>
          <i class="iconfont icon-menu"></i>
          <p>分类</p>
        </header>
        <div class="categorys">
          <div 
            class="item"
            v-for="(item,index) in categorys"
            :key="index"
          >
            <i class="iconfont" :class="item.icon"></i>
            <span>{{item.text}}</span>
            <div class="amount">{{item.amount}}</div>
          </div>
        </div>
        <header>
          <i class="iconfont icon-tag"></i>
          <p>标签</p>
        </header>
        <div class="tags">
          <div 
            class="tag"
            :style="'background-color:'+bgcolors[index] "
            v-for="(item,index) in tags"
            :key="index"
          >
            {{item}}
          </div>
        </div>
      </div>
    </div>
    <div class="blogs">
      <blogCov class="blog"></blogCov>
      <blogCov class="blog"></blogCov>
      <blogCov class="blog"></blogCov>
    </div>
  </div>
  
  <footer>
    <div class="item git">
      <i class="iconfont icon-git"></i>
      <span>c121914.git.com</span>
    </div>
    <div class="item email">
      <i class="iconfont icon-email"></i>
      <span>545436317@qq.com</span>
    </div>
  </footer>
</div>
</template>

<script>
import blogCov from '../components/blogCov.vue'
export default{
  data(){
    return{
      categorys : [
        {text : "日记",amount : 5,icon:'icon-riji'},
        {text : "游记",amount : 5,icon:'icon-travel'},
        {text : "技术",amount : 5,icon:'icon-jishu'}
      ],
      tags : ["javascript","html",'css','张家界','node'],
      bgcolors : ['#5b8ff9','#6dc8ec','#5ad8a6','#1e9493','#ff9845','#e86452','#ff99c3']
    }
  },
  mounted() {
    setTimeout(() => {
      document.querySelector('.home .head img').style.marginTop = 0
      document.querySelector('.home .head img').style.opacity = 1
      document.querySelector('.home .head h1').style.opacity = 1
    })
  },
  components:{
    blogCov
  }
}
</script>

<style>
.home .head{
  width: 100%;
  height: 400px;
  background: url(../../static/background.jpg) no-repeat center center/cover;
  background-position: 0 55%; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.home .head img{
  width: 80px;
  border-radius: 50%;
  margin-top: -100px;
  opacity: 0;
  transition: var(--transition-speed);
}
.home .head h1{
  margin-top: 10px;
  color: #FFFFFF;
  opacity: 0;
  transition: var(--transition-speed);
}

.home .main{
  margin: 20px auto;
  width: 80%;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
}
.home .main .info-wrapper{
  margin-right: 20px;
  width: 300px;
  padding: 10px 4%;
  background-color: #FFFFFF;
  box-shadow: var(--box-shadow2);
  border-radius: 5px;
}
.home .main .info-wrapper:hover{
  box-shadow: var(--box-shadow1);
}
/* 个人信息 */
.home .main .info-wrapper .persional{
  width: 100%;
  border-bottom: var(border3);
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.home .main .info-wrapper .persional img{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: var(border3);
}
.home .main .info-wrapper .persional h3{
  color: var(--green2);
  margin: 10px 0;
}
.home .main .info-wrapper .persional .count{
  display: flex;
  font-weight: 500;
}
.home .main .info-wrapper .persional .count .line{
  width: 0.05em;
  background-color: var(--font-dark-common);
  margin: 0 20px;
}
.home .main .info-wrapper .persional .count .item{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home .main .info-wrapper .persional .count .item span{
  font-size: 1.4em;
}
.home .main .info-wrapper .persional .count .item p{
  font-size: 0.8em;
  color: var(--font-dark-remark);
}
/* 博客的信息 */
.home .main .info-wrapper .blogsInfo header{
  margin: 10px 0;
  display: flex;
  align-items: center;
}
.home .main .info-wrapper .blogsInfo header i{
  color: var(--font-dark-remark);
  font-size: 1.5em;
}
/* 博客分类信息 */
.home .main .info-wrapper .blogsInfo .categorys .item{
  width: 95%;
  margin: 10px auto 0 auto;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: #FFFFFF;
  box-shadow: var(--box-shadow2);
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: width .5s; 
}
.home .main .info-wrapper .blogsInfo .categorys .item:first-child{
  margin-top: 0;
}
.home .main .info-wrapper .blogsInfo .categorys .item:hover{
  width: 105%;
}
.home .main .info-wrapper .blogsInfo .categorys .item i{
  font-size: 1.2em;
  margin-right: 5px;
}
.home .main .info-wrapper .blogsInfo .categorys .item span{
  flex: 1;
  color: var(--green2);
}
.home .main .info-wrapper .blogsInfo .categorys .item .amount{
  width: 25px;
  height: 25px;
  border-radius: 5px;
  background-color: var(--origin);
  color: #FFFFFF;
  text-align: center;
  line-height: 25px;
  font-size: 0.8em;
}
/* 标签 */
.home .main .info-wrapper .blogsInfo .tags{
  display: flex;
  flex-wrap: wrap;
}
.home .main .info-wrapper .blogsInfo .tags .tag{
  padding: 2px 5px;
  border-radius: 4px;
  color: #FFFFFF;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: .5s;
}
.home .main .info-wrapper .blogsInfo .tags .tag:hover{
  transform: scale(1.1);
}

.home .main .blogs{
  flex: 1;
  display: flex;
  flex-direction: column;
}
.home .main .blogs .blog{
  margin-top: 15px;
}
.home .main .blogs .blog:first-child{
  margin-top: 0;
}

.home footer{
  width: 100%;
  height: 80px;
  border-top: var(--border3);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home footer .item{
  cursor: pointer;
  display: flex;
  align-items: center;
}
.home footer .item.git i{
  font-size: 2em;
}
.home footer .item.email i{
  font-size: 1.5em;
  margin-top: -5px;
}
.home footer span{
  margin-left: 5px;
  font-size: 1em;
  color: var(--green2);
  top: -5px;
}

@media (max-width:1000px) {
  .home .main{
    width: 95%;
    margin: 20px auto;
  }
}
</style>
