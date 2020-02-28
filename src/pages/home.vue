<template>
<div class="home">
  <div class="head">
    <i class="iconfont icon-xuehua"></i>
    <h1>梦在远方,你在心中</h1>
  </div>
  
  <div class="main">
    <wrapper class="wrapper" :timeLine="false"></wrapper>
    <div class="blogs">
      <blogCov 
        class="blog"
        v-for="(item,index) in blogsList"
        :key="index"
        :blog="item"
      >
      </blogCov>
    </div>
  </div>
  
  <footer>
    <div class="item git">
      <i class="iconfont icon-git"></i>
      <a :href="persionalInfo.github" target="_blank">{{persionalInfo.github}}</a>
    </div>
    <div class="item email">
      <i class="iconfont icon-email"></i>
      <span>{{persionalInfo.email}}</span>
    </div>
  </footer>
</div>
</template>

<script>
import blogCov from '../components/blogCov.vue'
import wrapper from '../components/wrapper.vue'
export default{
  data(){
    return{
      persionalInfo : {
        name : global.blogsInfo.name,
        email : global.blogsInfo.email,
        github : global.blogsInfo.github,
      },
      blogsList : [],
    }
  },
  mounted() {
    setTimeout(() => {
      document.querySelector('.home .head i').style.marginTop = 0
      document.querySelector('.home .head i').style.opacity = 1
      document.querySelector('.home .head h1').style.opacity = 1
      document.querySelector('.home .main').style.opacity = 1
      document.querySelector('.home .main').style.paddingTop = 0
    })
    if(global.blogsInfo.blogsList.length <= 5)
      this.blogsList = global.blogsInfo.blogsList
    else
      this.blogsList = global.blogsInfo.blogsList.splice(0,5)
  },
  components:{
    blogCov,
    wrapper
  }
}
</script>

<style>
.home .head{
  width: 100%;
  height: 400px;
  background: url(http://49.232.38.113/img/background.jpg) no-repeat center center/cover;
  background-position: 0 55%; 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 2;
}
.home .head i{
  color: var(--green1);
  font-size: 5em;
  text-shadow: 0 0 5px var(--green1);
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
  opacity: 0;
  padding-top: 50vh;
  transition: var(--transition-speed);
}

.home .main .blogs{
  margin-left: 20px;
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
  border-top: var(--border1);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.home footer .item{
  display: flex;
  align-items: center;
}
.home footer i{
  color: var(--font-dark-remark);
}
.home footer span,.home footer a{
  margin-left: 5px;
  font-size: 1em;
  color: var(--green2);
  top: -5px;
}
.home footer .item.git i{
  font-size: 2em;
  cursor: pointer;
}
.home footer .item.git:hover i,.home footer .item.git:hover a{
  color: purple;
}
.home footer .item.email i{
  font-size: 1.5em;
  margin-top: -5px;
}

@media (max-width:900px) {
  .home .main{
    width: 95%;
  }
}

@media (max-width:720px) {
  .home .main{
    width: 95%;
  }
  .home .main .wrapper{
    display: none;
  }
  .home .main{
  }
  .home .main .blogs{
    width: 100%;
    margin: auto;
  }
  .home .main .blogs .blog{
    width: 100%;
  }
}
</style>
