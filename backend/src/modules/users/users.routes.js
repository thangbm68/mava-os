const router = require('express').Router();
const { list, getOne, create, update, resetPassword } = require('./users.controller');
const { auth, requireRole } = require('../../middlewares/auth');

router.use(auth);
router.get('/', list);
router.get('/:id', getOne);
router.post('/', requireRole('ADMIN', 'SUPER_ADMIN'), create);
router.patch('/:id', requireRole('ADMIN', 'SUPER_ADMIN'), update);
router.patch('/:id/reset-password', requireRole('ADMIN', 'SUPER_ADMIN'), resetPassword);

module.exports = router;
