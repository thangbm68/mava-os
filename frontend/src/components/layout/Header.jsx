import { Bell, Search } from 'lucide-react';
import useAuthStore from '../../store/authStore';

export default function Header({ title }) {
  const { user } = useAuthStore();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 fixed top-0 right-0 left-64 z-30">
      <h1 className="text-lg font-semibold text-gray-800">{title}</h1>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            className="pl-9 pr-4 py-2 text-sm bg-gray-100 rounded-lg w-56 focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white text-sm font-semibold">
          {user?.name?.charAt(0)?.toUpperCase()}
        </div>
      </div>
    </header>
  );
}
