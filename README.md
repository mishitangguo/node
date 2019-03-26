# 后台项目

## 文件夹介绍
<!-- MVC -->
​	app.js          入口文件
​	views           模板文件夹
        -Admin         后台页面文件夹
        -Main          前台页面文件夹
​	routers         路由文件夹
        - Admin.js 后台代码模块
        - Main.js  前台代码模块
        - Api.js   Api代码模块
​	public          公共模块文件夹
​	models          模型文件夹
​	function        公共函数文件夹
   node_modules    第三方模块

## 使用模块

​	

```shell
$cnpm i ejs express express-session markdown mongoose formidable -S
```



## 后台功能

1.后台登陆
2.用户管理
3.数据管理
​	增删改查
​	表单提交
​	图片上传
​	多图片上传
​	编辑器
​	markdown

## views设计

index.html  右下侧主板
        - header.html 头部引入样式
                - navbar.html    左侧导航
                - topNavbar.html 顶部导航
        - footer.html 尾部引入js

## 数据库操作
```
<!-- 导入数据库 -->
$mongorestore -h 127.0.0.1 --port 27017 -d blog1850 --drop 文件存在路径
<!-- 备份数据库 -->
#mongodump -h 127.0.0.1 --port 27017 -d blog1850 -o 导出存储路劲
```

## node.js报错记录
```
Error: Can't set headers after they are sent.

解决：不能多次返回res.json,res.end,res.send

```