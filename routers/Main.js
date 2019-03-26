var express = require("express");
var router = express.Router();
var markdown = require( "markdown" ).markdown;

// 数据库
var User = require("../models/User");
var Category = require("../models/Category");
var Details = require("../models/Details");
var Nusic = require("../models/Nusic");
var Musichttp = require("../models/Musichttp");


var data;

// 通用数据过滤
router.use(function(req,res,next){
    
    // 判断前台是否有登陆
    data = {
        userinfo:req.session.userinfo || null,
        categories:[],
        categoryId:""
    }
    // 获取分类数据
    Category.getCategoryData({},function(err,result){
        data.categories = result;
        next();
    })


})



router.get("/",function(req,res){
    // 获取url数据
    data.categoryId = req.query.category || "";
    var where = {};
    if(data.categoryId){
        where.category = data.categoryId;
    }


    // 获取内容列表
    Details.find(where).then(function(contents){

        for(var key in contents){
            contents[key].description = markdown.toHTML(contents[key].description);
        }

        data.contents = contents;

        res.render("Main/index",{data});
    })

})


// 更多内容
router.get("/view",function(req,res){
    var contentid = req.query.contentid;
    Details.findOne({_id:contentid}).then(function(result){
        result.description = markdown.toHTML(result.description);
        data.contents = result;
        res.render("Main/view",{data});
    })
})

//个人上传音乐播放器
router.get("/player",function(req,res){
    Nusic.getNusicData({}, function (err, result) {
        data.result = result;
        res.render("Main/music_player", { data });
    })
})
//音乐播放器
router.get("/palayerhttp",function(req,res){
    Musichttp.getMusichttp({},function(err,result){
        data.result = result;
        res.render("Main/music_playerhttp",{data});
    })
})

// 列表页
router.get("/list",function(req,res){
    res.send("前台列表页");
})
// 详情页
router.get("/content",function(req,res){
    res.send("前台详情页");
})

module.exports = router;