const router = require('express').Router();
const c = require('./tasks.controller');
const { auth, requireRole } = require('../../middlewares/auth');

router.use(auth);
router.get('/boards', c.listBoards);
router.post('/boards', c.createBoard);
router.get('/boards/:id', c.getBoardDetail);
router.post('/', c.createTask);
router.patch('/:id', c.updateTask);
router.delete('/:id', requireRole('ADMIN', 'SUPER_ADMIN', 'MANAGER'), c.deleteTask);
router.post('/:id/comments', c.addComment);

module.exports = router;
