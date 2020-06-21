<?php
$servername = "localhost";
$username = "LesuTree";
$password = "20021001a.";
$dbname = "19ss_project2_new";
// 创建连接
$conn = mysqli_connect($servername, $username, $password, $dbname);
$ImageID = isset($_GET['ImageID']) ? htmlspecialchars($_GET['ImageID']) : '';
if (!$conn) {
    die("连接失败: " . mysqli_connect_error());
}
session_start();
// 搜索照片相关信息
$sql = "SELECT X.Title,X.Description,X.Content,Z.CountryName,X.CityCode,X.PATH,Y.UserName, COUNT(W.ImageID)
        FROM travelimage AS X,geocountries AS Z,traveluser AS Y,travelimagefavor AS W
        WHERE X.ImageID = '{$ImageID}' AND Z.ISO = X.CountryCodeISO AND X.UID = Y.UID AND W.ImageID = '{$ImageID}'
        ";
$data = Array();
$result = mysqli_query($conn, $sql);
if(!$result){
    echo "Error";
    exit();
}
else if (mysqli_num_rows($result) > 0) {
    $data['isFavor'] = false;
    $data = mysqli_fetch_assoc($result);
    $data['favor'] = $data["COUNT(W.ImageID)"];
    unset($data["COUNT(W.ImageID)"]);   //修改记录收藏数量的属性
    if($data["CityCode"]!=''){  //若存在城市号码则搜索名称
        $sql = "
        SELECT AsciiName
        FROM geocities
        WHERE GeoNameID = '{$data["CityCode"]}'
        ";
        $result = mysqli_query($conn, $sql);
        if (mysqli_num_rows($result) > 0) {
            $data["CityName"] = mysqli_fetch_assoc($result)["AsciiName"];
        }
    }
    unset($data["CityCode"]);
    if (isset($_SESSION["UID"])){   //若用户登录已登录
        $uid = $_SESSION["UID"];
        $sql = "SELECT * FROM travelimagefavor WHERE ImageID='{$ImageID}' AND UID = '{$uid}'";
        $result = mysqli_query($conn, $sql);
        if (!$result){}
        else if (mysqli_num_rows($result) > 0) $data['isFavor'] = true;     //查询用户是否收藏该图片
    }
    echo json_encode($data);
} else {
    echo "Error";
}
mysqli_close($conn);
?>