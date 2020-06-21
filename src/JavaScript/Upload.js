//预览图
function showFile() {
    let file  = $('#file').prop("files")[0];
    /*读取上传文件*/
    let reader  = new FileReader();
    /*将网页种空图片的src改成上传文件*/
    reader.onloadend = function () {
        $('#img').attr("src",reader.result);
    }
    if (file) {
        reader.readAsDataURL(file);
    } else {
        $('#img').attr("src",'');
    }
};
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
// 修改界面选择默认城市
function linkage(CityCode){
    $("#city").empty();
    $("#city").append("<option value=''>None</option>");
    $.get("../PHP/Upload_Linkage.php",
        {
            country: $("#country option:selected").val()
        },
        function (data) {
            let arr = JSON.parse(data);
            for (let i=0;i<arr.length;i++){
                if (arr[i]["GeoNameID"]===CityCode){ //若城市号码相同则选中
                    $("#city").append("<option value="+arr[i]["GeoNameID"]+" selected>"+arr[i]["AsciiName"]+"</option>");
                }
                else  $("#city").append("<option value="+arr[i]["GeoNameID"]+">"+arr[i]["AsciiName"]+"</option>");
            }
        })
}
$(document).ready(function () {
    $.post("../PHP/Detection.php", function (status) {
        if (status==='Visitor'){
            alert("你怎么做到的？");
            $(location).attr("href","../../index.html");
        }
    });
    $.get("../PHP/Upload_Init.php", function (data) {   //初始化国家选项
        let arr = JSON.parse(data);
        for (let count = 0; count < arr.length; count++) {
            $("#country").append("<option value=" + arr[count]["ISO"] + ">" + arr[count]["CountryName"] + "</option>");
        }
    });

    var submit = true;
    $("#image-title").change(
        function () {
            if (!$("#image-title").val()) { //标题不能为空
                submit = true;
                $("#titleWarn").text("*");    //警告
                $("#titleWarn").css("color","red");
            }
            else {
                $("#titleWarn").text("✔");    //通过
                $("#titleWarn").css("color", "green");
                submit = false;
            }
        }
    );
    $("#image-information").change(
        function () {
            if ($("#image-information").val()!='') {  //若有填写简介则显示可行
                $("#infoWarn").text("✔");
                $("#infoWarn").css("color", "green");
            }
            else $("#infoWarn").text("");
        }
    )
    $("form").submit(function(event){   //不填写标题就无法提交表格
        if(submit){
            event.preventDefault();
        }
    });

    let ImageId = window.location.search.indexOf("=");
    if (ImageId!=-1) {  //进入修改界面
        ImageId = window.location.search.substring(ImageId + 1);
        $("#file").remove();    //不让修改图片
        $(".btn-success").text("修改");   //变更按钮文字
        $("form.form-horizontal").attr("action", "../PHP/Modify.php?id=" + ImageId);    //修改表单提交地址
        $.get("../PHP/Modify_Init.php", //初始化
            {
                ImageID: ImageId
            },
            function (data) {
                let arr = JSON.parse(data); //标题，简介，主题，国家，城市
                $("img").attr("src", "../../images/travel-images/" + arr["PATH"]);
                $("#content option[value=" + arr['Content'] + "]").prop("selected", true);
                $("#country option[value=" + arr['CountryCodeISO'] + "]").prop("selected", true);
                $("#image-title").val(arr['Title']);
                $("#titleWarn").text("✔");
                $("#titleWarn").css("color", "green");
                $("#image-information").val(arr['Description']);
                if ($("#image-information").val() != '') {
                    $("#infoWarn").text("✔");
                    $("#infoWarn").css("color", "green");
                }
                if (arr['CityCode']){
                    linkage(arr['CityCode']);
                }
                else linkage();
                submit = false;
            })
    }
})