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
$url = "../HTML/Signup.html";
// 获取注册用信息
$user = isset($_POST['User']) ? htmlspecialchars($_POST['User']) : '';
$email = isset($_POST['Email']) ? htmlspecialchars($_POST['Email']) : '';
$pass = isset($_POST['pass']) ? htmlspecialchars($_POST['pass']) : '';
//检查是否存在重复注册
$sql = "SELECT UID FROM traveluser WHERE Email = '{$email}'";
$result = mysqli_query($conn, $sql);
$row = mysqli_fetch_assoc($result);
if ($user==''||$email==''||$pass=='') echo("Error发生");
else if($row["UID"]) echo("您已注册过,请登录");
else {
    //注册
    $sql = "INSERT INTO traveluser
            (Email,UserName,Pass, State) 
            VALUES ('{$email}','{$user}','{$pass}',1)
        ";
    if ($conn->query($sql) === TRUE) {
        $url = "../HTML/Login.html";
        echo "您已注册成功";
    } else echo("Error发生");
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