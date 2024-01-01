const Router = require('express');
const router = new Router();
const userProfileController = require('../controllers/userProfileController');
const {check} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware')

const controller = new userProfileController();

router.get('/:userName', controller.getUser);

module.exports = router;