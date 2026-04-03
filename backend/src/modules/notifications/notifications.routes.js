const router = require('express').Router();
const prisma = require('../../config/prisma');
const { ok, serverError } = require('../../utils/response');
const { auth } = require('../../middlewares/auth');

router.use(auth);

router.get('/', async (req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId: req.user.id },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return ok(res, notifications);
  } catch (err) { serverError(res, err); }
});

router.patch('/read-all', async (req, res) => {
  try {
    await prisma.notification.updateMany({ where: { userId: req.user.id, isRead: false }, data: { isRead: true } });
    return ok(res, null, 'Đã đọc tất cả thông báo');
  } catch (err) { serverError(res, err); }
});

router.patch('/:id/read', async (req, res) => {
  try {
    await prisma.notification.update({ where: { id: parseInt(req.params.id) }, data: { isRead: true } });
    return ok(res, null);
  } catch (err) { serverError(res, err); }
});

module.exports = router;
