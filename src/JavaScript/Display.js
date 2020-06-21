//翻页功能
function paging(num,array) {
    $(".pagination li.active").removeClass("active");   //切换高亮
    $("#page" + num).addClass("active");
    $(".result").hide();    //先隐藏
    for (let i = num * 4; i < num*4+4; i++) {
        let j = i - num * 4;
        let result = "div.result-"+j;
        let ImageId = array[i]["ImageID"];
        $(result).show();   //若数量足够则显示
        $(result+" div.image").css("background-image", "url(\"../../images/travel-images/" + array[i]['PATH'] + "\")");
        $(result+" button").attr("value",ImageId);
        $(result+" h3").text(array[i]["Title"]);
        if (!array[i]["Description"]){
            $(result+" div.word p").text("This guy is lazy so he write nothing.");
        }else
            $(result+" div.word p").text(array[i]["Description"]);
        $(result+" div.image").click(function () {   //跳转
            $(location).attr("href","Details.html?ImageID="+ ImageId);
            return false;
        })
    }
}
//  展示功能，与浏览页功能类似
function display(array){
    $(".pagebutton").show();
    $(".pagination").append("<li id='prev'><a href=\"#\">&laquo;</a></li>");
    $(".pagination").append("<li id=\"page0\" value='0' class=\"active\"><a href=\"#\">1</a></li>");
    $("#page0").on("click", function () {
        paging(0, array)
    });
    $("#prev").on("click", function () {
        let x = $(".pagination li.active").val();
        if (x == 0) return;
        else paging(x - 1, array);
    });
    let i = 0;
    for (; i < array.length; i++) {
        if (i < 4) {
            let result = "div.result-" + i;
            let ImageId = array[i]["ImageID"];
            $(result).show();
            $(result+" div.image").css("background-image", "url(\"../../images/travel-images/" + array[i]['PATH'] + "\")");
            $(result+" button").attr("value",ImageId);  //给该图片下的按钮赋value属性的值（可以用自定义属性代替
            $(result+" h3").text(array[i]["Title"]);
            if (!array[i]["Description"]){
                $(result+" div.word p").text("This guy is lazy so he write nothing.");
            }else
                $(result+" div.word p").text(array[i]["Description"]);
            $(result+" div.image").click(function () {
                $(location).attr("href","Details.html?ImageID="+ ImageId);
                return false;
            })
        }
        if (i > 0 && 4 * i < array.length&&i<5) {
            let num = i;
            $(".pagination").append("<li id=\"page" + num + "\" value='" + num + "'><a href=\"#\">" + (num + 1) + "</a></li>");
            $("#page" + num).on("click", function () {
                paging(num, array)
            });
        }
    }
    $(".pagination").append("<li id='next'><a href=\"#\">&raquo;</a></li>");
    $("#next").on("click", function () {
        let x = $(".pagination li.active").val();
        if (x == Math.floor(i / 4) || x == 4) return;
        else paging(x + 1, array);
    });
}