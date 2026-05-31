<?php
$serverName = "localhost"; // Tên máy chủ SQL của bạn
$connectionInfo = array(
    "Database" => "InternHubDB", // Thay bằng tên database của bạn
    "UID" => "sa",               // User SQL Server
    "PWD" => "MatKhauCuaBan"     // Mật khẩu SQL Server
);

// Kết nối
$conn = sqlsrv_connect($serverName, $connectionInfo);

if (!$conn) {
    die("Kết nối thất bại: " . print_r(sqlsrv_errors(), true));
}
?>