<template>
<div class="blog-cov">
  <router-link 
    class="title" 
    :to="'/article/'+blog.date"
  >
     <h3>{{blog.title}}</h3>
     <div class="line"></div>
  </router-link>
  <p>{{blog.brief}}</p>
  <div class="info">
    <div class="item worker">
      <i class="iconfont icon-riji"></i>
      <span>{{blog.author}}</span>
    </div>
    <div class="item time">
      <i class="iconfont icon-shijian"></i>
      <span>{{date}}</span>
    </div>
    <div class="item tag">
      <i class="iconfont icon-tag"></i>
      <router-link 
        class="link" 
        v-for="item in blog.tags"
        :key="item"
        :to="'/tags/'+item"
      >
        {{item}}
      </router-link>
    </div>
  </div>
</div>
</template>

<script>
export default{
  data(){
    return{
      date : ""
    }
  },
  props:{
    blog : Object,
  },
  mounted() {
    const date = new Date(this.blog.date)
    this.date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  }
}
</script>

<style scoped>
.blog-cov{
  width: 100%;
  max-width: 800px;
  padding: 10px 10px 5px 10px;
  background-color: #FFFFFF;
  box-shadow: var(--box-shadow2);
  border-radius: 5px;
}
.blog-cov:hover{
  box-shadow: var(--box-shadow1);
}
.blog-cov .title{
  display: inline-block;
  text-decoration: none;
}
.blog-cov .title h3{
  color: var(--green2);
  cursor: pointer;
}
.blog-cov .title .line{
  margin-top: 3px;
  left: 50%;
  transform: translateX(-50%);
  height: 3px;
  width: 0;
  background-color: var(--green1);
  transition: var(--hover-speed);
}
.blog-cov .title:hover .line{
  width: 100%;
}
.blog-cov p{
  margin-top: 5px;
  padding-bottom: 10px;
  border-bottom: var(border3);
}
.blog-cov .info{
  display: flex;
  flex-wrap: wrap;
}
.blog-cov .info .item{
  margin-right: 10px;
  display: flex;
  align-items: center;
  color: var(--font-dark-remark);
  font-weight: 500;
}
.blog-cov .info .item i{
  font-size: 1.5rem;
  color: inherit;
}
.blog-cov .info .item span,.blog-cov .info .item.tag .link{
  color: inherit;
  margin-right: 10px;
}
.blog-cov .info .item.tag .link{
  cursor: pointer;
  text-decoration: none;
}
.blog-cov .info .item.tag .link:hover{
  color: var(--green2);
}
</style>
