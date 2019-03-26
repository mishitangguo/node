$(function(){
    // 前台注册
    $("#zhuce").click(function(){
        var input = $(this).parent();
        var username = input.find("input[name='username']").val();
        var password = input.find("input[name='password']").val();
        var password2 = input.find("input[name='password2']").val();
        // if(username == "" && password == "" && password2 == ""){
        //     return false;
        // }
        $.ajax({
            url:"/api/register",
            type:"post",
            data:{
                username:username,
                password:password,
                password2:password2
            },
            success:function(data){
                // {code: 0, message: "注册成功"}
                console.log(data);
                if(data.code != "0"){//注册失败
                    input.append('<div class="alert alert-danger" role="alert">' + data.message + '</div>');
                }else{
                    input.append('<div class="alert alert-success" role="alert">' + data.message + '</div>');
                }
                hiddens();
            }
        })
    })

    // 前台登陆
    $("#login").click(function(){
        var input = $(this).parent();
        var username = input.find("input[name='username']").val();
        var password = input.find("input[name='password']").val();
        // if(username == "" && password ==""){
        //     return false;
        // }

        $.ajax({
            url:"/api/login",
            type:"post",
            data:{
                username:username,
                password:password
            },
            success:function(data){
                console.log(data);
                if(data.code != 0){//注册失败   
                    input.append('<div class="alert alert-danger" role="alert">' + data.message + '</div>');
                }else{
                    input.hide();
                    // 信息部分
                    $(".userInfo")
                    .show()
                    .find("span")
                    .text(data.userinfo.username)
                    .attr("data-id",data.userinfo.id);
                    // 判断是否为管理员
                    if(!data.userinfo.isAdmin){
                        $(".userInfo h4").eq(0).hide();
                    }
                }

                hiddens();

            }
        })
    })

    // 退出登陆
    $("#out").click(function(){
        $.ajax({
            url:"/api/out",
            success:function(data){
                console.log(data); //0
                if(data.code == "0"){
                    location.reload();//刷新页面
                }
            }
        })
    })

    function hiddens(){
        setTimeout(function(){
            $(".alert").hide();
        },2000);
    }
})