const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../../config/prisma');
const { ok, error, unauthorized, serverError } = require('../../utils/response');

const signToken = (user) =>
  jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
  );

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return error(res, 'Email và mật khẩu là bắt buộc');

    const user = await prisma.user.findUnique({
      where: { email },
      include: { department: { select: { id: true, name: true } } },
    });
    if (!user || !user.isActive) return unauthorized(res, 'Tài khoản không tồn tại hoặc đã bị khóa');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return unauthorized(res, 'Sai mật khẩu');

    await prisma.user.update({ where: { id: user.id }, data: { lastSeenAt: new Date() } });

    const { password: _, ...userData } = user;
    return ok(res, { token: signToken(user), user: userData }, 'Đăng nhập thành công');
  } catch (err) {
    serverError(res, err);
  }
};

const me = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: {
        id: true, name: true, email: true, role: true,
        avatar: true, position: true, phone: true, lastSeenAt: true,
        department: { select: { id: true, name: true, color: true } },
      },
    });
    if (!user) return unauthorized(res, 'Không tìm thấy tài khoản');
    return ok(res, user);
  } catch (err) {
    serverError(res, err);
  }
};

const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { id: req.user.id } });

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid) return error(res, 'Mật khẩu hiện tại không đúng');
    if (newPassword.length < 6) return error(res, 'Mật khẩu mới phải có ít nhất 6 ký tự');

    const hashed = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: req.user.id }, data: { password: hashed } });
    return ok(res, null, 'Đổi mật khẩu thành công');
  } catch (err) {
    serverError(res, err);
  }
};

module.exports = { login, me, changePassword };
