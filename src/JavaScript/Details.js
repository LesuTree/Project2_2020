$(document).ready(function () {
    let ImageID = window.location.search.indexOf("=");
    ImageID = window.location.search.substring(ImageID+1);  //获取照片ID
    $.get("../PHP/Details.php", //初始化
        {
            ImageID:ImageID
        },
        function (data) {
            let result = JSON.parse(data);  //修改拍摄者，国家，城市，主题，收藏数等
            $("img").attr("src","../../images/travel-images/"+result['PATH']);
            $(".themeTag").text("主题："+result['Content']);
            $("#photographer").text(result['UserName']);
            $(".page-header h2").text(result["Title"]);
            if (!result["Description"]) //图片简介
                $(".panel-body p").text("This guy is lazy so he write nothing.");
            else
                $(".panel-body p#word").text(result["Description"]);
            if (!result["CityName"])
                $(".cityName").text("城市：");
            else
                $(".cityName").text("城市："+result["CityName"]);
            $(".countryName").text("国家："+result["CountryName"]);
            $("#favor").text("收藏："+result['favor']);
            if(result['isFavor']){  //根据用户是否收藏修改按钮
                $("button").html("<i class=\"fa fa-heart\"></i>&#160&#160&#160已收藏");
                $("button").addClass("like");
            }
        }
    );
    $.post("../PHP/detection.php",function (status) {
        if (status=="Visitor"){ //判断登录状态
            $(".dropdown-toggle").text("登录");
            $(".dropdown-toggle").click(function () {
                $(location).attr("href","./Login.html");
                return true;
            })
            $(".dropdown-menu").hide();
            $("button").click(function () { //登录方可使用功能
                alert("请先登录");
            });
        }
        else {
            $("button").click(function () {
                if ($("button").hasClass("like")) { //根据按钮是否有like的class判别收藏或取消收藏
                    $.post("../PHP/Favor_Cancel.php",{
                        ImageID:ImageID
                    });
                    $("button").html("<i class=\"fa fa-heart\"></i>&#160&#160&#160收藏");
                    $("button").removeClass("like");
                }
                else {
                    $.post("../PHP/Favor.php",{
                        ImageID:ImageID
                    });
                    $("button").html("<i class=\"fa fa-heart\"></i>&#160&#160&#160已收藏");
                    $("button").addClass("like");
                }
            })
        }
    })
})