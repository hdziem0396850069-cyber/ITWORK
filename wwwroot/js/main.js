/**
 * main.js - Controller điều phối toàn bộ ứng dụng
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Khởi tạo dữ liệu giao diện
    renderCompanies();
    renderFeaturedJobs();
    renderCategories();
    renderJobsList(JOBS);

    // 2. Thiết lập các sự kiện toàn cục
    initGlobalEvents();
});

function initGlobalEvents() {
    // Đóng modal khi click ra ngoài vùng modal
    document.querySelectorAll('.modal-overlay').forEach(mo => {
        mo.addEventListener('click', e => { if (e.target === mo) mo.classList.remove('open'); });
    });

    // Đóng modal bằng phím ESC
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
    });
}

/**
 * Logic chuyển trang (Routing)
 */
function showPage(name) {
    // Kiểm tra bảo mật cho các trang yêu cầu đăng nhập
    const protectedPages = ['profile', 'applications', 'cv'];
    if (protectedPages.includes(name) && !state.loggedIn) {
        showToast('Vui lòng đăng nhập để tiếp tục', 'info');
        openModal('loginModal');
        return;
    }

    // Ẩn tất cả các page
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));

    // Hiện trang đích
    const pageElement = document.getElementById('page-' + name);
    if (pageElement) {
        pageElement.classList.add('active');
        window.scrollTo(0, 0); // Reset scroll về đầu trang
    }

    // Gọi các hàm render tương ứng cho từng trang
    switch (name) {
        case 'profile': renderProfileMain('info'); break;
        case 'applications': renderApplications(); break;
        case 'cv': renderCVList(); break;
        case 'jobs': renderJobsList(JOBS); break;
    }
}

/**
 * Hàm hỗ trợ lấy màu theo ID công ty (dùng chung cho toàn bộ app)
 */
function getColor(companyId) {
    const c = COMPANIES.find(x => x.id === companyId);
    return c ? c.color : '#1352de';
}