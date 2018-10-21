<?php
/**
 * Created by PhpStorm.
 * User: pete
 * Date: 17-6-28
 * Time: 下午3:18
 */
    require '../sql_connect.php';
    $username = isset($_POST['username'])? $_POST['username']:'';
    $name = isset($_POST['name'])? $_POST['name']:'';
    $phone = isset($_POST['phone'])?$_POST['phone']: '';
    $email = isset($_POST['email'])?$_POST['email']: '';
    $sex = isset($_POST['sex'])?$_POST['sex']:null;
    $age = isset($_POST['age'])?$_POST['age']:null;
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
        $arr['err_msg'] = "账户密码错误，修改信息失败！";
    }
    else
    {
        $sql = "UPDATE user SET name='".$name."', ".
                "sex = '".$sex."', age = '".$age."', phone='".$phone."', email='".$email."' ".
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