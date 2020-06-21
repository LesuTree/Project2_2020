<?php
$servername = "localhost";
$username = "LesuTree";
$password = "20021001a.";
$dbname = "19ss_project2_new";
// 连接到数据库
$conn = mysqli_connect($servername, $username, $password, $dbname);
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}
//  选出收藏数最多的图片
$sql = "SELECT PATH,Title,Description,ImageID
        FROM travelimage
        WHERE ImageID IN (
            SELECT T.ImageID 
            FROM(
                SELECT ImageID
                FROM travelimagefavor 
                GROUP BY ImageID 
                ORDER BY COUNT(ImageID) DESC 
                LIMIT 6
                ) AS T
        ) AND PATH IS NOT NULL
        ";
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