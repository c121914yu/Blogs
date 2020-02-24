<template>
  <div id="app">
    <Nav></Nav>
    <router-view/>
  </div>
</template>

<script>
import Nav from './components/nav.vue'
export default {
  components:{
    Nav
  }
}
</script>

<style>
@import url("../static/common.css");
@import url("../static/icon/iconfont.css");
#app{
  height: 100vh;
  width: 100vw;
  background-color: #FFFFFF;
}
</style>
