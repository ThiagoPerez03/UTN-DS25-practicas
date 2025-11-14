const { Router } = require('express');
const ctrl = require('../controllers/authController');
const { requireAuth } = require('../middlewares/auth');

const router = Router();

router.post('/register', ctrl.register);
router.post('/login', ctrl.login);
router.put('/profile', requireAuth, ctrl.updateProfile);

module.exports = router;
