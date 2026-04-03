const router = require('express').Router();
const { list, create, update, remove } = require('./departments.controller');
const { auth, requireRole } = require('../../middlewares/auth');

router.use(auth);
router.get('/', list);
router.post('/', requireRole('ADMIN', 'SUPER_ADMIN'), create);
router.patch('/:id', requireRole('ADMIN', 'SUPER_ADMIN'), update);
router.delete('/:id', requireRole('ADMIN', 'SUPER_ADMIN'), remove);

module.exports = router;
