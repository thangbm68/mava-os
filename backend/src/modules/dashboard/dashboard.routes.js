const router = require('express').Router();
const { getStats } = require('./dashboard.controller');
const { auth } = require('../../middlewares/auth');

router.get('/stats', auth, getStats);

module.exports = router;
