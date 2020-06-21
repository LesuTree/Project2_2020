<?php
$servername = "localhost";
$username = "LesuTree";
$password = "20021001a.";
$dbname = "19ss_project2_new";
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}
session_start();
$url = "../HTML/Upload.html";
//图片信息
$title = isset($_POST['image-title']) ? htmlspecialchars($_POST['image-title']) : '';
$info = isset($_POST['image-information']) ? htmlspecialchars($_POST['image-information']) : '';
$content = isset($_POST['content']) ? htmlspecialchars($_POST['content']) : '';
$country = isset($_POST['country']) ? htmlspecialchars($_POST['country']) : '';
$city = isset($_POST['city']) ? htmlspecialchars($_POST['city']) : '';
$path = "../../images/travel-images/";
$uid = $_SESSION["UID"];

if ($_FILES["file"]["error"] > 0) {
    echo "错误：: " . $_FILES["file"]["error"] . "<br>";
}
else {
    // 判断当前目录下是否存在该文件
    if (file_exists(" ../../images/travel-images/" . $_FILES["file"]["name"]))
    {
        echo " 文件已经存在."."<br>";
    }
    else {
        // 如果目录不存在该文件则将文件上传到目录下
        move_uploaded_file($_FILES["file"]["tmp_name"], $path.$_FILES["file"]["name"]);
        echo "上传成功"."<br>";
    }
    $filename = $_FILES["file"]["name"];
    //往数据库中插入记录
    if($city!='') {
        $sql = "INSERT INTO travelimage
                (Title, Description, CityCode, CountryCodeISO, UID, PATH, Content)
                VALUES('{$title}','{$info}','{$city}','{$country}','{$uid}','{$filename}','{$content}')
                ";
    }
    else{
        $sql = "INSERT INTO travelimage
                (Title, Description, CityCode, CountryCodeISO, UID, PATH, Content)
                VALUES('{$title}','{$info}',NULL,'{$country}','{$uid}','{$filename}','{$content}')
                ";
    }
    if ($conn->query($sql) === TRUE) {
        $url = "../HTML/Photograph.html";
        echo "正在跳转";
    }else{
        echo "Error发生";
    }
}

mysqli_close($conn);
?>
<html>
<head>
    <meta   http-equiv = "refresh"   content ="1;  url = <?php echo $url;  ?>" >
</head>
<body>
</body>
</html>