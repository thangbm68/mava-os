const router = require('express').Router();
const { login, me, changePassword } = require('./auth.controller');
const { auth } = require('../../middlewares/auth');

router.post('/login', login);
router.get('/me', auth, me);
router.patch('/change-password', auth, changePassword);

module.exports = router;
