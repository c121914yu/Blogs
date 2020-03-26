<template>
  <div id="app" v-if="created">
    <Nav></Nav>
		<musicBox></musicBox>
    <router-view class="view"/>
  </div>
  <load v-else></load>
</template>

<script>
global.blogsInfo = new Object()
import Nav from './components/nav.vue'
import load from './components/loading.vue'
import musicBox from './components/musicBox.vue'
export default {
  data(){
    return{
      created : false
    }
  },
  components:{
    Nav,
    load,
		musicBox
  },
  beforeCreate() {
    this.$axios.get('/blogs/getInfo')
    .then(res => {
      let data = res.data
      data.tags = []
      data.categeroy.forEach(item => {
        data.tags = data.tags.concat(item.tags)
      })
      data.blogsList.forEach(item => {
        item.date = new Date(item.date).getTime()
        item.tags = item.tags.split(',')
      })
      data.blogsList.sort((a,b) => {
        return b.date - a.date
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
