var md5 = require("md5");

// module.exports = function(password){
//     return md5(md5(password).substr(11,7) + md5(password));
// }
//验证登陆用户名密码，用户名密码正确给密码md5加密
module.exports = function(obj){
    // { username: 'zhangsan', password: '123123' }
    var data = true;
    for(var val in obj){
        if(val == "username"){
            if(obj[val].length < 2 ||obj[val].length > 12){
                data = false;
            }
        }else if(val == "password"){
            var reg = /^[a-zA-Z0-9]\w{5,17}$/;
            if(!reg.test(obj[val])){
                data = false;
            }
        }
    }

    if(data){ //验证没有问题
        obj.password = md5(md5(obj["password"]).substr(11,7) + md5(obj["password"]));
        return obj;
    }else{
        return false;
    }
}