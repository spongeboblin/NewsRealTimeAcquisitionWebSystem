<?php
    require '../sql_connect.php';
    $username = isset($_POST['username'])? $_POST['username']:'';

    $conn = get_sql_connect();
    $sql = "SELECT * FROM user WHERE username = '".$username."';";
    $res = $conn->query($sql);
    $row = mysqli_fetch_assoc($res);
    if($row !== null)
    {
        $arr['success'] = 0;
        $arr['err_msg'] = "该用户已经存在！";
    }
    else
    {
        $stmt = $conn->prepare("INSERT INTO user(username, pwd, name, phone, email) VALUES (?,?,?,?,?)");
        $stmt->bind_param("sssss", $username, $pwd, $name, $phone, $email);
        $username = isset($_POST['username'])? $_POST['username']:'';
        $name = isset($_POST['name'])? $_POST['name']:'';
        $pwd = isset($_POST['pwd'])?md5($_POST['pwd']): '';
        $phone = isset($_POST['phone'])?$_POST['phone']: '';
        $email = isset($_POST['email'])?$_POST['email']: '';
        if(($stmt->execute()) == true){
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