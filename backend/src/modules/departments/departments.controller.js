const prisma = require('../../config/prisma');
const { ok, created, error, notFound, serverError } = require('../../utils/response');

const list = async (req, res) => {
  try {
    const departments = await prisma.department.findMany({
      include: { _count: { select: { users: true } } },
      orderBy: { name: 'asc' },
    });
    return ok(res, departments);
  } catch (err) {
    serverError(res, err);
  }
};

const create = async (req, res) => {
  try {
    const { name, description, color } = req.body;
    if (!name) return error(res, 'Tên phòng ban là bắt buộc');

    const exists = await prisma.department.findUnique({ where: { name } });
    if (exists) return error(res, 'Tên phòng ban đã tồn tại');

    const dept = await prisma.department.create({ data: { name, description, color } });
    return created(res, dept, 'Tạo phòng ban thành công');
  } catch (err) {
    serverError(res, err);
  }
};

const update = async (req, res) => {
  try {
    const { name, description, color, isActive } = req.body;
    const id = parseInt(req.params.id);

    const dept = await prisma.department.findUnique({ where: { id } });
    if (!dept) return notFound(res, 'Không tìm thấy phòng ban');

    const updated = await prisma.department.update({ where: { id }, data: { name, description, color, isActive } });
    return ok(res, updated, 'Cập nhật thành công');
  } catch (err) {
    serverError(res, err);
  }
};

const remove = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const dept = await prisma.department.findUnique({ where: { id }, include: { _count: { select: { users: true } } } });
    if (!dept) return notFound(res, 'Không tìm thấy phòng ban');
    if (dept._count.users > 0) return error(res, 'Không thể xóa phòng ban đang có nhân sự');

    await prisma.department.delete({ where: { id } });
    return ok(res, null, 'Xóa phòng ban thành công');
  } catch (err) {
    serverError(res, err);
  }
};

module.exports = { list, create, update, remove };
