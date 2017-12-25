## IFP内管项目结构 ##
![结构图](http://i.imgur.com/hpd84uB.png)

### src 目录 ###
> assets目录

   内部放置图片，字体，样式文件

> components目录

   内部放置各个组件，自己封装的组件，比如搜索框inputSearch他出现很多次，功能单一，只要提供方法和回调，就够了，避免重复写一样的代码

> constants目录
    
   放置应用的api

> core目录
    
   应用的核心部分

> entry目录
    
   入口文件

> globals目录
    
   定义一些全局使用的路径，菜单和菜单项

> layouts目录
    
   应用的整体布局部分

> middleware目录
    
   应用中间件部分，其中包含一个请求的封装文件

> reducers目录
    
   reducer函数目录

> routes目录
    
   应用路由目录

> store目录
    
   store仓库目录

> utils目录
    
   都是一些工具方法，比如那个filter就是处理数据的，比如判断是不是object，字符串转json；authButton是某些按钮有权限的，必须校验过才能确定是否显示

> views目录
    
   开发使用到的目录，包括各个页面的UI组件以及其对应container组件


### 具体开发流程 ###
先把视图写出来，就是jsx那块，可以自己造mock数据先实现，然后再reducer里写request和action，state，最后连接一下

1. 先在views文件夹里面写视图
2. 然后在reducer根目录下写state，每个业务页面对应一个
3. 写好了之后在routes文件夹写路由那里注入，在main里每个业务页面一个路由，根目录下的index.js是路由汇总配置
4. 在reducers/request中写请求；reducers/common的都是公用部分，一般作用于全局，相当于一针线，把全部业务页面串联起来
5. 基本上，搞定了view，reducer、路由注入，新功能差不多就写好了

