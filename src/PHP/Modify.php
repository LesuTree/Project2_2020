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
$url = "../HTML/Photograph.html";

//获取参数
$title = isset($_POST['image-title']) ? htmlspecialchars($_POST['image-title']) : '';
$info = isset($_POST['image-information']) ? htmlspecialchars($_POST['image-information']) : '';
$content = isset($_POST['content']) ? htmlspecialchars($_POST['content']) : '';
$country = isset($_POST['country']) ? htmlspecialchars($_POST['country']) : '';
$city = isset($_POST['city']) ? htmlspecialchars($_POST['city']) : '';

$str = $_SERVER['REQUEST_URI']; //读取URL
$start = strripos($str,"=")+1;
$ImageID = substr($str,$start); //获取图片ID

//修改数据库中该文件信息
if ($city!='') {
    $sql = "UPDATE travelimage
        SET Title = '{$title}', Description = '{$info}', CityCode = '{$city}', CountryCodeISO = '{$country}',Content= '{$content}'
        WHERE ImageID = '{$ImageID}'
        ";
}
else{
    $sql = "UPDATE travelimage
        SET Title = '{$title}', Description = '{$info}', CityCode = NULL , CountryCodeISO = '{$country}',Content= '{$content}'
        WHERE ImageID = '{$ImageID}'
        ";
}
if ($conn->query($sql) === TRUE) {
    $url = "../HTML/Photograph.html";
    echo "修改成功,正在跳转";
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