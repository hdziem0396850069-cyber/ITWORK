/* ============================================
   STUDENTWORK – APP.JS
   Full Application Logic
   ============================================ */

'use strict';

// SIMPLE CLIENT APP: auth (localStorage), profile, jobs, apply
const DBKEY = {
  USERS: 'ih_users',
  CURRENT: 'ih_current',
  APPS: 'ih_applications',
  SAVED: 'ih_savedJobs'
};

const DB = {
  users: JSON.parse(localStorage.getItem(DBKEY.USERS) || '[]'),
  currentUser: JSON.parse(localStorage.getItem(DBKEY.CURRENT) || 'null'),
  applications: JSON.parse(localStorage.getItem(DBKEY.APPS) || '[]'),
  savedJobs: JSON.parse(localStorage.getItem(DBKEY.SAVED) || '[]'),
  save() {
    localStorage.setItem(DBKEY.USERS, JSON.stringify(this.users));
    localStorage.setItem(DBKEY.CURRENT, JSON.stringify(this.currentUser));
    localStorage.setItem(DBKEY.APPS, JSON.stringify(this.applications));
    localStorage.setItem(DBKEY.SAVED, JSON.stringify(this.savedJobs));
  }
};

// SAMPLE DATA (shortened)
const COMPANIES = [
  { id:1, name:'VINSMART', short:'VIN', logo:'/images/companies/1.png', color:'#e53935' },
  { id:2, name:'VPBANK', short:'VPB', logo:'/images/companies/2.png', color:'#0b4fab' },
  { id:3, name:'VNPT', short:'VNPT', logo:'/images/companies/3.png', color:'#0066cc' },
  { id:4, name:'SHOPEE', short:'SHP', logo:'/images/companies/4.png', color:'#ee4d2d' },
  { id:5, name:'MOMO', short:'MOM', logo:'/images/companies/5.png', color:'#a50064' }
];

const JOBS = [
  {
    id:1,
    title:'Thực tập Frontend',
    companyId:1,
    company:'VINSMART',
    salary:'3-5 triệu',
    salaryMin:3,
    salaryMax:5,
    location:'Hà Nội',
    type:'intern',
    remote:false,
    hot:true,
    posted:'1 ngày trước',
    deadline:'30/06/2026',
    description:'Hỗ trợ phát triển giao diện web, tối ưu hiệu năng và trải nghiệm người dùng trên nhiều trình duyệt.',
    requirements:'Biết HTML, CSS, JavaScript, React hoặc Vue. Có khả năng đọc hiểu UI/UX.',
    benefits:['Được hướng dẫn bởi team Senior','Thực hành dự án thật','Chứng nhận thực tập','Phụ cấp hàng tháng']
  },
  {
    id:2,
    title:'Thực tập Backend',
    companyId:4,
    company:'SHOPEE',
    salary:'3-6 triệu',
    salaryMin:3,
    salaryMax:6,
    location:'TP.HCM',
    type:'intern',
    remote:false,
    hot:true,
    posted:'2 ngày trước',
    deadline:'20/06/2026',
    description:'Phát triển API, tối ưu database và tích hợp dịch vụ nội bộ với hệ thống lớn.',
    requirements:'Biết Node.js, .NET hoặc Java. Hiểu REST API và SQL cơ bản.',
    benefits:['Làm việc cùng kỹ sư có kinh nghiệm','Phát triển kỹ năng backend','Chế độ phúc lợi tốt','Cơ hội ở lại sau thực tập']
  },
  {
    id:3,
    title:'UI/UX Intern',
    companyId:5,
    company:'MOMO',
    salary:'2-4 triệu',
    salaryMin:2,
    salaryMax:4,
    location:'TP.HCM',
    type:'intern',
    remote:true,
    hot:false,
    posted:'3 ngày trước',
    deadline:'15/06/2026',
    description:'Thiết kế giao diện ứng dụng, prototype và phối hợp với đội sản phẩm để nâng cao trải nghiệm người dùng.',
    requirements:'Thành thạo Figma hoặc Adobe XD. Có hiểu biết về nguyên tắc thiết kế responsive.',
    benefits:['Làm việc remote linh hoạt','Học từ designer chuyên nghiệp','Tham gia dự án fintech','Được review thiết kế định kỳ']
  },
  {
    id:4,
    title:'Junior .NET Developer',
    companyId:2,
    company:'VPBANK',
    salary:'12-18 triệu',
    salaryMin:12,
    salaryMax:18,
    location:'Hà Nội',
    type:'fulltime',
    remote:false,
    hot:true,
    posted:'2 ngày trước',
    deadline:'10/07/2026',
    description:'Phát triển và bảo trì hệ thống nội bộ ngân hàng, tích hợp API và tối ưu hiệu năng ứng dụng .NET.',
    requirements:'Kinh nghiệm C#/.NET Core, SQL Server, hiểu về lập trình hướng đối tượng.',
    benefits:['Lương cạnh tranh','Đào tạo chuyên sâu','Môi trường chuyên nghiệp','Bảo hiểm đầy đủ']
  },
  {
    id:5,
    title:'Thực tập Kỹ thuật Phần mềm',
    companyId:3,
    company:'VNPT',
    salary:'4-6 triệu',
    salaryMin:4,
    salaryMax:6,
    location:'Đà Nẵng',
    type:'intern',
    remote:false,
    hot:false,
    posted:'5 ngày trước',
    deadline:'25/06/2026',
    description:'Tham gia xây dựng tính năng, kiểm thử và nâng cấp phần mềm nội bộ của đơn vị viễn thông.',
    requirements:'Biết lập trình C#, Java hoặc Python. Có khả năng làm việc theo nhóm.',
    benefits:['Làm việc tại công ty lớn','Phụ cấp thực tập','Cơ hội tuyển dụng chính thức','Tham gia dự án thực tế']
  },
  {
    id:6,
    title:'Thực tập Marketing',
    companyId:5,
    company:'MOMO',
    salary:'3-4 triệu',
    salaryMin:3,
    salaryMax:4,
    location:'Remote',
    type:'intern',
    remote:true,
    hot:false,
    posted:'4 ngày trước',
    deadline:'18/06/2026',
    description:'Hỗ trợ xây dựng chiến dịch marketing, phân tích số liệu và quản trị nội dung mạng xã hội.',
    requirements:'Biết marketing online, thiết kế cơ bản, sử dụng công cụ analytics.',
    benefits:['Làm việc remote','Kinh nghiệm marketing thực tế','Mentor chuyên nghiệp','Chứng nhận thực tập']
  }
];

// ---------- UTIL ----------
function showToast(msg, timeout = 3000) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.style.display = 'block';
  setTimeout(() => { t.style.display = 'none'; }, timeout);
}

function openModal(id) {
  const m = document.getElementById(id);
  const overlay = document.getElementById('modalOverlay');
  if (m && overlay) { m.classList.add('open'); overlay.classList.add('open'); }
}
function closeAllModals() {
  document.querySelectorAll('.modal').forEach(m => m.classList.remove('open'));
  document.getElementById('modalOverlay')?.classList.remove('open');
}
function switchModal(target) {
  closeAllModals();
  setTimeout(() => openModal(target), 150);
}

// ---------- AUTH ----------
function handleRegister(e) {
  e?.preventDefault();
  const fullName = document.getElementById('regFullName').value.trim();
  const email = document.getElementById('regEmail').value.trim().toLowerCase();
  const phone = document.getElementById('regPhone').value.trim();
  const pwd = document.getElementById('regPassword').value;
  const pwd2 = document.getElementById('regConfirmPassword').value;
  if (!fullName || !email || !pwd) { showToast('Vui lòng nhập đầy đủ'); return; }
  if (pwd !== pwd2) { showToast('Mật khẩu không khớp'); return; }
  if (DB.users.find(u => u.email === email)) { showToast('Email đã tồn tại'); return; }

  const u = { id:Date.now(), fullName, email, phone, password:pwd, role:'student', avatar: fullName.split(' ').map(x=>x[0]).slice(0,2).join('').toUpperCase(), created: new Date().toISOString() };
  DB.users.push(u);
  DB.currentUser = u;
  DB.save();
  closeAllModals();
  updateAuthUI();
  showToast('Đăng ký thành công');
  document.getElementById('registerForm')?.reset();
}

function handleLogin(e) {
  e?.preventDefault();
  const email = document.getElementById('loginEmail').value.trim().toLowerCase();
  const pwd = document.getElementById('loginPassword').value;
  const u = DB.users.find(x => x.email === email && x.password === pwd);
  if (!u) { showToast('Email hoặc mật khẩu không đúng'); return; }
  DB.currentUser = u;
  DB.save();
  closeAllModals();
  updateAuthUI();
  showToast(`Chào ${u.fullName}`);
  document.getElementById('loginForm')?.reset();
}

function logout() {
  DB.currentUser = null;
  DB.save();
  updateAuthUI();
  showToast('Đã đăng xuất');
}

function updateAuthUI() {
  const userArea = document.getElementById('userArea');
  const headerActions = document.getElementById('headerActions');
  const adminNav = document.getElementById('adminNav');
  if (DB.currentUser) {
    headerActions.style.display = 'none';
    userArea.style.display = 'flex';
    document.getElementById('userDisplayName').textContent = DB.currentUser.fullName.split(' ').slice(-1)[0];
    document.getElementById('userAvatarIcon').textContent = DB.currentUser.avatar || 'SV';
    if (adminNav) {
      adminNav.style.display = DB.currentUser.role === 'admin' ? 'block' : 'none';
    }
  } else {
    headerActions.style.display = 'flex';
    userArea.style.display = 'none';
    if (adminNav) {
      adminNav.style.display = 'none';
    }
  }
}

function isAdminUser() {
  return DB.currentUser?.role === 'admin';
}

// ---------- PROFILE / APPLY ----------
let currentJobId = null;

function openApplyModal(jobId) {
  if (!DB.currentUser) { showToast('Vui lòng đăng nhập để ứng tuyển'); openModal('loginModal'); return; }
  currentJobId = jobId;
  const job = JOBS.find(j => j.id === jobId);
  document.getElementById('applyJobInfo').textContent = `Ứng tuyển: ${job.title} • ${job.company}`;
  document.getElementById('applyName').value = DB.currentUser.fullName || '';
  document.getElementById('applyEmail').value = DB.currentUser.email || '';
  document.getElementById('applyPhone').value = DB.currentUser.phone || '';
  document.getElementById('fileSelected').style.display = 'none';
  openModal('applyModal');
}

function handleFileSelect(input) {
  const f = input.files[0];
  if (!f) return;
  document.getElementById('fileSelected').style.display = 'block';
  document.getElementById('fileSelected').textContent = `✅ ${f.name} (${Math.round(f.size/1024)}KB)`;
}

function handleApply(e) {
  e?.preventDefault();
  if (!DB.currentUser || !currentJobId) return;
  const job = JOBS.find(j => j.id === currentJobId);
  const app = {
    id: Date.now(),
    jobId: job.id,
    jobTitle: job.title,
    company: job.company,
    userId: DB.currentUser.id,
    applicantName: document.getElementById('applyName').value,
    applicantEmail: document.getElementById('applyEmail').value,
    applicantPhone: document.getElementById('applyPhone').value,
    coverLetter: document.getElementById('coverLetter').value,
    cvFileName: document.getElementById('cvFile').files[0]?.name || (DB.currentUser.cv || null),
    status: 'pending',
    appliedAt: new Date().toISOString()
  };
  DB.applications.push(app);
  DB.save();
  closeAllModals();
  showToast('Nộp CV thành công');
  renderApplicationsList();
}

// ---------- RENDER ----------
function renderHero() {
  const slider = document.getElementById('heroSlider');
  const dots = document.getElementById('heroDots');
  if (!slider || !dots) return;
  const slides = Array.from(slider.querySelectorAll('.slide'));
  dots.innerHTML = '';
  slides.forEach((s,i) => {
    const d = document.createElement('div'); d.className='dot'; if(i===0) d.classList.add('active');
    d.addEventListener('click', ()=> { goToSlide(i); });
    dots.appendChild(d);
  });
  let idx = 0, timer;
  function goToSlide(i) {
    idx = i;
    slider.style.transform = `translateX(-${i*100}%)`;
    dots.querySelectorAll('.dot').forEach((dd,di)=> dd.classList.toggle('active', di===i));
  }
  // make slider horizontal via css transform
  slider.style.display='flex';
  slider.style.transition='transform .45s ease';
  slides.forEach(s => { s.style.minWidth='100%'; s.style.flex='0 0 100%'; });
  function start(){ timer = setInterval(()=> { goToSlide((idx+1)%slides.length); }, 4000); }
  slider.addEventListener('mouseenter', ()=> clearInterval(timer));
  slider.addEventListener('mouseleave', start);
  goToSlide(0); start();
}

function renderCompaniesGrid() {
  const el = document.getElementById('companiesGrid');
  if (!el) return;
  el.innerHTML = COMPANIES.map(c => `
    <div class="company-card" onclick="viewCompany(${c.id})">
      <img src="${c.logo}" alt="${c.name}" />
      <div style="margin-top:8px;font-weight:700">${c.name}</div>
    </div>
  `).join('');
}

function viewCompany(id) {
  const c = COMPANIES.find(x=>x.id===id);
  if (!c) return;
  // simple filter: show jobs by company
  renderJobsList({ companyId: id });
  window.scrollTo({ top: 600, behavior: 'smooth' });
}

function renderBestJobs() {
  const el = document.getElementById('bestJobsGrid');
  if (!el) return;
  const jobs = JOBS.filter(j=>j.hot).slice(0,6);
  el.innerHTML = jobs.map(j => {
    const comp = COMPANIES.find(c=>c.id===j.companyId) || {};
    return `
      <div class="job-card">
        <div class="job-logo" style="background:${comp.color||'#ddd'}">${comp.logo ? `<img src="${comp.logo}" alt="" style="max-width:56px;max-height:56px" />` : comp.short}</div>
        <div class="job-body" style="flex:1">
          <div class="job-title">${j.title}</div>
          <div class="job-meta">${j.company} • ${j.location} • ${j.salary}</div>
          <div class="job-meta">${j.type === 'intern' ? 'Thực tập' : 'Toàn thời gian'} ${j.remote ? '• Remote' : ''}</div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end">
          <button class="btn-ghost" onclick="event.stopPropagation(); viewJobDetail(${j.id})">Chi tiết</button>
          <button class="btn-ghost" onclick="event.stopPropagation(); openApplyModal(${j.id})">Ứng tuyển</button>
          <button class="btn-ghost" onclick="event.stopPropagation(); toggleSaveJob(${j.id}, this)">${DB.savedJobs.includes(j.id)?'❤️':'🤍'}</button>
        </div>
      </div>
    `;
  }).join('');
  initJobsPager();
}

function renderIndustries() {
  const el = document.getElementById('industriesGrid');
  if (!el) return;
  const industries = [
    { icon:'💼', name:'KINH DOANH', count:'1727 Việc Làm' },
    { icon:'📊', name:'KẾ TOÁN', count:'1726 Việc Làm' },
    { icon:'💻', name:'CÔNG NGHỆ', count:'2340 Việc Làm' },
    { icon:'🎨', name:'THIẾT KẾ', count:'650 Việc Làm' },
    { icon:'🏥', name:'Y TẾ', count:'430 Việc Làm' }
  ];
  el.innerHTML = industries.map(i => `
    <div class="industry-card">
      <div class="industry-icon">${i.icon}</div>
      <h4>${i.name}</h4>
      <p>${i.count}</p>
    </div>
  `).join('');
}

function getActiveFilters() {
  const query = document.getElementById('heroSearchInput')?.value.trim().toLowerCase() || '';
  const locations = Array.from(document.querySelectorAll('input[name="filterLocation"]:checked')).map(i => i.value);
  const types = Array.from(document.querySelectorAll('input[name="filterType"]:checked')).map(i => i.value);
  const salaries = Array.from(document.querySelectorAll('input[name="filterSalary"]:checked')).map(i => i.value);
  return { query, locations, types, salaries };
}

function filterJobs() {
  const filters = getActiveFilters();
  const elInfo = document.getElementById('jobsResultInfo');
  const elList = document.getElementById('jobsListFull');
  if (!elInfo || !elList) return;

  let result = JOBS.slice();
  if (filters.query) {
    result = result.filter(j =>
      j.title.toLowerCase().includes(filters.query) ||
      j.company.toLowerCase().includes(filters.query) ||
      j.location.toLowerCase().includes(filters.query)
    );
  }
  if (filters.locations.length) {
    result = result.filter(j => filters.locations.includes(j.location));
  }
  if (filters.types.length) {
    result = result.filter(j => filters.types.includes(j.type) || (j.remote && filters.types.includes('remote')));
  }
  if (filters.salaries.length) {
    result = result.filter(j => {
      return filters.salaries.some(value => {
        if (value === 'under5') return j.salaryMax <= 5;
        if (value === '5-10') return j.salaryMin >= 5 && j.salaryMax <= 10;
        if (value === '10plus') return j.salaryMin >= 10;
        return true;
      });
    });
  }

  elInfo.innerHTML = `Tìm thấy <strong>${result.length}</strong> việc làm`;
  if (!result.length) {
    elList.innerHTML = '<div class="empty-state"><p>Không tìm thấy công việc phù hợp với bộ lọc của bạn.</p></div>';
    return;
  }
  elList.innerHTML = result.map(j => {
    const comp = COMPANIES.find(c => c.id === j.companyId) || {};
    return `
      <div class="job-card" onclick="viewJobDetail(${j.id})">
        <div style="display:flex;gap:12px;align-items:center">
          <div class="job-logo" style="background:${comp.color || '#ddd'}">
            ${comp.logo ? `<img src="${comp.logo}" alt="${comp.name}" />` : comp.short}
          </div>
          <div style="flex:1">
            <div class="job-title">${j.title}</div>
            <div class="job-meta">${j.company} • ${j.location} • ${j.salary}</div>
            <div class="job-meta">${j.type === 'intern' ? 'Thực tập' : j.type === 'fulltime' ? 'Toàn thời gian' : j.type} ${j.remote ? '• Remote' : ''}</div>
          </div>
        </div>
        <div style="display:flex;flex-direction:column;gap:8px;align-items:flex-end">
          <button class="btn-ghost" onclick="event.stopPropagation(); openApplyModal(${j.id})">Ứng tuyển</button>
          <button class="btn-ghost" onclick="event.stopPropagation(); toggleSaveJob(${j.id}, this)">${DB.savedJobs.includes(j.id) ? '❤️' : '🤍'}</button>
        </div>
      </div>
    `;
  }).join('');
}

function clearAllFilters() {
  document.getElementById('heroSearchInput').value = '';
  document.querySelectorAll('input[name="filterLocation"]:checked').forEach(i => i.checked = false);
  document.querySelectorAll('input[name="filterType"]:checked').forEach(i => i.checked = false);
  document.querySelectorAll('input[name="filterSalary"]:checked').forEach(i => i.checked = false);
  filterJobs();
}

function viewJobDetail(id) {
  const job = JOBS.find(x => x.id === id);
  if (!job) return;
  renderJobDetailModal(job);
  openModal('jobDetailModal');
}

function renderJobDetailModal(job) {
  const detailContent = document.getElementById('jobDetailContent');
  if (!detailContent) return;
  const comp = COMPANIES.find(c => c.id === job.companyId) || {};
  detailContent.innerHTML = `
    <div class="job-detail-header">
      <div>
        <h3>${job.title}</h3>
        <div class="job-meta">${job.company} • ${job.location} ${job.remote ? '• Remote' : ''}</div>
      </div>
      <div class="job-detail-actions">
        <button class="btn-ghost" onclick="openApplyModal(${job.id})">Ứng tuyển</button>
        <button class="btn-ghost" onclick="toggleSaveJob(${job.id}, this)">${DB.savedJobs.includes(job.id) ? '❤️ Đã lưu' : '🤍 Lưu việc'}</button>
      </div>
    </div>
    <div class="job-detail-summary">
      <p><strong>Mức lương:</strong> ${job.salary}</p>
      <p><strong>Hạn nộp:</strong> ${job.deadline}</p>
      <p><strong>Loại hình:</strong> ${job.type === 'intern' ? 'Thực tập' : 'Toàn thời gian'} ${job.remote ? '• Remote' : ''}</p>
      <p><strong>Yêu cầu:</strong> ${job.requirements}</p>
    </div>
    <div class="job-detail-section">
      <h4>Mô tả công việc</h4>
      <p>${job.description}</p>
    </div>
    <div class="job-detail-section">
      <h4>Quyền lợi</h4>
      <ul>${job.benefits.map(b => `<li>${b}</li>`).join('')}</ul>
    </div>
  `;
}

function renderCVManager() {
  const content = document.getElementById('cvManagerContent');
  if (!content) return;
  const currentName = DB.currentUser?.cvName || 'Chưa có CV';
  const uploadedAt = DB.currentUser?.cvUploaded ? new Date(DB.currentUser.cvUploaded).toLocaleDateString('vi-VN') : null;
  content.innerHTML = `
    <div class="form-group">
      <label for="cvUploadInput">Tải lên CV mới</label>
      <input id="cvUploadInput" type="file" accept=".pdf,.doc,.docx" />
      <small style="color:#64748b">Hỗ trợ: PDF, Word (.doc, .docx)</small>
    </div>
    <div style="margin-top:20px;padding:20px;background:#f7fbff;border-radius:8px">
      <p style="font-weight:600;margin-bottom:10px">CV hiện tại:</p>
      <p style="color:#64748b"><span id="cvCurrentName">${currentName}</span></p>
      ${uploadedAt ? `<p style="color:#64748b; margin-top:8px">Tải lên: ${uploadedAt}</p>` : ''}
    </div>
  `;
  document.getElementById('cvUploadInput')?.addEventListener('change', (e) => handleCvUpload(e.target));
}

function handleCvUpload(input) {
  if (!DB.currentUser) {
    showToast('Vui lòng đăng nhập');
    openModal('loginModal');
    return;
  }
  const file = input.files[0];
  if (!file) return;
  DB.currentUser.cvName = file.name;
  DB.currentUser.cvUploaded = new Date().toISOString();
  DB.save();
  document.getElementById('cvCurrentName')?.textContent = file.name;
  showToast('CV đã được chọn và lưu');
}

function saveCvChanges() {
  if (!DB.currentUser) {
    showToast('Vui lòng đăng nhập');
    openModal('loginModal');
    return;
  }
  closeAllModals();
  showToast('CV đã được cập nhật');
}

function renderApplicationsList() {
  const container = document.getElementById('jobsListFull');
  const info = document.getElementById('jobsResultInfo');
  if (!container || !info) return;
  if (!DB.currentUser) {
    info.innerHTML = 'Vui lòng đăng nhập để xem đơn ứng tuyển';
    container.innerHTML = `<div class="empty-state"><p>Vui lòng đăng nhập để tiếp tục.</p></div>`;
    return;
  }
  const apps = DB.applications.filter(a => a.userId === DB.currentUser.id);
  info.innerHTML = `Bạn có <strong>${apps.length}</strong> đơn ứng tuyển`;
  if (!apps.length) {
    container.innerHTML = `<div class="empty-state"><p>Chưa có đơn ứng tuyển.</p></div>`;
    return;
  }
  container.innerHTML = apps.map(a => `
    <div class="job-card application-card">
      <div style="flex:1">
        <div class="job-title">${a.jobTitle}</div>
        <div class="job-meta">${a.company} • ${a.applicantEmail}</div>
        <div class="job-meta">CV: ${a.cvFileName || 'Chưa tải lên'}</div>
        <div class="job-meta">${a.coverLetter ? 'Thư ứng tuyển đã gửi' : 'Chưa có thư ứng tuyển'}</div>
      </div>
      <div style="text-align:right">
        <div class="status-badge">${a.status}</div>
        <button class="btn-ghost" onclick="withdraw(${a.id})">Rút đơn</button>
      </div>
    </div>
  `).join('');
}

function withdraw(appId) {
  if (!confirm('Bạn có chắc muốn rút đơn?')) return;
  const idx = DB.applications.findIndex(a => a.id === appId && a.userId === DB.currentUser?.id);
  if (idx !== -1) {
    DB.applications.splice(idx, 1);
    DB.save();
    renderApplicationsList();
    showToast('Đã rút đơn ứng tuyển');
  }
}
// HELPERS for navigation from header menu
function renderProfileModal() {
  const profileContent = document.getElementById('profileContent');
  if (!profileContent || !DB.currentUser) return;

  profileContent.innerHTML = `
    <form id="profileForm">
      <div class="form-group">
        <label>Họ và tên</label>
        <input id="profileFullName" type="text" value="${DB.currentUser.fullName}" />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input id="profileEmail" type="email" value="${DB.currentUser.email}" readonly />
      </div>
      <div class="form-group">
        <label>Điện thoại</label>
        <input id="profilePhone" type="text" value="${DB.currentUser.phone || ''}" />
      </div>
      <div class="form-group">
        <label>Trường học</label>
        <input id="profileSchool" type="text" value="${DB.currentUser.school || ''}" />
      </div>
      <div class="form-group">
        <label>Ngành học</label>
        <input id="profileMajor" type="text" value="${DB.currentUser.major || ''}" />
      </div>
      <div class="form-group">
        <label>Niên khóa</label>
        <input id="profileYear" type="text" value="${DB.currentUser.year || ''}" />
      </div>
      <div class="form-actions">
        <button type="button" class="btn-ghost" onclick="closeAllModals()">Hủy</button>
        <button type="button" class="btn-primary" onclick="handleProfileSave()">Lưu hồ sơ</button>
      </div>
    </form>
  `;
}

function handleProfileSave() {
  if (!DB.currentUser) return;
  DB.currentUser.fullName = document.getElementById('profileFullName').value.trim() || DB.currentUser.fullName;
  DB.currentUser.phone = document.getElementById('profilePhone').value.trim();
  DB.currentUser.school = document.getElementById('profileSchool').value.trim();
  DB.currentUser.major = document.getElementById('profileMajor').value.trim();
  DB.currentUser.year = document.getElementById('profileYear').value.trim();
  DB.currentUser.avatar = DB.currentUser.fullName.split(' ').map(x => x[0]).slice(0,2).join('').toUpperCase();
  DB.save();
  updateAuthUI();
  closeAllModals();
  showToast('Hồ sơ đã được cập nhật');
}

function openProfile() {
  if (!DB.currentUser) { showToast('Vui lòng đăng nhập'); openModal('loginModal'); return; }
  renderProfileModal();
  openModal('profileModal');
}

function openAdminStudentPanel() {
  if (!isAdminUser()) { showToast('Bạn cần quyền admin để truy cập'); return; }
  renderAdminStudentPanel();
  openModal('adminStudentModal');
}

function openApplications() {
  renderApplicationsList();
  window.scrollTo({ top: document.getElementById('jobsListFull')?.offsetTop || 0, behavior:'smooth' });
}

// ---------- NAVIGATION & SEARCH ----------
let currentUserMode = 'candidate'; // 'candidate' or 'employer'
let searchHistory = [];

function goBack() {
  if (window.history.length > 1) {
    window.history.back();
  } else {
    window.location.href = '/';
  }
}

function showBackButton(show = true) {
  const btnBack = document.getElementById('btnBack');
  if (btnBack) {
    btnBack.style.display = show ? 'flex' : 'none';
  }
}

function handleSearch() {
  filterJobs();
  showBackButton(true);
}

function switchUserMode(mode) {
  currentUserMode = mode;
  const candidateNav = document.getElementById('candidateNav');
  const employerNav = document.getElementById('employerNav');
  
  if (mode === 'employer') {
    if (candidateNav) candidateNav.style.display = 'none';
    if (employerNav) employerNav.style.display = 'block';
    showToast('Chế độ Nhà tuyển dụng');
  } else {
    if (candidateNav) candidateNav.style.display = 'block';
    if (employerNav) employerNav.style.display = 'none';
    showToast('Chế độ Ứng viên');
  }
}

function navigateToPage(pageName, event) {
  if (event) event.preventDefault();
  
  const currentPage = window.location.href;
  if (!searchHistory.includes(currentPage)) {
    searchHistory.push(currentPage);
  }
  showBackButton(true);
  
  switch(pageName) {
    case 'jobs':
      document.getElementById('jobsListFull').scrollIntoView({ behavior: 'smooth' });
      showToast('Danh sách tìm việc thực tập');
      break;
    case 'cv':
      renderCVManager();
      openModal('cvManagerModal');
      showToast('Quản lý CV của bạn');
      break;
    case 'profile':
      if (!DB.currentUser) {
        showToast('Vui lòng đăng nhập');
        openModal('loginModal');
      } else {
        openProfile();
      }
      break;
    case 'applications':
      openApplications();
      showToast('Danh sách đơn ứng tuyển của bạn');
      break;
    case 'find-candidates':
      showToast('Tìm kiếm ứng viên (Chức năng dành cho nhà tuyên dụng)');
      break;
    case 'post-job':
      if (!DB.currentUser) {
        showToast('Vui lòng đăng nhập');
        openModal('loginModal');
      } else {
        openModal('postJobModal');
      }
      break;
    case 'packages':
      showToast('Gói dịch vụ cho nhà tuyển dụng');
      break;
    case 'job-applications':
      showToast('Đơn ứng tuyển từ ứng viên');
      break;
    case 'contact':
      showToast('Liên hệ: support@internhub.com | Hotline: 1900-xxxx');
      break;
    case 'privacy':
      showToast('Chính sách bảo mật dữ liệu cá nhân');
      break;
    case 'terms':
      showToast('Điều khoản và điều kiện sử dụng dịch vụ');
      break;
    case 'admin-students':
      openAdminStudentPanel();
      break;
    default:
      showToast(`Chuyển tới: ${pageName}`);
  }
}

function toggleSaveJob(jobId, btn) {
  if (!DB.currentUser) { showToast('Vui lòng đăng nhập'); openModal('loginModal'); return; }
  const idx = DB.savedJobs.indexOf(jobId);
  if (idx >= 0) {
    DB.savedJobs.splice(idx, 1);
    btn.textContent = '🤍';
    showToast('Đã bỏ lưu việc làm');
  } else {
    DB.savedJobs.push(jobId);
    btn.textContent = '❤️';
    showToast('Đã lưu việc làm');
  }
  DB.save();
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  // wire forms
  document.getElementById('registerForm')?.addEventListener('submit', handleRegister);
  document.getElementById('loginForm')?.addEventListener('submit', handleLogin);
  document.getElementById('applyForm')?.addEventListener('submit', handleApply);
  
  // search button
  document.getElementById('heroSearchBtn')?.addEventListener('click', handleSearch);
  
  // filter and enter key
  document.getElementById('heroSearchInput')?.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  });
  document.getElementById('filterApplyBtn')?.addEventListener('click', filterJobs);
  document.getElementById('filterClearBtn')?.addEventListener('click', clearAllFilters);
  document.querySelectorAll('input[name="filterLocation"], input[name="filterType"], input[name="filterSalary"]').forEach(input => {
    input.addEventListener('change', filterJobs);
  });
  document.getElementById('cvUploadInput')?.addEventListener('change', (e) => handleCvUpload(e.target));
  
  // initial renders
  renderHero();
  renderCompaniesGrid();
  renderBestJobs();
  renderIndustries();
  filterJobs();

  if (!DB.users.some(u => u.role === 'admin')) {
    const adminUser = {
      id: Date.now(),
      fullName: 'Quản trị viên hệ thống',
      email: 'admin@internhub.com',
      phone: '19001900',
      password: 'admin123',
      role: 'admin',
      avatar: 'QA',
      created: new Date().toISOString()
    };
    DB.users.push(adminUser);
    DB.save();
  }

  updateAuthUI();

  // Ensure back button is visible so user can navigate back
  showBackButton(true);
});