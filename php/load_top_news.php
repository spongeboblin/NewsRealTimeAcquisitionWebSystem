<?php
    require "sql_connect.php";
    $conn = get_sql_connect();
    $sql = "SELECT * FROM news WHERE type='0' ORDER BY news_date DESC";
    $res = $conn->query($sql);
    if($res == false)
    {
        echo $conn->error;
    }
    else
    {
        $arr = array();
        while($row = $res->fetch_assoc())
        {
            $size = count($row);
            for($i = 0; $i < $size; $i++)
            {
                unset($row[$i]);
            }
            array_push($arr, $row);
        }
        echo json_encode($arr, JSON_UNESCAPED_UNICODE);
    }
    free_sql_connect($conn);