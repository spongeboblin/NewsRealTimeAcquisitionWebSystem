<?php
    require 'sql_connect.php';
    $username = isset($_POST['username'])? $_POST['username']:'test';
    $conn = get_sql_connect();
    $sql = "SELECT * FROM user WHERE username = '".$username."';";
    $res = $conn->query($sql);
    $row = mysqli_fetch_assoc($res);
    if($row == null)
    {
        $arr['success'] = 0;
        $arr['err_msg'] = "该用户不存在！";
    }
    else
    {
        $arr['success'] = 1;
        $arr['pwd'] = $row['pwd'];
        $arr['name'] = $row['name'];
        $arr['sex'] = $row['sex'];
        $arr['age'] = $row['age'];
        $arr['phone'] = $row['phone'];
        $arr['email'] = $row['email'];
        $arr['regdate'] = $row['regdate'];
        $sql = "SELECT * FROM user_like WHERE username = '".$username."';";
        $res = $conn->query($sql);
        $row = mysqli_fetch_assoc($res);
        if($row == null)
        {
            $arr['field_like'] = "1111000";
            $arr['web_like'] = "110000";
        }
        else
        {
            $arr['field_like'] = $row['field_like'];
            $arr['web_like'] = $row['web_like'];
        }
    }
    echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    free_sql_connect($conn);