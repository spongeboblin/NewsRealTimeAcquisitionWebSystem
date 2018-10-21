<?php
/**
 * Created by PhpStorm.
 * User: pete
 * Date: 17-6-28
 * Time: 下午6:43
 */
    require '../sql_connect.php';
    $id = isset($_POST['id'])? $_POST['id']: '';
    $conn = get_sql_connect();
    $sql = "SELECT * FROM news WHERE id='".$id."'";
    $res = $conn->query($sql);
    if($res == false)
    {
        echo $conn->error;
    }
    else
    {
        $row = mysqli_fetch_assoc($res);
        $arr = array();
        $arr['title'] = $row['title'];
        $arr['news_date'] = $row['news_date'];
        $arr['source'] = $row['source'];
        $arr['type'] = $row['type'];
        $arr['content'] = $row['content'];
        echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    }
    free_sql_connect($conn);