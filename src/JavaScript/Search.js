$(document).ready(function () {
    $(".display").hide();
    $(".search").submit(function () {
        $(".pagination").empty();
        $(".display").show();
        $(".result").hide();
        $("div.display h2").remove();
        // 按标题搜索
        if ($("input[type=radio]:checked").val()==='title'){
            $.post("../PHP/Search.php",
                {
                    title:$("input[type=text]").val(),
                    info:''
                },
                function (data) {
                    // 未搜索到相关照片时
                    if (data==='NULL') {
                        let add = $("<center><h2>很抱歉，没有查到相关照片</h2></center>");
                        $("div.display").append(add);
                    }
                    // 展示照片
                    else{
                        let arr = eval(data);
                        display(arr);
                    }
                });
        }
        // 按简介搜索
        else if ($("input[type=radio]:checked").val()==='info'){
            $.post("../PHP/Search.php",
                {
                    title:'',
                    info:$("textarea").val().trim(),
                },
                function (data) {
                    // 未搜索到相关照片时
                    if (data==='NULL') {
                        let add = $("<center><h2>很抱歉，没有查到相关照片</h2></center>");
                        $("div.display").append(add);
                    }
                    // 展示照片
                    else{
                        let arr = eval(data);
                        display(arr);
                    }
                });
        }
        return false;
    })
});