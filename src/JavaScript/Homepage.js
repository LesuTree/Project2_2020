// 展示图片的函数
function display(arr){
    for(let i = 0;i<arr.length;i++){
        let select = ".display-"+i;
        $(select).show();   //显示图片
        $(select+" div.img").css("background-image", "url(\"images/small/" + arr[i]['PATH'] + "\")");
        $(select+" h4").text(arr[i]["Title"]);
        if (!arr[i]["Description"]) //图片简介
            $(select+" p").text("This guy is lazy so he write nothing.");
        else
            $(select+" p").text(arr[i]["Description"]);
        $(select).click(function () {   //点击后跳转至相应详情页
            let url = 'src/HTML/Details.html?ImageID='+arr[i]["ImageID"];
            $(location).attr("href",url);
            return false;
        })
    }
}
$(document).ready(function(){
    $(".display").hide();   //初始化，先全部隐藏
    $.post("./src/PHP/Detection.php",function (status) {    //判断浏览者是否登录
        if (status === "Visitor"){
            $(".dropdown-toggle").text("登录");
            $(".dropdown-toggle").click(function () {
                $(location).attr("href","./src/HTML/Login.html");
                return true;
            })
            $(".dropdown-menu").hide();
        }
    })
    $.get("src/PHP/Homepage_Init.php",function(data){   //初始化今日推荐
        let arr = JSON.parse(data);
        display(arr);
    })
    $(".fresh").click(function () {   //刷新
        $.get("src/PHP/Homepage_Refresh.php",function(data) {
            let arr = JSON.parse(data);
            display(arr);
        })
    })
});