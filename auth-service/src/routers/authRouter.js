const {Router} = require('express');
const AuthController = require('../controllers/AuthController');
const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/tokens', AuthController.getAccessToken);

module.exports = router;
