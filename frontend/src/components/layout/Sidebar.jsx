import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, MessageSquare, CheckSquare, Users,
  DollarSign, Calculator, Wrench, Settings, LogOut, ChevronRight
} from 'lucide-react';
import useAuthStore from '../../store/authStore';

const menus = [
  {
    group: 'Điều hành',
    items: [
      { to: '/', icon: LayoutDashboard, label: 'Trung tâm điều hành' },
      { to: '/chat', icon: MessageSquare, label: 'Chat nội bộ' },
    ],
  },
  {
    group: 'Công việc',
    items: [
      { to: '/tasks', icon: CheckSquare, label: 'Quản lý công việc' },
    ],
  },
  {
    group: 'Phòng ban',
    items: [
      { to: '/hr', icon: Users, label: 'Nhân sự' },
      { to: '/finance', icon: DollarSign, label: 'Tài chính' },
      { to: '/accounting', icon: Calculator, label: 'Kế toán' },
    ],
  },
  {
    group: 'Tiện ích',
    items: [
      { to: '/tools', icon: Wrench, label: 'Tool hỗ trợ' },
    ],
  },
];

const adminMenus = [
  { to: '/admin', icon: Settings, label: 'Quản trị hệ thống' },
];

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(user?.role);

  return (
    <aside className="flex flex-col w-64 min-h-screen bg-gray-900 text-white fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-700">
        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-sm">M</div>
        <div>
          <div className="font-bold text-sm">MAVA-OS</div>
          <div className="text-xs text-gray-400">Business System</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-6">
        {menus.map((group) => (
          <div key={group.group}>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">
              {group.group}
            </div>
            <div className="space-y-1">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-indigo-600 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`
                  }
                >
                  <item.icon size={18} />
                  <span className="flex-1">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        ))}

        {isAdmin && (
          <div>
            <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-2 mb-2">Admin</div>
            <div className="space-y-1">
              {adminMenus.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                      isActive ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`
                  }
                >
                  <item.icon size={18} />
                  <span className="flex-1">{item.label}</span>
                </NavLink>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* User */}
      <div className="border-t border-gray-700 p-3">
        <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gray-800 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-semibold flex-shrink-0">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium truncate">{user?.name}</div>
            <div className="text-xs text-gray-400 truncate">{user?.role}</div>
          </div>
          <button onClick={logout} className="text-gray-500 hover:text-red-400 transition-colors" title="Đăng xuất">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
}
