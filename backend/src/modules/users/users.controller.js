const bcrypt = require('bcryptjs');
const prisma = require('../../config/prisma');
const { ok, created, error, notFound, serverError } = require('../../utils/response');
const { paginate, paginatedResponse } = require('../../utils/pagination');

const userSelect = {
  id: true, name: true, email: true, role: true,
  avatar: true, position: true, phone: true, isActive: true,
  lastSeenAt: true, createdAt: true,
  department: { select: { id: true, name: true, color: true } },
};

const list = async (req, res) => {
  try {
    const { page, limit, skip } = paginate(req.query);
    const { search, role, departmentId, isActive } = req.query;

    const where = {
      ...(search && { OR: [{ name: { contains: search, mode: 'insensitive' } }, { email: { contains: search, mode: 'insensitive' } }] }),
      ...(role && { role }),
      ...(departmentId && { departmentId: parseInt(departmentId) }),
      ...(isActive !== undefined && { isActive: isActive === 'true' }),
    };

    const [users, total] = await Promise.all([
      prisma.user.findMany({ where, select: userSelect, skip, take: limit, orderBy: { name: 'asc' } }),
      prisma.user.count({ where }),
    ]);
    return ok(res, paginatedResponse(users, total, page, limit));
  } catch (err) {
    serverError(res, err);
  }
};

const getOne = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: parseInt(req.params.id) }, select: userSelect });
    if (!user) return notFound(res, 'Không tìm thấy người dùng');
    return ok(res, user);
  } catch (err) {
    serverError(res, err);
  }
};

const create = async (req, res) => {
  try {
    const { name, email, password, role, departmentId, position, phone } = req.body;
    if (!name || !email || !password) return error(res, 'Thiếu thông tin bắt buộc');

    const exists = await prisma.user.findUnique({ where: { email } });
    if (exists) return error(res, 'Email đã tồn tại');

    const hashed = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { name, email, password: hashed, role, departmentId: departmentId ? parseInt(departmentId) : null, position, phone },
      select: userSelect,
    });
    return created(res, user, 'Tạo tài khoản thành công');
  } catch (err) {
    serverError(res, err);
  }
};

const update = async (req, res) => {
  try {
    const { name, role, departmentId, position, phone, isActive, avatar } = req.body;
    const id = parseInt(req.params.id);

    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) return notFound(res, 'Không tìm thấy người dùng');

    const updated = await prisma.user.update({
      where: { id },
      data: { name, role, departmentId: departmentId ? parseInt(departmentId) : undefined, position, phone, isActive, avatar },
      select: userSelect,
    });
    return ok(res, updated, 'Cập nhật thành công');
  } catch (err) {
    serverError(res, err);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { newPassword } = req.body;
    if (!newPassword || newPassword.length < 6) return error(res, 'Mật khẩu phải có ít nhất 6 ký tự');

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: parseInt(req.params.id) }, data: { password: hashed } });
    return ok(res, null, 'Reset mật khẩu thành công');
  } catch (err) {
    serverError(res, err);
  }
};

module.exports = { list, getOne, create, update, resetPassword };
