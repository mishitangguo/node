const http = require("https");

// 案例：获取第三方接口数据


// 数据库
var mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/blog1850",{useNewUrlParser:true});
var db = mongoose.connection;
db.once("open",function(callback){
    console.log("数据库连接成功");
})
// 数据骨架

let musicSchema =  mongoose.Schema({
    "author": String,
    "link": String,
    "pic": String,
    "type": String,
    "title": String,
    "lrc": String,
    "songid": Number,
    "url": String
})

let Music = mongoose.model("Musichttp",musicSchema);


// 数据api连接
var url = `https://api.apiopen.top/searchMusic?name=%E5%91%A8%E6%9D%B0%E4%BC%A6`;

http.get(url,(res)=>{
    var data = ""; //接口数据 -- 字符串
    // 数据接收一段一段，拼接数据
    res.on("data",(chunk)=>{
        data += chunk;
    })
    res.on("end",()=>{
        // 字符串转json
        let json = JSON.parse(data);
        // 导入数据库
        // console.log(json.result);
        var musicJson = json.result;

        for(var key in musicJson){
            Music.insertMany(musicJson[key],function(err,doc){
                console.log(doc[0].title + "---" +doc[0]._id);
            })
        }








    })
}).on("error",()=>{
    console.log("获取数据失败！！！");
})
