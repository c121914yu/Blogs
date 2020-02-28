[整体结构](#1)  


[分类构思](#2)  


[全局样式](#3)  


&emsp;[颜色](#3-1)  


&emsp;[字体](#3-2)  


&emsp;[其他](#3-3)  


[后续](#4)  


articleLine

## <span id="1" class="title">1 整体框架</span>
>vuecli + express + axios 

&emsp;&emsp;[源码](https://github.com/c121914yu/Blogs) master分支是前端代码，server为后端代码，数据库需要修改成自己的。第一版有蛮多BUG的，希望发现的小伙伴可以帮指出下（email： **545436317@qq.com**）  
&emsp;&emsp;没有用很复杂的框架，也没用到UI库大部分样式都是手写的。整体样式参照了某位不知名群友的博客，看了他的设计后感觉挺好看的，于是也仿照着搭了起来。只实现了基本展示功能，一些互动功能后续也会添加进去。  
- - -
&emsp;&emsp;个人博客这个项目很早之前就想弄了，大一暑假刚开始学习vuecli框架时老师就有一节博客的实战Demo，不过那个主要是用来学习搜索筛选功能的。后来也尝试着搭了下，不过那时候前端刚学不久，很多样式都不会设计，于是弄了几天后没啥成果，就这么耽搁了。开学后基本都是以学习新内容为主，实战Demo就比较少了。这个寒假从老师那学了20多节的css后进步了不少，于是趁此机会将遗憾补上。——废话就到这了hh
## <span id="2" class="title">2 分类构思</span>
&emsp;&emsp;包含4种分类方式，不只是记录学习更要记录生活。
>1. 搜索（必备）
>2. categeroy（按文章内容分）  
>2.1 日记  
>2.2 游记  
>2.3 技术  
>3. tag（按文章标签分）例如：  
>3.1 javascript  
>3.2 html  
>3.3 张家界  
>3.4 摄影……  
>4. timeLine（按发布时间分）

&emsp;&emsp;以后还想开辟一个工具栏，放点计算器啊（什么三角函数啊积分啊啥的）写作业遇到这种难搞的计算天天要百度找计算器。

## <span id="3" class="title">3 全局样式</span>
&emsp;&emsp;考虑到以后可能对内容修改较频繁，所以统一了整个博客的颜色及字体样式。
### <span id="3-1" class="title">3.1 颜色</span>
![博客色调](https://img-blog.csdnimg.cn/20200227193053425.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3lqbHRvcA==,size_16,color_FFFFFF,t_70)
颜色取自于站酷的一个可视化表。其中绿色作为最主要颜色，用于部分文本的效果颜色，另外常规颜色为：
>常规 #2C3E50  
>灰色 #909399  
>黑色 #333333 #262626  
>白色 #FFFFFF #F4F4F4  

### <span id="3-2" class="title">3.2 字体</span>
```css
*{
  font-weight : 400;
  font-size : 16px;
  line-height: 1.5;
}
h1{
  font-size: 2em;
  font-weight: 500;
  letter-spacing: 2px;
}
h2{
  font-size: 1.6em;
  font-weight: 500;
  letter-spacing: 2px;
}
h3{
  font-size: 1.3em; 
  font-weight: 500;
}
@media  (max-width:720px){
  h1{
    font-size: 1.6;
    font-weight: 500;
    letter-spacing: 1px;
  }
  h2{
    font-size: 1.4rem;
    font-weight: 500;
    letter-spacing: 1px;
  }
  h3{
    font-size: 1.2rem; 
    font-weight: 500;
    letter-spacing: 1px;
  }
}
```
### <span id="3-3" class="title">3.3 其他</span>
>一级边框  1px solid #d9d9d9  
>二级边框  1px solid #eaecef  
>小圆角 5px  
>大圆角 10px  
>普通阴影  1px 1px 8px #d9d9d9,0 0 7px #d9d9d9  
>浅色阴影 0 2px 10px 0 rgba(0, 0, 0, 0.15)  
>滚动条宽度 10px  
>滚动条高度 7px  
>滚动条颜色 #bfbfbf  

## <span id="4" class="title">4 后续</span>
&emsp;&emsp;赶着第一篇文章做测试，水了些，而且编辑的模式不是很熟悉，或者说这样的编辑模式不是很好，现在是采用markdown编辑后转成html展示，原本是应用github的样式，但是发现不太满意，在做自定义样式时会被github的样式给覆盖，于是markdown的样式也自己写了，同时使用了highlight.js库使引用代码高亮。  
&emsp;&emsp;后续会继续更新博客项目的一些细节……