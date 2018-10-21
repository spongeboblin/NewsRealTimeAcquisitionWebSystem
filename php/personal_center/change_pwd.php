<?php
/**
 * Created by PhpStorm.
 * User: pete
 * Date: 17-6-28
 * Time: 下午7:33
 */
    require '../sql_connect.php';
    $username = isset($_POST['username'])? $_POST['username']:'';
    $old_pwd = isset($_POST['old_pwd'])?md5($_POST['old_pwd']): '';
    $new_pwd = isset($_POST['new_pwd'])?md5($_POST['new_pwd']): '';

    $conn = get_sql_connect();
    $sql = "SELECT * FROM user WHERE username = '".$username."';";
    $res = $conn->query($sql);
    $row = mysqli_fetch_assoc($res);
    if($row == null)
    {
        $arr['success'] = 0;
        $arr['err_msg'] = "数据库错误！";
    }
    else if($row['pwd'] != $old_pwd)
    {
        $arr['success'] = 0;
        $arr['err_msg'] = "账户原密码错误，修改密码失败！";
    }
    else
    {
        $sql = "UPDATE user SET pwd='".$new_pwd."' WHERE username = '".$username."';";
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