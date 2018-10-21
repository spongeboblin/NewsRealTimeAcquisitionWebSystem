<?php
    require '../sql_connect.php';
    $username = isset($_POST['username'])? $_POST['username']:'';
    $name = isset($_POST['name'])? $_POST['name']:'';
    $phone = isset($_POST['phone'])?$_POST['phone']: '';
    $email = isset($_POST['email'])?$_POST['email']: '';
    $pwd = isset($_POST['pwd'])?md5($_POST['pwd']): '';

    $conn = get_sql_connect();
    $sql = "SELECT * FROM user WHERE username = '".$username."';";
    $res = $conn->query($sql);
    $row = mysqli_fetch_assoc($res);
    if($row == null)
    {
        $arr['success'] = 0;
        $arr['err_msg'] = "该用户不存在，无法找回密码！";
    }
    else if($row['name'] != $name || $row['phone'] != $phone || $row['email'] != $email)
    {
        $arr['success'] = 0;
        $arr['err_msg'] = "验证信息有误，请确认您的验证信息！";
    }
    else
    {
        $sql = "UPDATE user SET pwd='".$pwd."' WHERE username = '".$username."';";
        $res = $conn->query($sql);
        if($res){
            $arr['success'] = 1;
        }
        else
        {
            $arr['success'] = 0;
            $arr['err_msg'] = $conn->error;
        }
    }
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    free_sql_connect($conn);