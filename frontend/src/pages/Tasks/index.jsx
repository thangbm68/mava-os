import { useEffect, useState } from 'react';
import { Plus, LayoutGrid } from 'lucide-react';
import api from '../../api/client';

const priorityColors = {
  LOW: 'bg-gray-100 text-gray-600',
  MEDIUM: 'bg-blue-100 text-blue-600',
  HIGH: 'bg-orange-100 text-orange-600',
  URGENT: 'bg-red-100 text-red-600',
};

const TaskCard = ({ task }) => (
  <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow">
    <p className="text-sm font-medium text-gray-800">{task.title}</p>
    {task.description && <p className="text-xs text-gray-400 mt-1 line-clamp-2">{task.description}</p>}
    <div className="flex items-center justify-between mt-3">
      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${priorityColors[task.priority]}`}>
        {task.priority}
      </span>
      {task.assignees?.length > 0 && (
        <div className="flex -space-x-1">
          {task.assignees.slice(0, 3).map((a) => (
            <div key={a.user.id} className="w-6 h-6 rounded-full bg-indigo-400 border-2 border-white flex items-center justify-center text-white text-xs">
              {a.user.name.charAt(0)}
            </div>
          ))}
        </div>
      )}
    </div>
  </div>
);

const Column = ({ column }) => (
  <div className="flex-shrink-0 w-72 bg-gray-50 rounded-xl p-3">
    <div className="flex items-center justify-between mb-3">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: column.color || '#6b7280' }} />
        <span className="text-sm font-semibold text-gray-700">{column.name}</span>
        <span className="text-xs bg-gray-200 text-gray-600 rounded-full px-2">{column.tasks?.length || 0}</span>
      </div>
    </div>
    <div className="space-y-2">
      {column.tasks?.map((task) => <TaskCard key={task.id} task={task} />)}
    </div>
  </div>
);

export default function Tasks() {
  const [boards, setBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [board, setBoard] = useState(null);

  useEffect(() => {
    api.get('/tasks/boards').then((r) => {
      setBoards(r.data.data);
      if (r.data.data.length > 0) setSelectedBoard(r.data.data[0].id);
    });
  }, []);

  useEffect(() => {
    if (!selectedBoard) return;
    api.get(`/tasks/boards/${selectedBoard}`).then((r) => setBoard(r.data.data));
  }, [selectedBoard]);

  return (
    <div className="h-full flex flex-col">
      {/* Board selector */}
      <div className="flex items-center gap-3 mb-4">
        <LayoutGrid size={20} className="text-gray-500" />
        <div className="flex gap-2 flex-wrap">
          {boards.map((b) => (
            <button
              key={b.id}
              onClick={() => setSelectedBoard(b.id)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${selectedBoard === b.id ? 'bg-indigo-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}
            >
              {b.name}
            </button>
          ))}
          <button className="px-4 py-1.5 rounded-lg text-sm font-medium bg-white text-indigo-600 border border-dashed border-indigo-300 hover:bg-indigo-50 flex items-center gap-1">
            <Plus size={14} /> Thêm board
          </button>
        </div>
      </div>

      {/* Kanban board */}
      {board ? (
        <div className="flex gap-4 overflow-x-auto pb-4 flex-1">
          {board.columns?.map((col) => <Column key={col.id} column={col} />)}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-gray-400">
          {boards.length === 0 ? 'Chưa có board nào. Hãy tạo board đầu tiên!' : 'Đang tải...'}
        </div>
      )}
    </div>
  );
}
