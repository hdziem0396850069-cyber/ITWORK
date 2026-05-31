document.addEventListener('DOMContentLoaded', () => {
    // G?i các hàm render d? li?u
    renderCompaniesGrid();
    renderBestJobs();
    renderIndustries();
    renderJobsList('all');

    // Kh?i t?o slider/pager
    initJobsPager();
});

// 1. Render Công ty
function renderCompaniesGrid() {
    const grid = document.getElementById('companiesGrid');
    if (!grid) return;
    const data = [
        { name: "VINSMART", logo: "/images/vinsmart.png" },
        { name: "VPBANK", logo: "/images/vpbank.png" },
        { name: "VNPT", logo: "/images/vnpt.png" }
    ];
    grid.innerHTML = data.map(c => `
        <div class="company-card">
            <img src="${c.logo}" alt="${c.name}" onerror="this.src='/images/default.png'">
            <p>${c.name}</p>
        </div>
    `).join('');
}

// 2. Render Vi?c làm t?t nh?t
function renderBestJobs() {
    const grid = document.getElementById('bestJobsGrid');
    if (!grid) return;
    // Thêm 6 công vi?c gi? l?p ?? test tính n?ng Pager
    let html = '';
    for (let i = 1; i <= 6; i++) {
        html += `<div class="job-card"><h3>Vi?c làm ${i}</h3><p>Mô t? công vi?c h?p d?n...</p></div>`;
    }
    grid.innerHTML = html;
}

// 3. Render Ngành ngh?
function renderIndustries() {
    const grid = document.getElementById('industriesGrid');
    if (grid) grid.innerHTML = "<p>IT, Tài chính, Marketing, Nhân s?...</p>";
}

// 4. Render Danh sách ??y ??
function renderJobsList(filter) {
    const list = document.getElementById('jobsListFull');
    if (list) list.innerHTML = "<p>Danh sách vi?c làm chi ti?t ?ang c?p nh?t...</p>";
}

// 5. Logic Pager ?ã c?i ti?n
function initJobsPager() {
    const grid = document.getElementById('bestJobsGrid');
    const pager = document.getElementById('jobsPager');
    if (!grid || !pager) return;

    const cards = grid.children.length;
    const pages = Math.max(1, Math.ceil(cards / 2)); // Gi? s? 2 job m?i trang

    pager.innerHTML = '';
    for (let i = 0; i < pages; i++) {
        const dot = document.createElement('span');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.addEventListener('click', () => {
            const cardWidth = grid.querySelector('.job-card').offsetWidth + 20; // 20 là gap
            grid.scrollTo({ left: i * cardWidth * 2, behavior: 'smooth' });
            Array.from(pager.children).forEach(c => c.classList.remove('active'));
            dot.classList.add('active');
        });
        pager.appendChild(dot);
    }
}