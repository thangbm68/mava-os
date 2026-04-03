import { Wrench, Zap, Bot, Video, BarChart2 } from 'lucide-react';

const tools = [
  { icon: Bot, label: 'AI Assistant', desc: 'Trợ lý AI hỗ trợ công việc hàng ngày', status: 'soon' },
  { icon: Video, label: 'YouTube Analytics', desc: 'Quản lý và phân tích kênh YouTube', status: 'soon' },
  { icon: Zap, label: 'Tự động hóa', desc: 'Tự động hóa các tác vụ lặp đi lặp lại', status: 'soon' },
  { icon: BarChart2, label: 'Báo cáo tổng hợp', desc: 'Tổng hợp dữ liệu từ nhiều nguồn', status: 'soon' },
];

export default function Tools() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Wrench size={24} className="text-indigo-500" />
        <h2 className="text-lg font-semibold text-gray-800">Tool hỗ trợ công việc</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {tools.map(({ icon: Icon, label, desc, status }) => (
          <div key={label} className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer group">
            <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-3 group-hover:bg-indigo-100 transition-colors">
              <Icon size={20} className="text-indigo-500" />
            </div>
            <h3 className="font-semibold text-gray-800 text-sm">{label}</h3>
            <p className="text-xs text-gray-400 mt-1">{desc}</p>
            <span className="mt-3 inline-block text-xs bg-yellow-100 text-yellow-600 px-2 py-0.5 rounded-full">Sắp ra mắt</span>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl p-6 text-white">
        <h3 className="font-bold text-lg">Đề xuất tool mới</h3>
        <p className="text-indigo-100 text-sm mt-1">Bạn cần tool gì để tăng hiệu suất? Hãy đề xuất để chúng tôi phát triển.</p>
        <button className="mt-4 px-4 py-2 bg-white text-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors">
          Gửi đề xuất
        </button>
      </div>
    </div>
  );
}
