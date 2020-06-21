function display(array){

    $(".pagebutton").show();    //显示翻页键
    $(".pagination").append("<li id='prev'><a href=\"#\">&laquo;</a></li>");
    $(".pagination").append("<li id=\"page0\" value='0' class=\"active\"><a href=\"#\">1</a></li>");
    $("#page0").on("click", function () {
        paging(0, array)
    });
    $("#prev").on("click", function () {
        let x = $(".pagination li.active").val();
        if (x === 0) return;     //如果是第一页则不变
        else paging(x - 1, array);  //向前翻页
    });
    let i;
    for (i = 0; i < array.length; i++) {
        let thumb = "div.thumb-" + i;
        if (i < 12) {
            $(thumb).css("background-image", "url(\"../../images/small/" + array[i]['PATH'] + "\")");
            $(thumb).show();
            let url = "Details.html?ImageID="+array[i]["ImageID"];
            $(thumb).click(function () {       //点击后进入详情页
                $(location).attr("href",url);
                return false;
            });
        }
        if (i > 0 && 12 * i < array.length && i < 5) {  //根据搜索结果设置翻页键
            let num = i;
            $(".pagination").append("<li id=\"page" + num + "\" value='" + num + "'><a href=\"#\">" + (num + 1) + "</a></li>");
            $("#page" + num).on("click", function () {
                paging(num, array)
            });
        }
    }
    $(".pagination").append("<li id='next'><a href=\"#\">&raquo;</a></li>");    //向后翻页
    $("#next").on("click", function () {
        let x = $(".pagination li.active").val();
        if (x === Math.floor(i / 12) || x === 4) return;  //若到第五页或超过最大页数则返回
        else paging(x + 1, array);
    });
}
$(document).ready(function () {
    $(".pagination").empty();
    $(".result").hide();
    $.post("../PHP/Detection.php", function (status) {
        if (status==='Visitor'){ //同收藏页
            alert("请先登录哦");
            $(location).attr("href","../../index.html");
        }
        else{
            $.get("../PHP/Photograph.php",  //初始化
                function (data) {
                    if (data==="NULL"){
                        let $tip = $("<center><a href='../HTML/Upload.html'><h2>您还未上传任何照片，赶紧去上传一张吧!</h2></a></center>");
                        $("div.panel").append($tip);
                    }
                    else {
                        let array = JSON.parse(data);
                        display(array);
                    }
                })
        }
    })
    $(".modify").click(function () {    //点击修改按钮后进入修改页
        let url = 'Upload.html?ImageID=' + $(this).attr("value");
        $(location).attr("href",url);
    });
    $(".delete").click(function () { //点击后删除相应图片
        let ImageID = $(this).attr("value");
        $.post("../PHP/Photograph_Delete.php",
            {
                ImageID:ImageID
            },
            function (data) {
                if (data==='Success'){
                    alert("删除成功");
                    window.location.reload();
                }
                else alert("Error发生");
            })
    })

})