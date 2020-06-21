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
$account = isset($_POST['account']) ? htmlspecialchars($_POST['account']) : '';
$pass = isset($_POST['password']) ? htmlspecialchars($_POST['password']) : '';
$url = "../HTML/Login.html";
// binary 区分大小写
$sql = "SELECT UID
        FROM traveluser
        WHERE ( binary UserName ='{$account}' OR  binary Email = '{$account}') AND  binary Pass = '{$pass}'
        ";
$result = mysqli_query($conn, $sql);
if (!$result) {
    echo("用户名或密码错误");
}
else if (mysqli_num_rows($result) > 0) {
    // 输出数据
    $row = mysqli_fetch_assoc($result);
    session_start();
    //  设置用户登录状态
    $_SESSION["admin"] = true;
    $_SESSION["UID"]=$row["UID"];
    $url  =  "../../index.html";
    echo "您已成功登录，请稍等片刻";
}
else{
    echo("用户名或密码错误");
}
mysqli_close($conn);
?>
<html>
<head>
    <meta   http-equiv = "refresh"   content ="1;  url = <?php echo $url;  ?>" >
</head>
<body>
</body>
</html>