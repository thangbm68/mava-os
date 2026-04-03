import { FileText, Receipt, Calculator } from 'lucide-react';

export default function Accounting() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-gray-800">Phòng kế toán</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { icon: FileText, label: 'Hóa đơn', desc: 'Xuất và quản lý hóa đơn' },
          { icon: Receipt, label: 'Quyết toán thuế', desc: 'Báo cáo thuế định kỳ' },
          { icon: Calculator, label: 'Sổ sách kế toán', desc: 'Ghi chép nghiệp vụ kế toán' },
        ].map(({ icon: Icon, label, desc }) => (
          <div key={label} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col items-center text-center">
            <Icon size={32} className="text-indigo-400 mb-3" />
            <h3 className="font-semibold text-gray-700">{label}</h3>
            <p className="text-xs text-gray-400 mt-1">{desc}</p>
            <span className="mt-3 text-xs bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full">Đang phát triển</span>
          </div>
        ))}
      </div>
    </div>
  );
}
