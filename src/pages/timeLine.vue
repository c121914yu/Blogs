<template>
<div class="timeLine">
  <div class="content">
    <div class="dot"></div>
    <h3>历史足迹</h3>
  </div>
  
  <router-link 
    class="content blogs"
    :class="item.title != '' ? 'dotmb':'year'"
    v-for="(item,index) in blogsList"
    :key="index"
    :to="item.id ? '/article/'+item.id : ''"
  >
    <div class="dot"></div>
    <div class="blog">
      <p>{{item.date}}</p>
      <p>{{item.title || ""}}</p>
    </div>
  </router-link>
</div>
</template>

<script>
export default{
  data(){
    return{
      blogsList : []
    }
  },
  mounted() {
    let blogs = []
    let year = ""
    global.blogsInfo.blogsList.forEach(item => {
      const date = new Date(item.date)
      const blogsYear = date.getFullYear()
      if(blogsYear != year){
        year = blogsYear
        blogs.push({
          date:year,
          title : ""
        })
      }
      const day = `${date.getMonth()+1}-${date.getDate()}`
      blogs.push({
        date : day,
        title : item.title,
        id : item.id
      })
    })
    this.blogsList = blogs
  }
}
</script>

<style>
.timeLine{
  margin: 20px auto;
  margin-top: 100px;
  width: 90%;
  max-width:500px;
  border-left: 4px solid rgba(217,217,217,0.6);
  transition: var(--transition-speed);
}

.timeLine .content{
  margin: 10px 0 20px 0;
  display: flex;
  align-items: center;
  text-decoration: none;
}
.timeLine .content h3{
  color: var(--green2);
  flex: 1;
}

.timeLine .content .dot{
  margin-left: -7px;
  margin-right: 20px;
  width: 10px;
  height: 10px;
  border: var(--border1);
  border-radius: 50%;
  background-color: #FFFFFF;
}
.timeLine .content.dotmb .dot{
  margin-bottom: 22.5px;
}

.timeLine .content.year{
  font-size: 1.4em;
  color: var(--font-dark1);
  font-weight: 500;
  margin: 30px 0;
}

.timeLine .content.dotmb .blog{
  flex: 1;
  padding-bottom: 5px;
  border-bottom: 1px dotted #d9d9d9;
  cursor: pointer;
}
.timeLine .content.dotmb:last-child .blog{
  border: none;
}
.timeLine .content.dotmb:hover p{
  color: var(--green1);
}
.timeLine .content.dotmb:hover .dot{
  background-color: var(--green1);
  border-color: transparent;
}


</style>
