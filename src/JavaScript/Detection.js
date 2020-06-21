$(document).ready(function () {
    $.post("../PHP/Detection.php",function (status) {
        if (status=="Visitor"){  //判断浏览者是否登录
            $(".dropdown-toggle").text("登录");
            $(".dropdown-menu").hide();
            $(".dropdown-toggle").click(function () {
                $(location).attr("href","./Login.html");
                return true;
            })
        }
    })
})