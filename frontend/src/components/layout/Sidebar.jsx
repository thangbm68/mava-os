import { NavLink } from 'react-router-dom';
import {
  Zap, Bot, MessageSquare, Users, Briefcase, BookOpen,
  BarChart2, CheckSquare, AlertTriangle, HelpCircle,
  Settings, ChevronLeft, DollarSign, Video, Shield
} from 'lucide-react';
import useAuthStore from '../../store/authStore';

const groups = [
  {
    label: 'ĐIỀU HÀNH',
    items: [
      { to: '/', icon: Zap, label: 'Trung Tâm Điều Hành', end: true },
      { to: '/ai-agent', icon: Bot, label: 'AI Agent' },
      { to: '/chat', icon: MessageSquare, label: 'Chat Nội Bộ' },
    ],
  },
  {
    label: 'PHÒNG BAN',
    items: [
      { to: '/hr', icon: Users, label: 'Phòng Nhân Sự' },
      { to: '/agency', icon: Briefcase, label: 'Phòng Agency' },
      { to: '/finance', icon: DollarSign, label: 'Phòng Kinh Doanh' },
      { to: '/accounting', icon: BookOpen, label: 'Phòng Kế Toán' },
      { to: '/qc', icon: Shield, label: 'Phòng QC' },
    ],
  },
  {
    label: 'QUẢN LÝ',
    items: [
      { to: '/goals', icon: BarChart2, label: 'Cam Kết & Mục Tiêu' },
      { to: '/reports', icon: BarChart2, label: 'Báo Cáo' },
      { to: '/tasks', icon: CheckSquare, label: 'Công Việc Cần Làm' },
      { to: '/alerts', icon: AlertTriangle, label: 'Cảnh Báo', badge: 5 },
    ],
  },
  {
    label: 'HỖ TRỢ',
    items: [
      { to: '/tools', icon: Video, label: 'Tool Hỗ Trợ' },
      { to: '/feedback', icon: HelpCircle, label: 'Góp Ý & Hỗ Trợ' },
    ],
  },
];

export default function Sidebar() {
  const { user, logout } = useAuthStore();
  const isAdmin = ['ADMIN', 'SUPER_ADMIN'].includes(user?.role);

  return (
    <aside className="flex flex-col w-56 min-h-screen bg-[#0e1018] border-r border-[#1a1f2e] fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="px-4 py-4 border-b border-[#1a1f2e]">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-indigo-500/30">
            M
          </div>
          <div>
            <div className="font-bold text-white text-sm tracking-wide">MAVA-OS</div>
            <div className="text-[10px] text-gray-500">Business System</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {groups.map((group) => (
          <div key={group.label}>
            <div className="text-[10px] font-bold text-gray-600 tracking-widest px-2 mb-1.5">
              {group.label}
            </div>
            <div className="space-y-0.5">
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all ${
                      isActive
                        ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20'
                        : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                    }`
                  }
                >
                  <item.icon size={15} />
                  <span className="flex-1 text-[13px]">{item.label}</span>
                  {item.badge && (
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center">
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}

        {isAdmin && (
          <div>
            <div className="text-[10px] font-bold text-gray-600 tracking-widest px-2 mb-1.5">ADMIN</div>
            <NavLink
              to="/admin"
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-sm transition-all ${
                  isActive ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/20' : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
                }`
              }
            >
              <Settings size={15} />
              <span className="text-[13px]">Cài Đặt</span>
            </NavLink>
          </div>
        )}
      </nav>

      {/* Collapse + User */}
      <div className="border-t border-[#1a1f2e] p-3 space-y-2">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-white/5 cursor-pointer group">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold text-gray-300 truncate">{user?.name}</div>
            <div className="text-[10px] text-gray-600 truncate">{user?.role}</div>
          </div>
          <button
            onClick={logout}
            className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
            title="Đăng xuất"
          >
            <ChevronLeft size={14} />
          </button>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] text-gray-600 hover:text-red-400 transition-colors"
        >
          <ChevronLeft size={12} />
          Thu Gọn
        </button>
      </div>
    </aside>
  );
}
