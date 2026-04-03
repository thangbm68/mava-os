import { Users, Clock, Calendar, TrendingUp } from 'lucide-react';

const ComingSoon = ({ icon: Icon, title, desc }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center h-40">
    <Icon size={28} className="text-indigo-400 mb-3" />
    <h3 className="font-semibold text-gray-700">{title}</h3>
    <p className="text-xs text-gray-400 mt-1">{desc}</p>
  </div>
);

export default function HR() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">Phòng nhân sự</h2>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700">
          Thêm nhân sự
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ComingSoon icon={Users} title="Danh sách nhân sự" desc="Quản lý toàn bộ nhân sự" />
        <ComingSoon icon={Clock} title="Chấm công" desc="Theo dõi đi muộn, về sớm" />
        <ComingSoon icon={Calendar} title="Đơn nghỉ phép" desc="Quản lý nghỉ phép" />
        <ComingSoon icon={TrendingUp} title="KPI" desc="Theo dõi hiệu suất" />
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Sắp ra mắt</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          {['Quản lý hồ sơ nhân sự', 'Bảng chấm công tự động', 'Quản lý ca làm việc', 'Báo cáo KPI theo tháng', 'Tính lương tự động'].map((f) => (
            <li key={f} className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
