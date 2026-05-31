/**
 * profile.js - Quản lý thông tin cá nhân và CV
 */

// --- 1. CẬP NHẬT SIDEBAR ---
function updateProfileSidebar() {
    if (!state.user) return;
    const name = state.user.name;
    // Cập nhật Avatar (chữ cái đầu)
    document.getElementById('profileAvatar').textContent = name.charAt(name.lastIndexOf(' ') + 1) || name.charAt(0);
    document.getElementById('profileName').textContent = name;
    document.getElementById('profileMajor').textContent = state.user.major || 'Chưa cập nhật';
    document.getElementById('profileGPABadge').textContent = 'GPA: ' + (state.user.gpa || 0).toFixed(2);

    // Cập nhật thanh tiến trình GPA
    const gpaPercent = ((state.user.gpa || 0) / 4 * 100);
    document.getElementById('gpaFill').style.width = gpaPercent + '%';
}

// --- 2. ĐIỀU HƯỚNG TAB TRANG CÁ NHÂN ---
function showProfileTab(tab) {
    document.querySelectorAll('.profile-nav-item').forEach(el => el.classList.remove('active'));
    // Thêm class active vào tab hiện tại (giả định map vị trí)
    const map = { info: 0, skills: 1, education: 2 };
    document.querySelectorAll('.profile-nav-item')[map[tab]].classList.add('active');

    renderProfileMain(tab);
}

// --- 3. RENDER NỘI DUNG CHÍNH ---
function renderProfileMain(tab) {
    const main = document.getElementById('profileMain');
    if (!main) return;
    updateProfileSidebar();

    if (tab === 'info') {
        main.innerHTML = `
            <div class="profile-section">
                <h3>👤 Thông tin cá nhân</h3>
                <div class="info-grid">
                    <div class="info-item"><label>Họ và tên</label><span>${state.user.name}</span></div>
                    <div class="info-item"><label>Mã SV</label><span>${state.user.masv || 'N/A'}</span></div>
                    <div class="info-item"><label>Email</label><span>${state.user.email}</span></div>
                    <div class="info-item"><label>GPA</label><span>${state.user.gpa.toFixed(2)} / 4.0</span></div>
                </div>
                <button class="btn btn-outline" onclick="openModal('editProfileModal')">✏️ Chỉnh sửa</button>
            </div>`;
    } else if (tab === 'skills') {
        main.innerHTML = `
            <div class="profile-section">
                <h3>⚡ Kỹ năng</h3>
                <div class="skill-tags">
                    ${state.skills.map((s, i) => `<span class="skill-tag">${s}<span onclick="removeSkill(${i})">✕</span></span>`).join('')}
                </div>
                <button class="btn btn-primary" onclick="openModal('addSkillModal')">+ Thêm kỹ năng</button>
            </div>`;
    }
}

// --- 4. CÁC HÀM QUẢN LÝ CV ---
function renderCVList() {
    const el = document.getElementById('cvList');
    if (!el) return;

    el.innerHTML = state.cvList.map((c, i) => `
        <div class="cv-card">
            <h4>${c.name}</h4>
            <small>Ngày tạo: ${c.date}</small>
            <div class="cv-actions">
                <button onclick="setDefaultCV(${i})">${c.isDefault ? '✅ Mặc định' : 'Đặt mặc định'}</button>
                <button onclick="deleteCV(${i})">Xóa</button>
            </div>
        </div>
    `).join('');
}

function createCV() {
    const name = document.getElementById('cvName').value;
    if (!name) return showToast('Vui lòng nhập tên CV', 'error');

    state.cvList.push({ name, date: new Date().toLocaleDateString(), isDefault: false });
    closeModal('createCVModal');
    renderCVList();
    showToast('Tạo CV thành công', 'success');
}

function deleteCV(idx) {
    state.cvList.splice(idx, 1);
    renderCVList();
    showToast('Đã xóa CV', 'info');
}

function setDefaultCV(idx) {
    state.cvList.forEach((c, i) => c.isDefault = (i === idx));
    renderCVList();
    showToast('Đã đặt làm CV mặc định', 'success');
}

// --- 5. QUẢN LÝ KỸ NĂNG ---
function removeSkill(idx) {
    state.skills.splice(idx, 1);
    renderProfileMain('skills');
}