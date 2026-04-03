import { useEffect, useState } from 'react';
import {
  Users, CheckSquare, DollarSign, TrendingUp, AlertTriangle,
  Clock, Target, Zap, BarChart2, UserCheck, Video, Activity
} from 'lucide-react';
import api from '../../api/client';

const tabs = [
  { id: 'main', label: 'Trung Tâm Điều Hành Chính', icon: Zap },
  { id: 'finance', label: 'Doanh Thu & Tài Chính', icon: DollarSign },
  { id: 'hr', label: 'Nhân Sự & Năng Suất', icon: Users },
  { id: 'channel', label: 'Kênh & Sản Xuất', icon: Video },
  { id: 'alert', label: 'Cảnh Báo & AI', icon: AlertTriangle },
  { id: 'events', label: 'Dòng Sự Kiện', icon: Activity },
];

const fmtNum = (n) => n?.toLocaleString('vi-VN') || '0';
const fmtCurrency = (n) =>
  n >= 1e9
    ? `${(n / 1e9).toFixed(2)}B`
    : n >= 1e6
    ? `${(n / 1e6).toFixed(0)}M`
    : fmtNum(n);

function SectionHeader({ icon: Icon, title, color = 'text-yellow-400', time }) {
  return (
    <div className={`flex items-center justify-between mb-3 pb-2 border-b border-white/5`}>
      <div className="flex items-center gap-2">
        <Icon size={14} className={color} />
        <span className={`text-xs font-bold tracking-wide ${color}`}>{title}</span>
      </div>
      {time && <span className="text-[10px] text-gray-600">{time}</span>}
    </div>
  );
}

function StatRow({ label, value, valueClass = 'text-white', bold = false }) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs text-gray-500">{label}</span>
      <span className={`text-xs ${valueClass} ${bold ? 'font-bold' : ''}`}>{value}</span>
    </div>
  );
}

function DonutChart({ value, max, color, size = 80 }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  const r = 30;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1e2433" strokeWidth="6" />
        <circle
          cx={size / 2} cy={size / 2} r={r} fill="none"
          stroke={color} strokeWidth="6"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute text-center">
        <div className="text-sm font-bold text-white">{fmtNum(value)}</div>
        <div className="text-[9px] text-gray-500">tổng</div>
      </div>
    </div>
  );
}

function MainTab({ stats }) {
  const now = new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="space-y-4">
      {/* AI Summary banner */}
      <div className="card-dark p-3 border-l-4 border-yellow-500">
        <div className="flex items-center gap-2 mb-1">
          <Zap size={12} className="text-yellow-400" />
          <span className="text-[10px] font-bold text-yellow-400 tracking-widest">TỔNG HỢP & BÁO CÁO TỰ ĐỘNG HÀNG NGÀY BỞI TRÍ TUỆ NHÂN TẠO LUCY - AI AGENT TRỢ LÝ ĐIỀU HÀNH MAVA MEDIA</span>
          <span className="ml-auto text-[10px] text-gray-600">Cập nhật: {now}</span>
        </div>
      </div>

      {/* 4 main cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {/* HCNS */}
        <div className="card-dark p-4">
          <SectionHeader icon={Users} title="BÁO CÁO NHÂN SỰ" color="text-yellow-400" />
          <div className="space-y-0.5">
            <StatRow label="Tổng nhân sự" value={stats?.users?.total || 0} />
            <StatRow label="Đang online" value={stats?.users?.active || 0} valueClass="stat-green" bold />
            <StatRow label="Công việc đang làm" value={stats?.tasks?.inProgress || 0} valueClass="stat-blue" bold />
            <StatRow label="Cần làm" value={stats?.tasks?.todo || 0} />
            <StatRow label="Hoàn thành" value={stats?.tasks?.done || 0} valueClass="stat-green" />
            <StatRow label="Khẩn cấp" value={stats?.tasks?.urgent || 0} valueClass="stat-red" bold />
          </div>
        </div>

        {/* KPI */}
        <div className="card-dark p-4">
          <SectionHeader icon={Target} title="BÁO CÁO KPI TỔNG QUAN" color="text-yellow-400" />
          <div className="space-y-0.5">
            <StatRow label="Tổng phòng ban" value={stats?.departments || 0} />
            <StatRow label="Hoàn thành công việc" value={stats?.tasks?.done || 0} valueClass="stat-green" bold />
            <StatRow label="Đang xử lý" value={stats?.tasks?.inProgress || 0} valueClass="stat-blue" />
            <StatRow label="Khẩn cấp" value={stats?.tasks?.urgent || 0} valueClass="stat-red" bold />
            <StatRow label="Thông báo chưa đọc" value={stats?.notifications?.unread || 0} valueClass="stat-yellow" />
          </div>
        </div>

        {/* Doanh thu */}
        <div className="card-dark p-4">
          <SectionHeader icon={DollarSign} title="BÁO CÁO DOANH THU" color="text-yellow-400" />
          <div className="space-y-0.5">
            <StatRow label="Doanh thu tháng" value={fmtCurrency(stats?.finance?.revenueMonth)} valueClass="stat-green" bold />
            <StatRow label="Chi phí tháng" value={fmtCurrency(stats?.finance?.expenseMonth)} valueClass="stat-red" />
            <StatRow label="Lợi nhuận ước" value={fmtCurrency(stats?.finance?.profit)} valueClass={stats?.finance?.profit >= 0 ? 'stat-green' : 'stat-red'} bold />
          </div>
        </div>

        {/* Cảnh báo */}
        <div className="card-dark p-4">
          <SectionHeader icon={AlertTriangle} title="CẢNH BÁO & RỦI RO" color="text-red-400" />
          <div className="space-y-0.5">
            <StatRow label="Công việc khẩn cấp" value={stats?.tasks?.urgent || 0} valueClass="stat-red" bold />
            <StatRow label="Thông báo chưa đọc" value={stats?.notifications?.unread || 0} valueClass="stat-yellow" bold />
            <StatRow label="Có mặt hôm nay" value={stats?.attendance?.presentToday || 0} valueClass="stat-green" />
          </div>
        </div>
      </div>

      {/* Bottom 2 cards */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-3">
        {/* Task overview với donut */}
        <div className="card-dark p-4">
          <SectionHeader icon={CheckSquare} title="TỔNG QUAN CÔNG VIỆC" color="text-blue-400" />
          <div className="flex items-center gap-6">
            <DonutChart value={stats?.tasks?.total || 0} max={Math.max(stats?.tasks?.total || 1, 1)} color="#6366f1" />
            <div className="flex-1 space-y-1">
              <StatRow label="Cần làm" value={stats?.tasks?.todo || 0} />
              <StatRow label="Đang làm" value={stats?.tasks?.inProgress || 0} valueClass="stat-blue" bold />
              <StatRow label="Khẩn cấp" value={stats?.tasks?.urgent || 0} valueClass="stat-red" bold />
              <StatRow label="Hoàn thành" value={stats?.tasks?.done || 0} valueClass="stat-green" bold />
              <StatRow label="Tổng" value={stats?.tasks?.total || 0} valueClass="text-white" bold />
            </div>
          </div>
        </div>

        {/* Finance overview với donut */}
        <div className="card-dark p-4">
          <SectionHeader icon={DollarSign} title="DOANH THU" color="text-emerald-400" />
          <div className="flex items-center gap-6">
            <DonutChart
              value={stats?.finance?.revenueMonth || 0}
              max={Math.max(stats?.finance?.revenueMonth || 1, 1)}
              color="#10b981"
            />
            <div className="flex-1 space-y-1">
              <StatRow label="Doanh thu" value={fmtCurrency(stats?.finance?.revenueMonth)} valueClass="stat-green" bold />
              <StatRow label="Chi phí" value={fmtCurrency(stats?.finance?.expenseMonth)} valueClass="stat-red" />
              <StatRow label="Lợi nhuận" value={fmtCurrency(stats?.finance?.profit)} valueClass={stats?.finance?.profit >= 0 ? 'stat-green' : 'stat-red'} bold />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PlaceholderTab({ label }) {
  return (
    <div className="card-dark p-10 flex flex-col items-center justify-center text-center">
      <BarChart2 size={36} className="text-indigo-500/40 mb-3" />
      <p className="text-gray-500 text-sm">Module <span className="text-indigo-400">{label}</span> đang được phát triển</p>
      <p className="text-gray-600 text-xs mt-1">Sẽ hiển thị dữ liệu thực tế khi hoàn thành</p>
    </div>
  );
}

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('main');

  useEffect(() => {
    api.get('/dashboard/stats').then((r) => setStats(r.data.data)).catch(() => {});
    const interval = setInterval(() => {
      api.get('/dashboard/stats').then((r) => setStats(r.data.data)).catch(() => {});
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex items-center gap-1 overflow-x-auto pb-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-600/20 text-indigo-400 border border-indigo-500/30'
                : 'text-gray-500 hover:bg-white/5 hover:text-gray-300'
            }`}
          >
            <tab.icon size={12} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === 'main' && <MainTab stats={stats} />}
      {activeTab === 'finance' && <PlaceholderTab label="Doanh Thu & Tài Chính" />}
      {activeTab === 'hr' && <PlaceholderTab label="Nhân Sự & Năng Suất" />}
      {activeTab === 'channel' && <PlaceholderTab label="Kênh & Sản Xuất" />}
      {activeTab === 'alert' && <PlaceholderTab label="Cảnh Báo & AI" />}
      {activeTab === 'events' && <PlaceholderTab label="Dòng Sự Kiện" />}
    </div>
  );
}
