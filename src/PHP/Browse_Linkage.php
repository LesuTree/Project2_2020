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
//获取国家信息
$country = isset($_GET['country']) ? htmlspecialchars($_GET['country']) : '';
//搜索该国家下有照片的城市
$sql = "SELECT AsciiName,GeoNameID
        FROM geocities
        WHERE CountryCodeISO = '{$country}' AND Population>0
        AND GeoNameID IN (
            SELECT DISTINCT CityCode
            FROM travelimage
        )
       ";
$result = mysqli_query($conn, $sql);
$arr = Array();
if (mysqli_num_rows($result) > 0) {
    // 输出数据
    $count = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $arr[$count++] = $row;
    }
}
echo json_encode($arr);
if (!$result) {
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
mysqli_close($conn);
?>