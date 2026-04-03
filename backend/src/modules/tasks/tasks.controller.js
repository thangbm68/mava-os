const prisma = require('../../config/prisma');
const { ok, created, notFound, error, serverError } = require('../../utils/response');

// === BOARDS ===
const listBoards = async (req, res) => {
  try {
    const boards = await prisma.board.findMany({
      include: { department: { select: { id: true, name: true } }, _count: { select: { columns: true } } },
      orderBy: { name: 'asc' },
    });
    return ok(res, boards);
  } catch (err) { serverError(res, err); }
};

const createBoard = async (req, res) => {
  try {
    const { name, description, color, departmentId } = req.body;
    if (!name) return error(res, 'Tên board là bắt buộc');

    const board = await prisma.board.create({
      data: {
        name, description, color,
        departmentId: departmentId ? parseInt(departmentId) : null,
        columns: {
          create: [
            { name: 'Cần làm', order: 0, color: '#6b7280' },
            { name: 'Đang làm', order: 1, color: '#3b82f6' },
            { name: 'Khẩn cấp', order: 2, color: '#ef4444' },
            { name: 'Hoàn thành', order: 3, color: '#22c55e' },
          ],
        },
      },
      include: { columns: { orderBy: { order: 'asc' } } },
    });
    return created(res, board, 'Tạo board thành công');
  } catch (err) { serverError(res, err); }
};

// === BOARD DETAIL (columns + tasks) ===
const getBoardDetail = async (req, res) => {
  try {
    const board = await prisma.board.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        department: { select: { id: true, name: true } },
        columns: {
          orderBy: { order: 'asc' },
          include: {
            tasks: {
              orderBy: { order: 'asc' },
              include: {
                assignees: { include: { user: { select: { id: true, name: true, avatar: true } } } },
                tags: true,
                _count: { select: { comments: true } },
              },
            },
          },
        },
      },
    });
    if (!board) return notFound(res, 'Không tìm thấy board');
    return ok(res, board);
  } catch (err) { serverError(res, err); }
};

// === TASKS ===
const createTask = async (req, res) => {
  try {
    const { title, description, columnId, priority, dueDate, assigneeIds } = req.body;
    if (!title || !columnId) return error(res, 'Thiếu thông tin bắt buộc');

    const lastTask = await prisma.task.findFirst({ where: { columnId: parseInt(columnId) }, orderBy: { order: 'desc' } });

    const task = await prisma.task.create({
      data: {
        title, description,
        columnId: parseInt(columnId),
        priority: priority || 'MEDIUM',
        dueDate: dueDate ? new Date(dueDate) : null,
        order: (lastTask?.order ?? -1) + 1,
        creatorId: req.user.id,
        assignees: assigneeIds?.length
          ? { create: assigneeIds.map((uid) => ({ userId: parseInt(uid) })) }
          : undefined,
      },
      include: {
        assignees: { include: { user: { select: { id: true, name: true, avatar: true } } } },
        tags: true,
        creator: { select: { id: true, name: true } },
      },
    });
    return created(res, task, 'Tạo công việc thành công');
  } catch (err) { serverError(res, err); }
};

const updateTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const { title, description, priority, dueDate, columnId, order } = req.body;

    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return notFound(res, 'Không tìm thấy công việc');

    const updated = await prisma.task.update({
      where: { id },
      data: {
        title, description, priority,
        dueDate: dueDate ? new Date(dueDate) : null,
        columnId: columnId ? parseInt(columnId) : undefined,
        order: order !== undefined ? parseInt(order) : undefined,
      },
      include: {
        assignees: { include: { user: { select: { id: true, name: true, avatar: true } } } },
        tags: true,
      },
    });
    return ok(res, updated, 'Cập nhật thành công');
  } catch (err) { serverError(res, err); }
};

const deleteTask = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const task = await prisma.task.findUnique({ where: { id } });
    if (!task) return notFound(res, 'Không tìm thấy công việc');
    await prisma.task.delete({ where: { id } });
    return ok(res, null, 'Xóa công việc thành công');
  } catch (err) { serverError(res, err); }
};

// === COMMENTS ===
const addComment = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) return error(res, 'Nội dung bình luận là bắt buộc');

    const comment = await prisma.taskComment.create({
      data: { content, taskId: parseInt(req.params.id), userId: req.user.id },
      include: { user: { select: { id: true, name: true, avatar: true } } },
    });
    return created(res, comment);
  } catch (err) { serverError(res, err); }
};

module.exports = { listBoards, createBoard, getBoardDetail, createTask, updateTask, deleteTask, addComment };
