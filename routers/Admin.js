var express = require("express");
var formidable = require("formidable")
var md5 = require("../function/md5");
var router = express.Router();
var path = require("path")
var sd = require("silly-datetime");






var User = require("../models/User");
var Category = require("../models/Category");
var Details = require("../models/Details");
var Nusic = require("../models/Nusic")
var Picture = require("../models/Picture")


var data = {
    userinfo: {},
    result: {}
}
router.post("/login", function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            res.render("Admin/err", { err: "请输入正确用户名密码", url: "/admin/login", date: 3000 });
        }
        // 登陆数据验证
        let fieldsdata = md5(fields);
        if (!fieldsdata) {
            res.render("Admin/err", { err: "请输入正确用户名密码", url: "/admin/login", date: 3000 });
        }
        // 数据库验证
        User.findOne({ "username": fieldsdata.username }, function (err, result) {
            // 密码判断
            if (result != null && fieldsdata.password == result.password && result.isAdmin == true) {
                // 修改session参数
                req.session.login = "1";
                req.session.username = fieldsdata.username;
                data.userinfo = result;
                res.render("Admin/index", { data });
            } else {
                res.render("Admin/err", { err: "请输入正确用户名密码", url: "/admin/login", date: 3000 });
            }
        })

    })

})

// 验证用户是否登陆
router.use(function(req,res,next){
    if(req.session.login == "1"){
        next();
    }else{
        res.render("admin/login");
    }
})

// 退出登陆
router.get("/out", function (req, res) {
    req.session.login = 0;
    req.session.username = {};
    data.userinfo = {};
    res.render("admin/login");
})

// 后台首页
router.get("/", function (req, res) {
    res.render("Admin/index", { data });
})

// 博客分类
router.get("/category", function (req, res) {

    Category.getCategoryData({}, function (err, result) {
        data.result = result;
        res.render("Admin/category", { data });
    })

})

// 博客分类-数据添加
router.get("/category/add", function (req, res) {
    res.render("Admin/category_add", { data });
})

router.post("/category/add", function (req, res, next) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            next();
        }
        Category.insertMany({ "name": fields.name }, function (err, doc) {
            if (err) {
                next();
            }
            res.render("Admin/err", { err: "数据添加成功！！！", url: "/admin/Category", date: 3000 });
        })
    })
})
// 博客分类-数据删除
router.get("/category/del/:id", function (req, res, next) {
    console.log(req);
    var id = req.params.id;
    Category.deleteOne({ _id: id }, function (err) { //null {}
        // if(err){next()};
        console.log(err);
        res.render("Admin/err", { "err": "数据删除成功！！！", "url": "/admin/Category", "date": 3000 });
    })
})

// 博客详情
router.get("/details", function (req, res) {
    Details.getDetailsData(function (err, result) {
        data.result = result;
        res.render("Admin/details", { data });
    });
})

// 博客详情-添加页面
router.get("/details/add", function (req, res) {
    Category.find({}, function (err, result) {
        data.result = result;
        res.render("Admin/details_add", { data })
    })
})

// 博客详情-添加数据
router.post("/details/add", function (req, res) {
    var form = new formidable.IncomingForm();


    form.parse(req, function (err, fields, files) {
        Details.insertMany({
            category: fields.category,
            content: fields.content,
            description: fields.description,
            title: fields.title
        }).then(function (err) {
            res.render("Admin/err", { "err": "数据添加成功！！！", "url": "/admin/details", "date": 3000 });
        })
    })
})
// 博客详情-修改页面
router.get("/details/edit/:id", function (req, res) {
    var id = req.params.id;
  
    // MVC
    Category.getCatagoryAmdDetails(id, function (categorydata, detailsdata) {
        data.result = categorydata;
        res.render("Admin/details_edit", { data, info: detailsdata })
    })
})
// 博客详情-修改数据
router.post("/details/edit", function (req, res) {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
        if (err) {
            console.log("修改数据");
        }
        console.log(fields);
        Details.updateIdData(fields, function (result) {
            res.render("Admin/err", { "err": "数据修改成功！！！", "url": "/admin/details", "date": 3000 });
        })

    })
})
// 博客详情-数据删除
router.get("/details/del/:id", function (req, res, next) {
    var id = req.params.id;
    Details.deleteOne({ _id: id }, function (err) { //null {}
        // if(err){next()};
        console.log(err);
        res.render("Admin/err", { "err": "数据删除成功！！！", "url": "/admin/details", "date": 3000 });
    })
})


//音乐
router.get("/music", function (req, res) {
    Nusic.getNusicData({}, function (err, result) {
        data.result = result;
        res.render("Admin/music", { data });
    })

})
//音乐上传
router.get("/music/add", function (req, res) {
    res.render("Admin/music_add", { data })
})

router.post('/music/add', function (req, res) {
    var form = new formidable.IncomingForm();
    // form.keepExtensions = true;
    form.maxFieldsSize = 20 * 1024 * 1024;
    // form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.uploadDir = "./public/mp3";
    form.parse(req, function (err, fields, files) {
        var oldPath = path.basename(files.music.path);
        var oldPath1 = "/mp3/" + oldPath;
        var tupian = path.basename(files.putian.path);
        var tupian1 = "/mp3/"+tupian
        Nusic.insertMany({
            pic:tupian1,
            music: oldPath1,
            title: fields.title,
            singer: fields.singer,
            description: fields.description
        }).then(function (err) {
            res.render("Admin/err", { "err": "上传成功！！！", "url": "/admin/music", "date": 3000 })
        })
    })

})

//图片
router.get("/picture", function (req, res) {
    Picture.getpictureData({},function(err,result){
        data.result = result;
        res.render("Admin/picture", { data })
    })
    
})
router.get("/picture/add", function (req, res) {
    res.render("Admin/picture_add", { data })
})
router.post("/picture/add",function(req,res){
    var form = new formidable.IncomingForm();
    form.maxFieldsSize = 20 * 1024 * 1024;
    // form.encoding = 'utf-8';
    form.keepExtensions = true;
    form.uploadDir = "./public/imga";
    form.parse(req,function(err,fields,files){
        var oldPath = {};
      
        oldPath = files.public;
        
        console.log(rus)
    })



//单图片上传
    form.parse(req, function(err,fields,files){
        var oldPath = path.basename(files.public.path);
        console.log(files.public);
        var oldPath1 = "/imga/" + oldPath
        Picture.insertMany({
            url:oldPath1
        }).then(function(err){
            res.render("Admin/err", { "err": "上传成功！！！", "url": "/admin/picture", "date": 3000 })
        })
 
    })

   
})

router.use(function(req,res){
    res.render("Admin/index");
})

module.exports = router;