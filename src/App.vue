<template>
  <div id="app" v-if="created">
    <Nav></Nav>
    <router-view class="view"/>
  </div>
</template>

<script>
global.blogsInfo = new Object()
import Nav from './components/nav.vue'
export default {
  data(){
    return{
      created : false
    }
  },
  components:{
    Nav
  },
  beforeCreate() {
    this.$axios.post('/blogs/getInfo')
    .then(res => {
      let data = res.data
      data.tags = data.tags1.concat(data.tags2).concat(data.tags3)
      delete data.tags1
      delete data.tags2
      delete data.tags3
      data.blogsList.forEach(item => {
        item.date = new Date(item.date).getTime()
        item.tags = item.tags.split(',')
      })
      global.blogsInfo = data
      console.log(data)
      this.created = true
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>

<style>
@import url("../static/common.css");
@import url("../static/icon/iconfont.css");
.view{
  margin-top: 60px;
}
</style>
