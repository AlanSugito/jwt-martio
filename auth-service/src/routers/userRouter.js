const {Router} = require('express');
const UserController = require('../controllers/UserController');

const router = Router();

router.get('/', UserController.getAllUsers);

module.exports = router;
