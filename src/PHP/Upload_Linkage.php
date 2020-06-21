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
$country = isset($_GET['country']) ? htmlspecialchars($_GET['country']) : '';

//设置Population的限制防止无用的城市数量过多
$sql = "SELECT AsciiName,GeoNameID
        FROM geocities
        WHERE GeoNameID IN(
        SELECT T.GeoNameID
        FROM (
            SELECT GeoNameID
            FROM geocities
            WHERE CountryCodeISO = '{$country}'
            ORDER BY Population DESC 
            LIMIT 100
            ) AS T
        ) AND Population > 0
        ORDER BY AsciiName
       ";
$result = mysqli_query($conn, $sql);
$arr = Array();
if (!$result) {
    printf("Error: %s\n", mysqli_error($conn));
    exit();
}
if (mysqli_num_rows($result) > 0) {
    // 输出数据
    $count = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $arr[$count++] = $row;
    }
}
echo json_encode($arr);
mysqli_close($conn);
?>