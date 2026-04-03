import { Users, Building2, Shield, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';

const adminSections = [
  { icon: Users, label: 'Quản lý người dùng', desc: 'Thêm, sửa, xóa tài khoản nhân sự', to: '/admin/users', color: 'bg-blue-50 text-blue-500' },
  { icon: Building2, label: 'Phòng ban', desc: 'Quản lý cơ cấu tổ chức', to: '/admin/departments', color: 'bg-purple-50 text-purple-500' },
  { icon: Shield, label: 'Phân quyền', desc: 'Thiết lập quyền truy cập', to: '/admin/roles', color: 'bg-orange-50 text-orange-500' },
  { icon: Settings, label: 'Cài đặt hệ thống', desc: 'Cấu hình chung cho hệ thống', to: '/admin/settings', color: 'bg-gray-50 text-gray-500' },
];

export default function Admin() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Quản trị hệ thống</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {adminSections.map(({ icon: Icon, label, desc, to, color }) => (
          <Link key={to} to={to} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
              <Icon size={24} />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800">{label}</h3>
              <p className="text-xs text-gray-400 mt-0.5">{desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
