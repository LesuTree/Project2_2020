//  翻页功能
function paging(num,array) {
    $("div.thumb").hide();
    $(".pagination li.active").removeClass("active");
    $("#page" + num).addClass("active");
    let i = 0;
    for (i = num * 12; i < array.length; i++) {
        let j = i - num * 12;
        let thumb = "div.thumb-" + j;
        if (j < 12) {
            $(thumb).css("background-image", "url(\"../../images/small/" + array[i]['PATH'] + "\")"); //修改图片
            $(thumb).show();
            let url = 'Details.html?ImageID='+array[i]["ImageID"];
            $(thumb).click(function () {    //点击后进入相应详情页
                $(location).attr("href",url);
                return false;
            });
        }
    }
}
// 搜索后展示
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
//  筛选搜索功能
function browseSearch(x,y,z) {  //根据主题，国家城市进行选择
    $("div.thumb").hide();
    $(".pagination").empty();
    $("div#show h2").remove();
    $("#show").show(); //显示搜索结果
    $.get("../PHP/Browse_Filter.php",
        {
            content: x,
            country: y,
            city: z
        },
        function (data) {
            // 未搜索到相应照片
            if (data=="NULL"){
                $("div#show").append("<center><h2>很抱歉，未搜索到相关照片</h2></center>");
            }else {
                let array = JSON.parse(data);
                display(array);
            }
        })
}
// 二级联动功能
// function linkage(){
//     $("#city").empty();
//     $("#city").append("<option value=\"\">None</option>");
//     $.get("../PHP/Browse_Linkage.php",
//         {
//             country: $("#country option:selected").val()
//         },
//         function (data) {   //根据所选的国家找出存在照片的城市
//             let arr = JSON.parse(data);
//             for (let i=0;i<arr.length;i++){
//                 $("#city").append("<option value="+arr[i]["GeoNameID"]+">"+arr[i]["AsciiName"]+"</option>");
//             }
//         })
// }
// 两级联动
function linkage(){
    $("#city").empty();
    $("#city").append("<option value=''>None</option>");
    $.get("../PHP/Upload_Linkage.php",
        {
            country: $("#country option:selected").val()
        },
        function (data) {
            let arr = eval(data);
            for (let i=0;i<arr.length;i++){
                $("#city").append("<option value="+arr[i]["GeoNameID"]+">"+arr[i]["AsciiName"]+"</option>");
            }
        })
}
$(document).ready(function () {
    $(".thumb").hide();
    $("#show").hide();
    $("#hotContent0").on("click",function () {
        browseSearch("Scenery","","");
    })
    $("#hotContent1").on("click",function () {
        browseSearch("People","","");
    })
    $("#hotContent2").on("click",function () {
        browseSearch("City","","");
    })
    $("#hotContent3").on("click",function () {
        browseSearch("Building","","");
    })

    //初始化热门，按数量最多的排序
    $.get("../PHP/Browse_Init.php",function(data){
        let arr = JSON.parse(data);
        for (var count=0;count<4;count++){
            let country = arr[0][count]["ISO"];
            $("#hotCountry"+count).text(arr[0][count]["CountryName"]);
            $("#hotCountry"+count).on("click",function () { //点击后筛选相关国家照片
                browseSearch("",country,"");
            });
            let city = arr[1][count]["GeoNameID"];
            $("#hotCity"+count).text(arr[1][count]["AsciiName"]);
            $("#hotCity"+count).on("click",function () {    //点击后筛选相关城市照片
                browseSearch("","",city);
            });
        }
        //筛选栏国家选项
        for (count=0;count<arr[2].length;count++){
            $("#country").append("<option value="+arr[2][count]["ISO"]+">"+arr[2][count]["CountryName"]+"</option>");
        }
    });
    $("#select").click( //根据选择进行筛选
        function () {
            browseSearch(
                $("#content option:selected").val(),
                $("#country option:selected").val(),
                $("#city option:selected").val()
            );
        }
    )
    $("form.title-search").submit(function () { //标题搜索
        $("div.thumb").hide();
        $(".pagination").empty(); //清空翻页键等
        $("div#show h2").remove();
        $.post("../PHP/Search.php",
            {
                title:$("input[type=text]").val(),
                info:""
            },
            function(data) {
                $("#show").show();
                if (data==="NULL"){      //未搜索到照片
                    $("#show").append("<center><h2>很抱歉，未搜索到相关照片</h2></center>");
                }else {
                    let array = eval(data);
                    display(array);
                }
            });
        return false;
    });
})