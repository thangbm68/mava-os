import { Bell, Search, Wifi } from 'lucide-react';
import useAuthStore from '../../store/authStore';

export default function Header({ title }) {
  const { user } = useAuthStore();

  return (
    <header className="h-14 bg-[#0e1018] border-b border-[#1a1f2e] flex items-center justify-between px-5 fixed top-0 right-0 left-56 z-30">
      <div className="flex items-center gap-3">
        <h1 className="text-sm font-bold text-white tracking-wide uppercase">{title}</h1>
        <span className="badge-live">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Live
        </span>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="pl-8 pr-4 py-1.5 text-xs bg-[#141720] border border-[#1e2433] rounded-lg w-48 text-gray-300 placeholder-gray-600 focus:outline-none focus:border-indigo-500/50"
          />
        </div>

        <button className="relative p-2 text-gray-500 hover:text-gray-300 hover:bg-white/5 rounded-lg transition-colors">
          <Bell size={16} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
        </button>

        <span className="badge-status">
          <Wifi size={11} />
          Hệ Thống Hoạt Động
        </span>

        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>
      </div>
    </header>
  );
}
