const Router = require('express');
const router = new Router();
const userProfileController = require('../controllers/userProfileController');
const authMiddleware = require('../middlewares/authMiddleware')

const controller = new userProfileController();

router.get('/:userName', authMiddleware, controller.getUser);

module.exports = router;