/**
 * auth.js - Xử lý xác thực người dùng
 * Quản lý trạng thái đăng nhập, đăng ký và điều hướng UI người dùng
 */

// --- 1. ĐĂNG NHẬP ---
function doLogin() {
    const email = document.getElementById('loginEmail').value;
    const pass = document.getElementById('loginPass').value;

    if (!email || !pass) {
        showToast('Vui lòng nhập đầy đủ thông tin', 'error');
        return;
    }

    // Giả lập logic xác thực (API call thực tế sẽ ở đây)
    state.loggedIn = true;
    state.user = {
        name: 'Nguyễn Văn An',
        email: email,
        major: 'Công nghệ thông tin',
        gpa: 3.5,
        masv: 'SV001234'
    };

    closeModal('loginModal');
    showToast(`🎉 Đăng nhập thành công! Chào ${state.user.name}`, 'success');

    // Cập nhật giao diện và làm mới trang cá nhân
    updateNavbarUI();
    renderProfileMain('info');
}

// --- 2. ĐĂNG KÝ ---
function doRegister() {
    const ln = document.getElementById('regLastName').value;
    const fn = document.getElementById('regFirstName').value;
    const email = document.getElementById('regEmail').value;
    const pass = document.getElementById('regPass').value;
    const pass2 = document.getElementById('regPass2').value;
    const terms = document.getElementById('regTerms').checked;

    if (!ln || !fn || !email || !pass) {
        showToast('Vui lòng điền đầy đủ thông tin', 'error');
        return;
    }
    if (pass !== pass2) {
        showToast('Mật khẩu xác nhận không khớp', 'error');
        return;
    }
    if (!terms) {
        showToast('Vui lòng đồng ý điều khoản sử dụng', 'error');
        return;
    }

    state.loggedIn = true;
    state.user = {
        name: `${ln} ${fn}`,
        email: email,
        major: 'Chưa cập nhật',
        gpa: 3.0
    };

    closeModal('registerModal');
    showToast(`🎉 Đăng ký thành công! Chào mừng ${state.user.name}`, 'success');
    updateNavbarUI();
}

// --- 3. ĐĂNG XUẤT ---
function doLogout() {
    state.loggedIn = false;
    state.user = null;

    updateNavbarUI();
    showPage('home');
    showToast('Đã đăng xuất', 'info');
}

// --- 4. QUÊN MẬT KHẨU ---
function doForgotPassword() {
    const email = document.getElementById('forgotEmail').value;
    if (!email) {
        showToast('Vui lòng nhập email', 'error');
        return;
    }
    closeModal('forgotModal');
    showToast(`📧 Đã gửi email đặt lại mật khẩu tới ${email}`, 'success');
}

/**
 * Hàm cập nhật UI của thanh Navbar
 * Đảm bảo đồng bộ hóa trạng thái giữa data và giao diện
 */
function updateNavbarUI() {
    const navGuest = document.getElementById('navGuest');
    const navUser = document.getElementById('navUser');
    const navAvatarBtn = document.getElementById('navAvatarBtn');

    if (state.loggedIn && state.user) {
        navGuest.style.display = 'none';
        navUser.style.display = 'flex';
        // Lấy chữ cái đầu của tên cuối cùng làm avatar
        const nameParts = state.user.name.split(' ');
        navAvatarBtn.textContent = nameParts[nameParts.length - 1].charAt(0).toUpperCase();
    } else {
        navGuest.style.display = 'flex';
        navUser.style.display = 'none';
    }
}