import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const titles = {
  '/': 'Trung Tâm Điều Hành',
  '/chat': 'Chat Nội Bộ',
  '/tasks': 'Công Việc Cần Làm',
  '/hr': 'Phòng Nhân Sự',
  '/finance': 'Phòng Kinh Doanh',
  '/accounting': 'Phòng Kế Toán',
  '/tools': 'Tool Hỗ Trợ',
  '/admin': 'Cài Đặt Hệ Thống',
  '/alerts': 'Cảnh Báo',
  '/reports': 'Báo Cáo',
  '/goals': 'Cam Kết & Mục Tiêu',
};

export default function MainLayout() {
  const { pathname } = useLocation();
  const title = titles[pathname] || 'MAVA-OS';

  return (
    <div className="flex min-h-screen bg-[#0b0d13]">
      <Sidebar />
      <div className="flex-1 ml-56 flex flex-col">
        <Header title={title} />
        <main className="flex-1 mt-14 p-5 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
