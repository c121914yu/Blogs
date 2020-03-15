<template>
  <div class="nav" @mouseenter="mouseenter" @click="mouseenter">
    <wrapper class="wrapper" :timeLine="true"></wrapper>
    <div class="logo">
      <i class="iconfont icon-nav menu"></i>
      <router-link class="link" :to="{name:'home'}">
        <i class="iconfont icon-xuehua xuehua"></i>
        <h3>{{myName}}&ensp;Blogs</h3>
      </router-link>
      <div class="white"></div>
    </div>
    <div 
      class="search" 
      :class="searchActive?'active':''">
      <i class="iconfont icon-search"></i>
      <input type="text" placeholder="搜索文章" v-model="searchVal" autocomplete="off" @input="search">
      <div class="searchRes">
        <router-link 
          class="item"
          v-for="(item,index) in searchRes"
          :key="index"
          :to="'/article/'+item.date"
        >
          {{item.title}}
        </router-link>
      </div>
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
        class="item active" 
        :class="current===2 ? 'current':''"
        :to="'/tags/'+'all'"
      >
        <i class="iconfont icon-tag"></i>
        <span>Tag</span>
      </router-link>
      <router-link
        :to="{name:'timeLine'}" 
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
import wrapper from './wrapper.vue'
var lastNavName = "",lastID = ""
export default{
  data(){
    return{
      current : -1,
      searchActive : false,
      searchVal : "",
      searchRes : [],
      categeory : false,
      myName : global.blogsInfo.name,
      categeorys : [{text : "全部",param : "all"}].concat(global.blogsInfo.categeroy)
    }
  },
  watch:{
    '$route' : 'routeChange',
  },
  methods:{
    mouseenter(e){
      document.querySelector('.nav').style.opacity = 1
    },
    routeChange(){
      const RouteName = this.$route.name
      const RouteID = this.$route.params.id
      document.querySelector('.item .down').style.transform = "rotate(0)"
      document.querySelector('.item .categeory').style.height = "0"
      this.current = -1
      switch(RouteName){
        case 'home' : this.current=0;break;
        case 'categeory' : this.current=1;break;
        case 'tags' : this.current=2;break;
        case 'timeLine' : this.current=3;break;
      }
      document.querySelector('.nav .wrapper').style.transform = "translateX(-100%)"
      this.searchVal = ""
      this.searchRes = []
      // 回滚顶部
      if(RouteName != lastNavName || RouteID != lastID){
        lastNavName = lastNavName
        lastID = RouteID
        document.body.scrollIntoView()
      }
    },
    search(e){
      const val = this.searchVal
      this.searchRes = global.blogsInfo.blogsList.filter(item => {
        const regex = new RegExp(`^${val}`,'gi')
        return regex.test(item.title) || regex.test(item.brief)
      })
      if(val === "")
        this.searchRes = []
      // console.log(this.searchRes)
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
    window.onclick = (e) => {
      if (!document.querySelector('.nav .search').contains(e.target)){
        this.searchVal = ""
        this.searchRes = []
        this.searchActive = false
      }
      else
        this.searchActive = true
      if(document.querySelector('.nav .icon-nav').contains(e.target))
        document.querySelector('.nav .wrapper').style.transform = "translateX(0)"
      else if(!document.querySelector('.nav .wrapper').contains(e.target))
        document.querySelector('.nav .wrapper').style.transform = "translateX(-100%)"
    }
    window.onscroll = (e) => {
      let scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      if(scrollTop > 80)
        document.querySelector('.nav').style.opacity = 0.5
      else
        document.querySelector('.nav').style.opacity = 1
    }
  },
  components:{
    wrapper
  }
}
</script>

<style scoped>
.nav{
  z-index: 99;
  position: fixed;
  top: 0;
  height: 60px;
  width: 100vw;
  background-color: #ffffff;
  box-shadow: var(--box-shadow2);
  display: flex;
  align-items: center;
  padding: 1em;
  user-select: none;
}
.nav i{
  font-size: 1.5em;
  color: var(--font-dark-remark);
}

/* 侧边导航栏样式 */
.nav .wrapper{
  z-index: 999;
  position: fixed;
  left: 0;
  top: 0;
  width: 60%;
  height: 100vh;
  padding: 20px 5px;
  transition: var(--transition-speed);
}

.nav .logo{
  cursor: default;
  flex: 1;
  display: flex;
  align-items: center;
}
.nav .logo .menu{
  display: none;
}
.nav .log .white{
  flex: 1;
}
.nav .logo .link{
  color: var(--font-dark3);
  display: flex;
  align-items: center;
  transition: var(--hover-speed);
  cursor: pointer;
}
.nav .logo .link h3{
  margin-top: -5px;
  white-space: nowrap;
}
.nav .logo .link:hover h3{
  color: var(--green2);
} 
.nav .logo .link .xuehua{
  margin-right: 10px;
  font-size: 2em;
  color: var(--green1);
  text-shadow: 0 0 5px var(--green1);
  cursor: pointer;
}

.nav .search{
  margin-right: 1em;
  height: 100%;
  background-color: #FFFFFF;
  display: flex;
  align-items: center;
  transition: var(--transition-speed);
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
  transition: var(--transition-speed);
}
.nav .search .searchRes{
  position: absolute;
  top: 50px;
  width: 100%;
  background-color: #FFFFFF;
  box-shadow: var(--box-shadow2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  overflow: hidden;
}
.nav .search .searchRes .item{
  margin: 5px;
  padding: 5px 0;
  cursor: pointer;
  border-radius: 5px;
}
.nav .search .searchRes .item:hover{
  background-color: rgba(90,216,166,0.5);
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

@media (max-width:900px){
  .nav .logo{
    flex: 0;
  }
 .nav .search{
   flex: 1;
 }
}

@media (max-width:720px){
  .nav{
    padding: 10px 0 10px 10px;
  }
  
  .nav .logo .menu{
    display: block;
    margin-right: 20px;
  }
  .nav .logo .xuehua,.nav .logo .white{
    display: none;
  }
  
  .nav .search{
    z-index: 999;
    max-width: 300px;
    width: 0;
    position: absolute;
    right: 3em;
    margin-right: 0;
  }
  .nav .search i{
    cursor: pointer;
  }
  .nav .search input{
    border-color: transparent;
    max-width: 300px;
  }
  .nav .search.active{
    width: 70%;
    right: 5px;
  }
  .nav .search.active input{
    border-color : #d9d9d9;
  }
  
  .nav .right{
    display: none;
  }
}
</style>
