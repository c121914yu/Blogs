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
      <div class="item" :class="current === 0 ? 'current':''">
        <i class="iconfont icon-home"></i>
        <span>Home</span>
      </div>
      <div class="item" :class="current === 1 ? 'current':''" @click.prevent="show_categeory">
        <i class="iconfont icon-menu"></i>
        <span>Categeory</span>
        <i class="iconfont icon-down down"></i>
        <div class="categeory" v-show="categeory">
          <router-link 
            class="link" 
            v-for="(item,index) in categeorys"
            :key="index"
            :to="{name:item.name}"
          >
            {{item.text}}
          </router-link>
        </div>
      </div>
      <div class="item" :class="current === 2 ? 'current':''">
        <i class="iconfont icon-tag-o"></i>
        <span>Tag</span>
      </div>
      <div class="item" :class="current === 3 ? 'current':''">
        <i class="iconfont icon-shijian"></i>
        <span>TimeLine</span>
      </div>
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
        {text : "全部",name : "home"},
        {text : "技术",name : "home"},
        {text : "日记",name : "home"},
        {text : "游记",name : "home"},
      ]
    }
  },
  methods:{
    show_categeory(){
      this.categeory = !this.categeory
      if(this.categeory)
        document.querySelector('.item .down').style.transform = "rotate(180deg)"
      else
        document.querySelector('.item .down').style.transform = "rotate(0)"
    }
  }
}
</script>

<style scoped>
.nav{
  position: sticky;
  height: 60px;
  width: 100vw;
  background-color: #ffffff;
  box-shadow: var(--box-showdow2);
  display: flex;
  align-items: center;
  padding: 0 1em;
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
.nav .right .item:last-child{
  margin-right: 0;
}
.nav .right .item:nth-child(2):hover{
  border-color: transparent;
}
/* 分类 */
.nav .right .item .categeory{
  position: absolute;
  top: 40px;
  width: 100%;
  background-color: #FFFFFF;
  box-shadow: var(--box-showdow2);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  text-align: center;
  overflow: hidden;
}
.nav .right .item .categeory .link{
  text-decoration: none;
  line-height: 2;
  letter-spacing: 2px;
}
.nav .right .item .categeory .link:hover{
  color: #4c5a55;
  background-color: rgba(90,216,166,0.5);
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
