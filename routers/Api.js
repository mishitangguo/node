var express = require("express");
var router = express.Router();
var formidable = require("formidable");

var User = require("../models/User");
var Category = require("../models/Category");
var Details = require("../models/Details");

var md5 = require("../function/md5");

// 统一返回数据格式
var responseData;

router.use(function(req,res,next){
    responseData = {
        code:0,//为零，请求成功 1,2,3,4,5,6,7,8
        message:""//信息提示
    };
    next();
})



// 1.数据
// 2.安全验证

router.post("/register",function(req,res){
    var form  = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        if(err){
            throw new Error("错误信息");
        }
        var username = fields.username;
        var password = fields.password;
        var password2 = fields.password2;
        // 数据判断
        // 1.用户名不能为空
        if(username == ""){
            responseData.code = "1";
            responseData.message = "用户名不能为空";
            res.json(responseData);
            return;
        }
        // 2.密码不能为空
        if(password == ""){
            responseData.code = "2";
            responseData.message = "密码不能为空";
            res.json(responseData);
            return;
        }
        // 3.验证统一密码
        if(password != password2){
            responseData.code = "3";
            responseData.message = "密码不一致";
            res.json(responseData);
            return;
        }
        // 1.验证用户名是否重复--数据库
        User.findOne({
            username
        }).then(function(userinfo){
            if(userinfo){
                // 表示数据库有该数据
                responseData.code = "4";
                responseData.message = "用户名已被注册";
                res.json(responseData);
                return false;
            }
            // 验证加密数据
            var md5mima = md5({username,password});
            if(!md5mima){
                responseData.code = "4";
                responseData.message = "用户名密码格式不正确";
                res.json(responseData);
                return false;
            }
            // 用户名密码添加数据库
            var user = new User(md5mima);
            return user.save();
        }).then(function(newUserInfo){
            if(newUserInfo){
                responseData.message = "注册成功";
                res.json(responseData);
            }
        })
    })


})

// 登陆接口
router.post("/login",function(req,res){
    var form  = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files){
        if(err){
            throw new Error("错误信息");
        }
        var username = fields.username;
        var password = fields.password;
        // 数据判断
        // 1.用户名不能为空
        if(username == ""){
            responseData.code = "1";
            responseData.message = "用户名不能为空";
            res.json(responseData);
            return;
        }
        // 2.密码不能为空
        if(password == ""){
            responseData.code = "2";
            responseData.message = "密码不能为空";
            res.json(responseData);
            return;
        }
        // 3.用户名密码格式不正确
        var md5mima = md5({username,password});
        if(!md5mima){
            responseData.code = "4";
            responseData.message = "用户名密码格式不正确";
            res.json(responseData);
            return;
        }

        // 1.验证用户名密码是否与数据库一致
        User.findOne(md5mima).then(function(userinfo){
          
            if(!userinfo){//null
                responseData.code = "5";
                responseData.message = "用户名密码格式不正确";
                res.json(responseData);
            }else{
                req.session.login = "1";
                req.session.userinfo = userinfo;
                responseData.userinfo = {
                    id:userinfo.id,
                    username:userinfo.username,
                    isAdmin:userinfo.isAdmin
                };
                responseData.message = "登陆成功";
                res.json(responseData);
            }
        })
    })


})

// 退出登陆
router.get("/out",function(req,res){
    req.session.login="0";
    req.session.userinfo = null;
    res.json(responseData);
})

// 列表页
router.get("/list",function(req,res){
    res.send("api列表页");
})
// 详情页
router.get("/content",function(req,res){
    res.send("api详情页");
})

module.exports = router;