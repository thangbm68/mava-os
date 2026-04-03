import { Hash, MessageCircle } from 'lucide-react';

export default function Chat() {
  return (
    <div className="flex h-[calc(100vh-8rem)] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Channel list */}
      <div className="w-56 bg-gray-900 text-white flex flex-col">
        <div className="px-4 py-3 border-b border-gray-700">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Channels</p>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {['#general', '#marketing', '#dev', '#finance'].map((c) => (
            <button key={c} className="w-full flex items-center gap-2 px-3 py-1.5 rounded text-gray-400 hover:bg-gray-700 hover:text-white text-sm transition-colors">
              <Hash size={15} /> {c}
            </button>
          ))}
        </div>
        <div className="px-4 py-3 border-t border-gray-700">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Tin nhắn riêng</p>
          <div className="space-y-1">
            {['Nguyễn A', 'Trần B'].map((u) => (
              <button key={u} className="w-full flex items-center gap-2 px-3 py-1.5 rounded text-gray-400 hover:bg-gray-700 hover:text-white text-sm transition-colors">
                <div className="w-5 h-5 rounded-full bg-indigo-500 flex items-center justify-center text-xs">{u.charAt(0)}</div>
                {u}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        <div className="px-5 py-3 border-b border-gray-200 flex items-center gap-2">
          <Hash size={18} className="text-gray-400" />
          <span className="font-semibold text-gray-800">general</span>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-gray-400">
            <MessageCircle size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm">Tính năng chat đang được phát triển</p>
            <p className="text-xs mt-1">Sẽ sớm ra mắt với đầy đủ tính năng</p>
          </div>
        </div>
        <div className="px-4 py-3 border-t border-gray-200">
          <input
            type="text"
            placeholder="Nhập tin nhắn..."
            className="w-full px-4 py-2.5 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>
      </div>
    </div>
  );
}
