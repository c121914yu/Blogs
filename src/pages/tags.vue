<template>
<div class="Tags">
  <div class="Tag">
    <router-link
      class="item"
      :class="index===current?'current':''"
      :style="bgcolors[index]"
      v-for="(tag,index) in tags"
      :key="index"
      :to="'/tags/'+tag"
    >
      {{tag === "all" ? "全部" : tag}}
    </router-link>
  </div>
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
</template>

<script>
import blogCov from '../components/blogCov.vue'
export default{
  data(){
    return{
      blogsList : [],
      tags : ["all"].concat(global.blogsInfo.tags),
      bgcolors : [],
      current : 0
    }
  },
  watch:{
    '$route' : 'routeChange',
  },
  methods:{
    routeChange(){
      //随机获取标签颜色
      this.bgcolors = []
      const tag = this.$route.params.tag
      const colors = ['#5b8ff9','#6dc8ec','#945fb9','#5ad8a6','#1e9493','#5d7092','#ff9845','#e86452','#ff99c3','#f6bd16']
      this.tags.forEach(item => {
        const index = Math.round(Math.random()*(colors.length-1))
        const bgcolor = `background-color : ${colors[index]}`
        this.bgcolors.push(bgcolor)
      })
      this.current = 0
      for(let i=0;i<this.tags.length;i++){
        if(tag === this.tags[i]){
          this.current = i
          break
        }
      }
      //筛选博客
      if(this.current != 0)
        this.blogsList = global.blogsInfo.blogsList.filter(blog => {
          return blog.tags.indexOf(tag) != -1
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
.Tags{
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.Tags .Tag{
  margin: 20px auto;
  max-width: 800px;
  display: flex;
  flex-wrap: wrap;
}
.Tags .Tag .item{
  background-color: #FFFFFF;
  box-shadow: var(--box-shadow2);
  margin-right: 10px;
  margin-top: 10px;
  border-radius: 5px;
  padding: 2px 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: .1s;
  text-decoration: none;
  text-align: center;
  color: #FFFFFF;
}
.Tags .Tag .item:hover{
  transform: translateY(-3px);
}
.Tags .Tag .item.current{
  transform: scale(1.2);
}

.Tags .blogs{
  margin: 0 auto;
  width: 90%;
  max-width: 800px;
}
.Tags .blogs .blog{
  margin: auto;
  margin-bottom: 15px;
}

@media (max-width:720px) {
  .Tags .Tag{
    margin: 10px auto;
    width: 90%;
  }
}
</style>
