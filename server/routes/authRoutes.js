const express = require('express');
const { register, login , logout } = require('../controllers/authController');
const router = express.Router();
const {authenticate} = require('../middlewares/authMiddleware')

router.post('/register', register);
router.post('/login' , login);
router.get('/logout', authenticate , logout);

module.exports = router;
