<?php
/**
 * Created by PhpStorm.
 * User: pete
 * Date: 17-6-28
 * Time: 下午4:12
 */
    require '../sql_connect.php';
    $username = isset($_POST['username'])? $_POST['username']:'';
    $field_like = isset($_POST['field_like'])? $_POST['field_like']: '';
    $web_like = isset($_POST['web_like'])? $_POST['web_like']: '';
    $pwd = isset($_POST['pwd'])?md5($_POST['pwd']): '';

    $conn = get_sql_connect();
    $sql = "SELECT * FROM user WHERE username = '".$username."';";
    $res = $conn->query($sql);
    $row = mysqli_fetch_assoc($res);
    if($row == null)
    {
        $arr['success'] = 0;
        $arr['err_msg'] = "数据库错误！";
    }
    else if($row['pwd'] != $pwd)
    {
        $arr['success'] = 0;
        $arr['err_msg'] = "账户密码错误，修改个性设置失败！";
    }
    else
    {
        $sql = "UPDATE user_like SET field_like='".$field_like."', web_like = '".$web_like."' ".
            "WHERE username = '".$username."';";
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