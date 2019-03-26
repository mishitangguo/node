// 安装模块
// 配置模块
// 一步一小测
var express = require("express");
var ejs = require("ejs");
var mongoose = require("mongoose");
var session = require("express-session");



// 创建应用
var app = express();

// 静态文件
app.use(express.static("./public"));

// ejs模板配置把后缀改html
app.engine("html",ejs.__express);
app.set("view engine","html");

// session配置
app.use(session({
    secret:"keyboard cat",
    resave:false,
    saveUninitialized:true
}))

// 第一大模块：后台代码
app.use("/admin", require("./routers/Admin"));

// 第二大模块：前台代码
app.use("/", require("./routers/Main"));

// 第三大模块：API接口
app.use("/api",require("./routers/Api"));

// 判断数据库是否开启
mongoose.connect("mongodb://127.0.0.1:27017/blog1850",{useNewUrlParser:true},function(err){
    if(err){
        console.log("数据库连接失败");
    }else{
        // 服务器监听
        app.listen(3000,"127.0.0.1",()=>console.log("服务器开启成功,请访问:http://127.0.0.1:3000"));
    }
})