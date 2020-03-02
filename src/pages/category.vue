<template>
<div class="categeorys">
  <div class="category">
    <router-link 
      class="item"
      :class="item.class"
      v-for="(item,index) in categeorys"
      :key="index"
      :to="'/categeory/'+item.param"
    >
      <span>{{item.text}}</span>
      <div :style="'background-color:'+bgcolors[index]">{{item.amount}}</div>
    </router-link>
  </div>
  <!-- 博客-->
  <div class="blogs" v-if="type==='blogs'">
    <blogCov
      class="blog"
      v-for="(item,index) in blogsList"
      :key="index"
      :blog="item"
    >
    </blogCov>
  </div>
  <!-- 宝箱 -->
  <div class="box" v-else-if="type==='box'">
    <a
      class="item"
      v-for="(item,index) in tools"
      :key="index"
      href="#"
      target="_blank"
    >
      <i class="iconfont" :class="item.icon" :style="'color:'+item.color"></i>
      <p>{{item.text}}</p>
    </a>
  </div>
</div>
</template>

<script>
import blogCov from '../components/blogCov.vue'
export default{
  data(){
    return{
      type : "blogs",
      categeorys : [],
      blogsList : [],
      tools : global.blogsInfo.tools,
      bgcolors : ['#5b8ff9','#6dc8ec','#1e9493','#ff9845','#e86452','#ff99c3']
    }
  },
  watch:{
    '$route' : 'routeChange',
  },
  methods:{
    routeChange(){
      const category = this.$route.params.category
      //更新分类栏
      this.categeorys = [{text:"全部",amount:global.blogsInfo.article,param:'all'}].concat(global.blogsInfo.categeroy)
      this.categeorys.forEach(item => {
        item.class = ""
      })
      let name = ''
      switch(category){
        case 'all' : this.categeorys[0].class='current';break;
        case 'diary' : this.categeorys[1].class='current';name="日记";break;
        case 'travel' : this.categeorys[2].class='current';name="游记";break;
        case 'technology' : this.categeorys[3].class='current';name="技术";break;
        case 'box' : this.categeorys[4].class='current';name="宝箱";break;
      }
      //筛选符合的
      this.type = 'blogs'
      if(name === "宝箱")
        this.type = 'box'
      else if(name != '')
        this.blogsList = global.blogsInfo.blogsList.filter(blog => {
          return blog.categeroy === name
        })
      else
        this.blogsList = global.blogsInfo.blogsList
    }
  },
  mounted(){
    this.routeChange()
  },
  components:{
    blogCov
  }
}
</script>

<style>
.categeorys{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}
/* 分类 */
.categeorys .category{
  margin-top: 20px;
  margin-bottom: 10px;
  max-width: 800px;
  display: flex;
  flex-wrap: wrap;
}
.categeorys .category .item{
  background-color: #FFFFFF;
  box-shadow: var(--box-shadow2);
  margin: 5px 10px;
  border-radius: 5px;
  padding: 5px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: var(--hover-speed);
  text-decoration: none;
  white-space: nowrap;
}
.categeorys .category .item:hover{
  transform: scale(1.1);
}
.categeorys .category .item div{
  margin-left: 15px;
  color: #FFFFFF;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
}
.categeorys .category .item.current{
  background-color: var(--green1);
}
.categeorys .category .item.current span{
  color: #FFFFFF;
}
.categeorys .category .item.current div{
  background-color: var(--font-dark-remark);
}
/* 宝箱 */
.categeorys .box{
  margin-top: 20px;
  width: 95%;
  max-width: 800px;
  display: grid;
  grid-template-columns: repeat(5,1fr);
  grid-column-gap: 10px;
  grid-row-gap: 15px;
}
.categeorys .box .item{
  height: 100%;
  padding: 10px 0;
  box-shadow: var(--box-shadow2);
  text-align: center;
  transition: var(--hover-speed);
}
.categeorys .box .item i{
  font-size: 1.5em;
}
.categeorys .box .item:hover{
  transform: scale(1.2);
}

.categeorys .blogs{
  margin: 0 auto;
  width: 90%;
  max-width: 800px;
}
.categeorys .blogs .blog{
  margin: auto;
  margin-bottom: 15px;
}

@media (max-width:720px) {
  .categeorys .category{
    margin-top: 5px;
  }
  .categeorys .box{
    grid-template-columns: repeat(3,1fr);
  }
}
</style>
