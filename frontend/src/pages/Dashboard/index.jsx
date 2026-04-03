import { useEffect, useState } from 'react';
import { Users, CheckSquare, DollarSign, TrendingUp, AlertCircle, Clock, Target } from 'lucide-react';
import api from '../../api/client';

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
  <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500">{label}</p>
        <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
        {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
      </div>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
  </div>
);

const fmtCurrency = (n) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(n);

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/dashboard/stats').then((r) => setStats(r.data.data)).catch(() => {});
  }, []);

  if (!stats) return (
    <div className="flex items-center justify-center h-64">
      <div className="text-gray-400">Đang tải dữ liệu...</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Stats row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Nhân sự" value={stats.users.active} sub={`Tổng: ${stats.users.total}`} color="bg-indigo-500" />
        <StatCard icon={CheckSquare} label="Công việc đang làm" value={stats.tasks.inProgress} sub={`Tổng: ${stats.tasks.total}`} color="bg-blue-500" />
        <StatCard icon={AlertCircle} label="Công việc khẩn cấp" value={stats.tasks.urgent} sub="Cần xử lý ngay" color="bg-red-500" />
        <StatCard icon={Clock} label="Có mặt hôm nay" value={stats.attendance.presentToday} sub="Nhân sự đi làm" color="bg-green-500" />
      </div>

      {/* Finance row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <StatCard icon={TrendingUp} label="Doanh thu tháng này" value={fmtCurrency(stats.finance.revenueMonth)} color="bg-emerald-500" />
        <StatCard icon={DollarSign} label="Chi phí tháng này" value={fmtCurrency(stats.finance.expenseMonth)} color="bg-orange-500" />
        <StatCard icon={Target} label="Lợi nhuận tháng này" value={fmtCurrency(stats.finance.profit)} color={stats.finance.profit >= 0 ? 'bg-green-600' : 'bg-red-600'} />
      </div>

      {/* Task overview */}
      <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
        <h2 className="font-semibold text-gray-800 mb-4">Tổng quan công việc</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Cần làm', value: stats.tasks.todo, color: 'bg-gray-100 text-gray-600' },
            { label: 'Đang làm', value: stats.tasks.inProgress, color: 'bg-blue-100 text-blue-600' },
            { label: 'Khẩn cấp', value: stats.tasks.urgent, color: 'bg-red-100 text-red-600' },
            { label: 'Hoàn thành', value: stats.tasks.done, color: 'bg-green-100 text-green-600' },
          ].map((s) => (
            <div key={s.label} className={`rounded-lg p-4 text-center ${s.color}`}>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Placeholder sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-4">Báo cáo phòng ban</h2>
          <p className="text-gray-400 text-sm">Dữ liệu sẽ được cập nhật khi có dữ liệu từ các phòng ban.</p>
        </div>
        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <h2 className="font-semibold text-gray-800 mb-4">Báo cáo KPI</h2>
          <p className="text-gray-400 text-sm">KPI của các nhân sự sẽ được hiển thị tại đây.</p>
        </div>
      </div>
    </div>
  );
}
