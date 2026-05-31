/**
 * data.js - Kho chứa dữ liệu hệ thống
 */

const COMPANIES = [
    { id: 1, name: 'FPT Software', sector: 'CNTT', color: '#00aaff', abbr: 'FPT' },
    { id: 2, name: 'VNG Corporation', sector: 'Game/Tech', color: '#e53e3e', abbr: 'VNG' },
    { id: 3, name: 'Momo', sector: 'Fintech', color: '#a855f7', abbr: 'MM' },
    { id: 4, name: 'Tiki', sector: 'E-commerce', color: '#0ea5e9', abbr: 'TK' },
    { id: 5, name: 'VinGroup', sector: 'Tập đoàn', color: '#16a34a', abbr: 'VG' }
];

const JOBS = [
    {
        id: 1,
        title: 'Frontend Developer Intern',
        company: 'FPT Software',
        companyId: 1,
        salary: '5-8 triệu',
        location: 'Hà Nội',
        type: 'Full-time',
        deadline: '30/06/2026',
        category: 'CNTT',
        desc: 'Phát triển giao diện web với React.js.',
        requirements: ['Hiểu biết về HTML/CSS/JS', 'Có kinh nghiệm React là một lợi thế'],
        benefits: ['Lương tháng 13', 'Được mentor dẫn dắt', 'Cơ hội lên chính thức'],
        hot: true,
        new: true
    },
    {
        id: 2,
        title: 'Marketing Digital Intern',
        company: 'Tiki',
        companyId: 4,
        salary: '4-6 triệu',
        location: 'TP. HCM',
        type: 'Part-time',
        deadline: '15/06/2026',
        category: 'Marketing',
        desc: 'Hỗ trợ chạy chiến dịch quảng cáo Facebook/Google.',
        requirements: ['Có kỹ năng viết Content', 'Năng động, sáng tạo'],
        benefits: ['Môi trường làm việc năng động', 'Hỗ trợ dấu thực tập'],
        hot: true,
        new: false
    }
];

const CATEGORIES = [
    { icon: '💻', name: 'Công nghệ thông tin', count: 827 },
    { icon: '📣', name: 'Marketing', count: 456 },
    { icon: '📊', name: 'Kế toán', count: 312 },
    { icon: '🎨', name: 'Thiết kế', count: 289 },
    { icon: '💼', name: 'Kinh doanh', count: 534 }
];

// Trạng thái ứng dụng (State Management)
let state = {
    loggedIn: false,
    user: {
        name: '',
        email: '',
        gpa: 0,
        major: '',
        avatar: 'A' // Để hiển thị chữ cái đầu tên
    },
    applications: [], // Danh sách đơn đã ứng tuyển
    skills: ['JavaScript', 'React', 'Git'],
    cvList: [
        { id: 1, name: 'CV Lập trình Frontend', date: '20/05/2026', isDefault: true }
    ],
    currentJobId: null,
    currentFilter: 'all'
};

const STATUS_MAP = {
    pending: { label: 'Chờ xem xét', cls: 'status-pending' },
    reviewing: { label: 'Đang xem xét', cls: 'status-reviewing' },
    interview: { label: 'Phỏng vấn', cls: 'status-interview' },
    accepted: { label: 'Chấp nhận', cls: 'status-accepted' },
    rejected: { label: 'Từ chối', cls: 'status-rejected' }
};