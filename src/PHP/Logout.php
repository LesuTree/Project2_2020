<?php
session_start();
session_destroy();
$url = "../HTML/Login.html"
?>
<html>
<head>
    <meta   http-equiv = "refresh"   content ="1;  url = <?php echo $url;  ?>" >
</head>
<body>
你已登出，请稍等片刻……
</body>
</html>