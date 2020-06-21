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
//获取图片ID
$ImageID = isset($_GET['ImageID']) ? htmlspecialchars($_GET['ImageID']) : '';
//搜索相关信息
$sql = "SELECT PATH,Title,Description,CityCode,CountryCodeISO,Content
        FROM travelimage
        WHERE ImageID = '{$ImageID}'
        ";
$result = mysqli_query($conn, $sql);
$arr = Array();
if (!$result) {
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
if (mysqli_num_rows($result) > 0) {
    // 输出数据
    while($row = mysqli_fetch_assoc($result)) {
        $arr = $row;
    }
    echo json_encode($arr);
} else {
    echo "Error";
}
mysqli_close($conn);
?>