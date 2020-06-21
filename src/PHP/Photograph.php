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
$UID = 0;
//  启动会话，这步必不可少
session_start();
//搜索该用户上传的图片
$sql = "SELECT PATH,Title,Description,ImageID
        FROM travelimage
        WHERE UID ='{$_SESSION['UID']}' AND PATH IS NOT NULL
        ";
$result = mysqli_query($conn, $sql);
$arr = Array();
if (mysqli_num_rows($result) > 0) {
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