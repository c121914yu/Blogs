<template>
<div class="info-wrapper">
  <div class="persional">
    <img src="http://49.232.38.113/img/avator.jpg">
    <h3>{{persionalInfo.name}}</h3>
    <div class="count">
      <div class="item">
        <span>{{persionalInfo.article}}</span>
        <p>文章</p>
      </div>
      <div class="line"></div>
      <div class="item">
        <span>{{tags.length}}</span>
        <p>标签</p>
      </div>
    </div>
  </div>
  <div class="blogsInfo">
    <header>
      <i class="iconfont icon-menu"></i>
      <p>分类</p>
      <router-link to="/categeory/all">全部</router-link>
    </header>
    <div class="categorys">
      <router-link 
        class="item"
        v-for="(item,index) in categorys"
        :key="index"
        :to="'/categeory/'+item.param"
      >
        <i class="iconfont" :class="item.icon"></i>
        <span>{{item.text}}</span>
        <div class="amount">{{item.amount}}</div>
      </router-link>
    </div>
    
    <header>
      <i class="iconfont icon-tag"></i>
      <p>标签</p>
      <router-link to="/tags/all">全部</router-link>
    </header>
    <div class="tags">
      <router-link 
        class="tag"
        :style="'background-color:'+bgcolors[index]"
        v-for="(i,index) in randomTags"
        :key="index"
        :to="'/tags/'+tags[i]"
      >
        {{tags[i]}}
      </router-link>
    </div>
    
    <header v-if="timeLine">
      <i class="iconfont icon-shijian"></i>
      <router-link :to="{name:'timeLine'}">时间线 ---------------</router-link>
    </header>
  </div>
</div>
</template>

<script>
export default{
  data(){
    return{
      persionalInfo : {
        name : global.blogsInfo.name,
        article : global.blogsInfo.article
      },
      categorys : global.blogsInfo.categeroy,
      tags : global.blogsInfo.tags,
      bgcolors : ['#5b8ff9','#6dc8ec','#5ad8a6','#1e9493','#ff9845','#e86452','#ff99c3',' #f6bd16','#945fb9']
    }
  },
  computed:{
    randomTags(){
      let indexs = new Array()
      let length = this.tags.length<9 ? this.tags.length : 9
      for(let i=0;i<length;i++){
        const index = Math.round(Math.random()*(this.tags.length-1))
        if(indexs.indexOf(index) != -1)
          i--
        else
          indexs[i] = index
      }
      return indexs
    }
  },
  props:{
    timeLine : Boolean
  }
}
</script>

<style scoped>
.info-wrapper{
  width: 300px;
  padding: 10px 4%;
  background-color: #FFFFFF;
  box-shadow: var(--box-shadow2);
  border-radius: 5px;
}
.info-wrapper:hover{
  box-shadow: var(--box-shadow1);
}
/* 个人信息 */
.info-wrapper .persional{
  width: 100%;
  border-bottom: var(border3);
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.info-wrapper .persional img{
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: var(border3);
}
.info-wrapper .persional h3{
  color: var(--green2);
  margin: 10px 0;
}
.info-wrapper .persional .count{
  display: flex;
  font-weight: 500;
}
.info-wrapper .persional .count .line{
  width: 0.1em;
  background-color: var(--tint-gray);
  margin: 0 20px;
}
.info-wrapper .persional .count .item{
  display: flex;
  flex-direction: column;
  align-items: center;
}
.info-wrapper .persional .count .item span{
  font-size: 1.4em;
}
.info-wrapper .persional .count .item p{
  font-size: 0.8em;
  color: var(--font-dark-remark);
}
/* 博客的信息 */
.info-wrapper .blogsInfo header{
  margin: 10px 0;
  display: flex;
  align-items: center;
}
.info-wrapper .blogsInfo header i{
  color: var(--font-dark-remark);
  font-size: 1.5em;
}
.info-wrapper .blogsInfo header p{
  flex: 1;
}
.info-wrapper .blogsInfo header a{
  margin-right: 5px;
  font-size: 0.9em;
  cursor: pointer;
}
/* 博客分类信息 */
.info-wrapper .blogsInfo .categorys .item{
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
  text-decoration: none;
}
.info-wrapper .blogsInfo .categorys .item:first-child{
  margin-top: 0;
}
.info-wrapper .blogsInfo .categorys .item:hover{
  width: 110%;
}
.info-wrapper .blogsInfo .categorys .item i{
  font-size: 1.2em;
  margin-right: 5px;
}
.info-wrapper .blogsInfo .categorys .item span{
  flex: 1;
  color: var(--green2);
}
.info-wrapper .blogsInfo .categorys .item .amount{
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
.info-wrapper .blogsInfo .tags{
  display: flex;
  flex-wrap: wrap;
}
.info-wrapper .blogsInfo .tags .tag{
  padding: 2px 5px;
  border-radius: 4px;
  color: #FFFFFF;
  margin-right: 10px;
  margin-bottom: 10px;
  cursor: pointer;
  transition: .5s;
  text-decoration: none;
}
.info-wrapper .blogsInfo .tags .tag:hover{
  transform: scale(1.1);
}
</style>
