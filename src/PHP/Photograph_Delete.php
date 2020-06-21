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
$ImageID = isset($_POST['ImageID']) ? htmlspecialchars($_POST['ImageID']) : '';

//获取图片路径
$sql = "SELECT PATH FROM travelimage
        WHERE ImageID = '{$ImageID}'
        ";
$result = mysqli_query($conn, $sql);
if (mysqli_num_rows($result) > 0) {
    $row = mysqli_fetch_assoc($result);
    $path = "../../images/travel-images/";
    $filename = $row["PATH"];
    //若文件存在则删除
    if (file_exists($path.$filename)){
        if (unlink($path.$filename)){   //删除成功
            //删除记录
            $sql = "DELETE FROM travelimage
                   WHERE ImageID = '{$ImageID}'
                    ";
            if ($conn->query($sql) === TRUE) {
                echo "Success";
            }
            else echo "Error";
        }
        else echo "Error";
    }
}
else {
    echo "Error";
}
mysqli_close($conn);
?>