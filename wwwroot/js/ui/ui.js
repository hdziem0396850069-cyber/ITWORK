/**
 * ui.js - Chứa các hàm render giao diện
 */

// Render danh sách công ty đối tác
function renderCompanies() {
    const grid = document.getElementById('companyGrid');
    if (!grid) return;
    grid.innerHTML = COMPANIES.map(c => `
        <div class="company-card" onclick="showToast('Đang xem ${c.name}', 'info')">
            <div class="company-logo" style="background:${c.color}20; color:${c.color}">${c.abbr}</div>
            <div class="company-name">${c.name}</div>
            <div class="company-new badge badge-blue">Việc mới</div>
        </div>
    `).join('');
}

// Render các vị trí nổi bật (Featured Jobs)
function renderFeaturedJobs() {
    const grid = document.getElementById('featuredJobs');
    if (!grid) return;
    grid.innerHTML = JOBS.slice(0, 6).map(j => `
        <div class="job-card" onclick="openJobDetail(${j.id})">
            <div class="job-logo" style="background:${getColor(j.companyId)}20; color:${getColor(j.companyId)}">${j.company.slice(0, 3)}</div>
            <div class="job-info">
                <div class="job-title">${j.title}</div>
                <div class="job-company">${j.company}</div>
                <div class="job-meta">
                    <span class="job-salary">${j.salary}</span>
                    <span class="job-location">📍 ${j.location}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Render danh sách công việc (có lọc)
function renderJobsList(jobs) {
    const list = document.getElementById('jobsList');
    const count = document.getElementById('jobCount');
    if (!list) return;

    count.textContent = jobs.length;
    if (jobs.length === 0) {
        list.innerHTML = `<div class="empty-state">Không tìm thấy công việc phù hợp</div>`;
        return;
    }

    list.innerHTML = jobs.map(j => `
        <div class="job-list-card">
            <div class="jlc-body" onclick="openJobDetail(${j.id})">
                <h4>${j.title}</h4>
                <p>${j.company} - ${j.location}</p>
                <span class="badge">${j.type}</span>
            </div>
            <button class="btn btn-primary" onclick="openApplyModal(${j.id})">Ứng tuyển</button>
        </div>
    `).join('');
}

// Render danh sách đơn ứng tuyển của user
function renderApplications() {
    const list = document.getElementById('appList');
    if (!list) return;

    if (state.applications.length === 0) {
        list.innerHTML = `<p>Bạn chưa ứng tuyển vị trí nào.</p>`;
        return;
    }

    list.innerHTML = state.applications.map((app, i) => {
        const status = STATUS_MAP[app.status];
        return `
            <div class="app-card">
                <div><strong>${app.title}</strong> tại ${app.company}</div>
                <span class="status-badge ${status.cls}">${status.label}</span>
                <button class="btn btn-danger btn-sm" onclick="cancelApp(${i})">Rút đơn</button>
            </div>
        `;
    }).join('');
}

// Render danh sách CV
function renderCVList() {
    const list = document.getElementById('cvList');
    if (!list) return;

    list.innerHTML = state.cvList.map((cv, i) => `
        <div class="cv-card">
            <h3>${cv.name}</h3>
            <p>Tạo ngày: ${cv.date}</p>
            <button onclick="setDefaultCV(${i})">Đặt mặc định</button>
            <button onclick="deleteCV(${i})">Xóa</button>
        </div>
    `).join('');
}