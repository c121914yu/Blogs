<template>
  <div class="nav">
    <div class="logo">
      <img src="../../static/logo.png">
      <h3>yujinlong&emsp;Blogs</h3>
    </div>
    <div class="search">
      <i class="iconfont icon-search"></i>
      <input type="text" placeholder="搜索文章" autocomplete="off">
    </div>
    <div class="right">
      <router-link 
        :to="{name:'home'}" 
        class="item active" 
        :class="current===0 ? 'current':''"
      >
        <i class="iconfont icon-home"></i>
        <span>Home</span>
      </router-link>
      <div 
        class="item" 
        :class="current === 1 ? 'current':''" 
        @mouseenter="show_categeory()" 
        @mouseleave="show_categeory()"
      >
        <i class="iconfont icon-menu"></i>
        <span>Categeory</span>
        <i class="iconfont icon-down down"></i>
        <div class="categeory" @mouseenter="show_categeory(true)">
          <router-link 
            class="link" 
            v-for="(item,index) in categeorys"
            :key="index"
            :to="'/categeory/'+item.param"
          >
            <p @click="routeChange">{{item.text}}</p>
          </router-link>
        </div>
      </div>
      <router-link
        :to="{name:'home'}" 
        class="item active" 
        :class="current===2 ? 'current':''"
      >
        <i class="iconfont icon-tag"></i>
        <span>Tag</span>
      </router-link>
      <router-link
        :to="{name:'home'}" 
        class="item active" 
        :class="current===3 ? 'current':''"
      >
        <i class="iconfont icon-shijian"></i>
        <span>TimeLine</span>
      </router-link>
    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
      current : 0,
      categeory : false,
      categeorys : [
        {text : "全部",param : "all"},
        {text : "技术",param : "technology"},
        {text : "日记",param : "diary"},
        {text : "游记",param : "travel"},
      ]
    }
  },
  watch:{
    '$route' : 'routeChange',
  },
  methods:{
    routeChange(){
      document.querySelector('.item .down').style.transform = "rotate(0)"
      document.querySelector('.item .categeory').style.height = "0"
      switch(this.$route.name){
        case 'home' : this.current=0;break;
        case 'categeory' : this.current=1;break;
      }
      console.log(this.$route.name)
    },
    show_categeory(back=false){
      if(back)
        return
      this.categeory = !this.categeory
      if(this.categeory){
        document.querySelector('.item .down').style.transform = "rotate(180deg)"
        document.querySelector('.item .categeory').style.height = this.categeorys.length*32 + "px"
      }
      else{
        document.querySelector('.item .down').style.transform = "rotate(0)"
        document.querySelector('.item .categeory').style.height = "0"
      }
    }
  },
  mounted() {
    this.routeChange()
  }
}
</script>

<style scoped>
.nav{
  z-index: 9999;
  position: sticky;
  height: 60px;
  width: 100vw;
  background-color: #ffffff;
  box-shadow: var(--box-shadow2);
  display: flex;
  padding: 1em;
  user-select: none;
}
.nav i{
  font-size: 1.5em;
  color: var(--font-dark-remark);
}

.nav .logo{
  flex: 1;
  cursor: pointer;
  color: var(--font-dark3);
  transition: var(--hover-speed);
  display: flex;
  align-items: center;
}
.nav .logo h3{
  margin-top: -5px;
}
.nav .logo:hover{
  color: var(--green2);
}
.nav .logo img{
  margin-right: 1em;
  width: 2em;
  border-radius: 50%;
}

.nav .search{
  margin-right: 1em;
  display: flex;
  align-items: center;
}
.nav .search i{
  z-index: 999;
  position: absolute;
}
.nav .search input{
  width: 100%;
  max-width: 200px;
  height: 30px;
  padding: 5px 5px 5px 1.5em;
}

.nav .right{
  display: flex;
}
.nav .right .item{
  margin-right: 15px;
  color: var(--font-dark-remark);
  display: flex;
  align-items: center;
  cursor: pointer;
  border-bottom: 3px solid transparent;
  font-weight: 500;
  position: relative;
  text-decoration: none;
}
.nav .right .item i{
  color: inherit;
  margin-right: 5px;
}
.nav .right .item span{
  color: inherit;
}
.nav .right .item .down{
  font-size: 1em;
  margin: 8px 0 0 5px;
  transition: .5s;
  transform-origin: center center;
}
.nav .right .item:hover,.nav .right .item.current{
  color: var(--green2);
  border-color: var(--green1);
}
.nav .right .item:nth-child(2).current{
  border-color: transparent;
}
.nav .right .item:last-child{
  margin-right: 0;
}
.nav .right .item:nth-child(2):hover{
  border-color: transparent;
}
/* 分类 */
.nav .right .item .categeory{
  position: absolute;
  top: 35px;
  width: 100%;
  height: 0;
  background-color: #FFFFFF;
  box-shadow: var(--box-shadow2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  overflow: hidden;
  transition: var(--hover-speed);
}
.nav .right .item .categeory .link{
  color: var(--font-dark-common);
  text-decoration: none;
}
.nav .right .item .categeory .link:hover{
  color: #4c5a55;
  background-color: rgba(90,216,166,0.5);
}
.nav .right .item .categeory .link p{
  line-height: 32px;
  letter-spacing: 2px;
}

@media (max-width:900px) {
  .nav .logo img{
    margin: 0;
  }
 .nav .logo h3{
   display: none;
 }
}
</style>
