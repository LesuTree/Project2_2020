$(document).ready(function(){
    var submit = false; //先定义一个全局变量
    $("#User").change(function () {
        if(!/^[\w\u4e00-\u9fa5]{4,}$/.test($("#User").val())){  //检查用户名规范
            submit = true;
            $("#userWarn").text("只能使用字母,数字,下划线和汉字作为用户名,且长度大于等于4");
            $("#userWarn").css("color","red");
        }
        else{
            $("#userWarn").text("✔");
            $("#userWarn").css("color","green");
            submit = false;
        }
    });
    $("#Email").change(function () {    //检查邮箱规范
        if(!/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test($("#Email").val())){
            submit = true;
            $("#emailWarn").text("邮箱格式错误");
            $("#emailWarn").css("color","red");
        }
        else{
            $("#emailWarn").text("✔");
            $("#emailWarn").css("color","green");
            submit = false;
        }
    })
    $("#pass").change(function () { //检查密码
        let confirm = false;
        if (!/^\w{8,}$/.test($("#pass").val())){    //密码规范性
            submit = true;
            $("#passwordWarn").text("密码不规范,请使用8位及以上的字母、数字、下划线组成密码");
            $("#passwordWarn").css("color","red");
        }
        else{
            submit = false;
            confirm = true;
            $("#passwordWarn").text("✔");
            $("#passwordWarn").css("color","green");
        }
        if (confirm){   //检查两次密码一致性
            if($("#pass").val()== $("#confirm").val()){
                $("#confirmWarn").text("✔");
                $("#confirmWarn").css("color","green");
                submit = false;
            }
            else {
                submit = true;
                $("#confirmWarn").css("color","red");
                $("#confirmWarn").text("密码不一致");
            }
            $("#confirm").change(function () {
                if($("#pass").val()!= $("#confirm").val()||!confirm){
                    submit = true;
                    $("#confirmWarn").css("color","red");
                    $("#confirmWarn").text("密码不一致");
                }
                else{
                    $("#confirmWarn").text("✔");
                    $("#confirmWarn").css("color","green");
                    submit = false;
                }
            })
        }
        else {
            $("#confirmWarn").css("color","red");
            $("#confirmWarn").text("×");
        }
    })
    $("form").submit(function(event){   //提交表单
        if(submit){
            event.preventDefault();
        }
    });
});