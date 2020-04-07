<template>
<div class="blog-cov">
  <a 
    class="title" 
    :href="'http://www.jinlongyuchitang.cn/article/'+blog.id"
    target="_blank"
  >
     <h3>{{blog.title}}</h3>
     <div class="line"></div>
  </a>
	<a 
		class="btns"
		:href="'http://www.jinlongyuchitang.cn/article/'+blog.id"
		target="_blank"
	>
		编辑
	</a>
  <div class="info">
    <div class="item worker">
      <i class="iconfont icon-riji"></i>
      <span>{{blog.author}}</span>
    </div>
    <div class="item time">
      <i class="iconfont icon-shijian"></i>
      <span>{{date}}</span>
    </div>
		<div class="item time">
		  <i class="iconfont icon-readed"></i>
		  <span>{{blog.readed}}</span>
		</div>
    <div class="item tag">
      <i class="iconfont icon-tag"></i>
      <p 
        class="link" 
        v-for="item in blog.tags"
        :key="item"
      >
        {{item}}
      </p>
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

.blog-cov .btns{
	position: absolute;
	top: 5px;
	right: 10px;
	color: var(--green2);
	cursor: pointer;
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
.blog-cov .info .item span{
  color: inherit;
  margin-right: 10px;
	margin-top: -2px;
}
</style>
