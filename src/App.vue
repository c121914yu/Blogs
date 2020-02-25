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
    this.$axios.get('/blogs/getInfo')
    .then(res => {
      let data = res.data
      data.categeroy = eval("("+data.categeroy+")")
      data.tags = eval("("+data.tags1+")").concat(eval("("+data.tags2+")")).concat(eval("("+data.tags3+")"))
      delete data.tags1
      delete data.tags2
      delete data.tags3
      global.blogsInfo = data
      this.created = true
      console.log(data)
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
