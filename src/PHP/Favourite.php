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
//  启动会话
session_start();
//  查询收藏的照片
$sql = "SELECT PATH,Title,Description,ImageID
        FROM travelimage
        WHERE ImageID IN (
            SELECT T.ImageID 
            FROM(
                SELECT ImageID
                FROM travelimagefavor 
                WHERE UID = '{$_SESSION["UID"]}'
                ) AS T
        ) AND PATH!='NULL'
        ";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    $arr = Array();
    // 输出数据
    $count = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $arr[$count++] = $row;
    }
    echo json_encode($arr);
} else {
    echo "NULL";
}
if (!$result) {
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
mysqli_close($conn);
?>