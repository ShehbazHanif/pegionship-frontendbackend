const express = require('express');
const router = express.Router();
const { login, updateProfile, getProfile } = require('../controllers/auth');
const authMiddleware = require('../middleware/auth');

router.post('/login', login);
router.get('/profile', authMiddleware, getProfile);
router.put('/profile', authMiddleware, updateProfile);

module.exports = router;