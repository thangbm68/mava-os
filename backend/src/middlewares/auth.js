const jwt = require('jsonwebtoken');
const { unauthorized, forbidden } = require('../utils/response');

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return unauthorized(res, 'Không có token');

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    unauthorized(res, 'Token không hợp lệ hoặc đã hết hạn');
  }
};

const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return forbidden(res, 'Không có quyền thực hiện hành động này');
  }
  next();
};

module.exports = { auth, requireRole };
