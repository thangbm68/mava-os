const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { auth, requireRole } = require('../middlewares/auth');

router.post('/login', login);
router.post('/register', auth, requireRole('ADMIN'), register);

module.exports = router;
