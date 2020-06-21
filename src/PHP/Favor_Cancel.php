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
if ($ImageID==''||!isset($_SESSION["UID"])) echo("Error");
else {
    $uid = $_SESSION["UID"];
    //删除收藏记录
    $sql = "DELETE FROM travelimagefavor
        WHERE ImageID = '{$ImageID}' AND UID ='{$uid}'
        ";
    if ($conn->query($sql) === TRUE) {
        echo "Success";
    } else echo("Error");
}
mysqli_close($conn);
?>