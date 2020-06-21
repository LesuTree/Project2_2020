<?php
$servername = "localhost";
$username = "LesuTree";
$password = "20021001a.";
$dbname = "19ss_project2_new";
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
// Check connection
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}

session_start();
$ImageID = isset($_POST['ImageID']) ? htmlspecialchars($_POST['ImageID']) : '';
// 防止错误
if ($ImageID==''||$_SESSION["UID"]<=0) echo("Error");
else {
    $uid = $_SESSION["UID"];
    //在收藏库写入用户id与图片id
    $sql = "INSERT INTO travelimagefavor
            (UID,ImageID) 
            VALUES ('{$uid}','{$ImageID}')
        ";
    if ($conn->query($sql) === TRUE) {
        echo "Success";
    } else echo("Error");
}
mysqli_close($conn);
?>