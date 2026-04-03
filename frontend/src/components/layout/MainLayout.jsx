import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

const titles = {
  '/': 'Trung tâm điều hành',
  '/chat': 'Chat nội bộ',
  '/tasks': 'Quản lý công việc',
  '/hr': 'Phòng nhân sự',
  '/finance': 'Phòng tài chính',
  '/accounting': 'Phòng kế toán',
  '/tools': 'Tool hỗ trợ',
  '/admin': 'Quản trị hệ thống',
};

export default function MainLayout() {
  const { pathname } = useLocation();
  const title = titles[pathname] || 'MAVA-OS';

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64 flex flex-col">
        <Header title={title} />
        <main className="flex-1 mt-16 p-6 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
