<?php
// 1. Nhúng file kết nối
include 'db_connect.php';

// 2. Viết câu lệnh SQL để lấy dữ liệu
$sql = "SELECT Title, Company, Location FROM Jobs";

// 3. Thực thi câu lệnh
$stmt = sqlsrv_query($conn, $sql);

// Kiểm tra xem truy vấn có chạy thành công không
if ($stmt === false) {
    die(print_r(sqlsrv_errors(), true));
}
?>

<div class="job-list">
    <?php
    // Vòng lặp để lấy từng dòng dữ liệu từ SQL
    while ($row = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC)) {
    ?>
        <div class="job-card" style="border: 1px solid #ccc; padding: 15px; margin: 10px 0; border-radius: 8px;">
            <h3><?php echo htmlspecialchars($row['Title']); ?></h3>
            <p><strong>Công ty:</strong> <?php echo htmlspecialchars($row['Company']); ?></p>
            <p><strong>Địa điểm:</strong> <?php echo htmlspecialchars($row['Location']); ?></p>
            <button>Xem chi tiết</button>
        </div>
    <?php
    }
    // Đóng kết nối sau khi làm xong
    sqlsrv_free_stmt($stmt);
    sqlsrv_close($conn);
    ?>
</div>