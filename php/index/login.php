<?php
    require '../sql_connect.php';
    $username = isset($_POST['username'])? $_POST['username']:'test';
    $pwd = isset($_POST['pwd'])?md5($_POST['pwd']): '';
    $conn = get_sql_connect();
    $sql = "SELECT pwd FROM user WHERE username = '".$username."';";
    $res = $conn->query($sql);
    $row = mysqli_fetch_assoc($res);
    if($row == null)
    {
        $arr['success'] = 0;
        $arr['err_msg'] = "该用户不存在！";
    }
    else
    {
        $true_pwd = $row['pwd'];
        if($pwd != $true_pwd)
        {
            $arr['success'] = 0;
            $arr['err_msg'] = "抱歉，账户密码输入错误！";
        }
        else
        {
            $arr['success'] = 1;
        }
    }
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    free_sql_connect($conn);