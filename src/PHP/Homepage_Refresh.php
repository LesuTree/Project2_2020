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
//  随机选取六张照片
$sql = "SELECT PATH,Title,Description
        FROM travelimage
        WHERE PATH IS NOT NULL
        ORDER BY RAND()
        LIMIT 6";
$result = mysqli_query($conn, $sql);
$arr = Array();
if (mysqli_num_rows($result) > 0) {
    // 输出数据
    $count = 0;
    while($row = mysqli_fetch_assoc($result)) {
        $arr[$count++] = $row;
    }
}
if (!$result) {
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
echo json_encode($arr);
mysqli_close($conn);
?>