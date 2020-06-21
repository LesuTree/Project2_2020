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
//获取筛选要求
$content = isset($_GET['content']) ? htmlspecialchars($_GET['content']) : '';
$country = isset($_GET['country']) ? htmlspecialchars($_GET['country']) : '';
$city = isset($_GET['city']) ? htmlspecialchars($_GET['city']) : '';
$sql = "SELECT PATH,ImageID
        FROM travelimage
        WHERE PATH IS NOT NULL";
//根据要求搜索
if($content!=''){
    $sql = $sql." AND Content = '{$content}'";
}
if ($country!=''){
    $sql = $sql." AND CountryCodeISO =  '{$country}'";
}
if ($city!=''){
    $sql = $sql." AND CityCode = '{$city}'";
}
$result = mysqli_query($conn, $sql);
if (!$result) {
    echo "NULL";
    exit();
}
if (mysqli_num_rows($result) > 0) {
    $arr = Array();
    // 输出数据
    $count = 0;
    while ($row = mysqli_fetch_assoc($result)) {
        $arr[$count++] = $row;
    }
    echo json_encode($arr);
}
// 未搜索到相应照片
else echo "NULL";
mysqli_close($conn);
?>