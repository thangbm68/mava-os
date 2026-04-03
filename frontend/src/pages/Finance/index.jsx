import { TrendingUp, TrendingDown, DollarSign, FileText } from 'lucide-react';

export default function Finance() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Phòng tài chính</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { icon: TrendingUp, label: 'Doanh thu', color: 'text-green-500', bg: 'bg-green-50' },
          { icon: TrendingDown, label: 'Chi phí', color: 'text-red-500', bg: 'bg-red-50' },
          { icon: DollarSign, label: 'Công nợ', color: 'text-orange-500', bg: 'bg-orange-50' },
          { icon: FileText, label: 'Báo cáo', color: 'text-indigo-500', bg: 'bg-indigo-50' },
        ].map(({ icon: Icon, label, color, bg }) => (
          <div key={label} className={`${bg} rounded-xl p-5 flex flex-col items-center justify-center text-center h-32 cursor-pointer hover:shadow-md transition-shadow`}>
            <Icon size={28} className={color} />
            <p className="font-medium text-gray-700 mt-2 text-sm">{label}</p>
            <p className="text-xs text-gray-400 mt-1">Đang phát triển</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="font-semibold text-gray-800 mb-4">Tính năng sắp có</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          {['Báo cáo doanh thu theo tháng/quý/năm', 'Quản lý chi phí theo danh mục', 'Theo dõi công nợ khách hàng', 'Dự báo tài chính', 'Xuất báo cáo PDF/Excel'].map((f) => (
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
