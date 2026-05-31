<?php

$serverName = "DESKTOP-NTHDIEM\\SQLEXPRESS";

$connectionInfo = array(
    "Database" => "ITWORK",
    "CharacterSet" => "UTF-8"
);

$conn = sqlsrv_connect($serverName, $connectionInfo);

if ($conn) {

    echo "<h1>Kết nối SQL Server thành công</h1>";

} else {

    die(print_r(sqlsrv_errors(), true));
}

?>