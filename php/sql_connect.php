<?php header('Access-Control-Allow-Origin: *');?>
<?php
function get_sql_connect()
{
    $db_host = 'localhost';
    $db_name = 'news';
    $db_user = 'root';
    $db_pwd = 'czqw960823';
    $mysqli = new mysqli($db_host, $db_user, $db_pwd, $db_name);
    if(!$mysqli)
    {
        echo mysqli_connect_error();
        exit(1);
    }
    $mysqli->set_charset('utf8');
    return $mysqli;
}

function free_sql_connect($mysqli)
{
    $mysqli->close();
}

