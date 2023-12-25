const Router = require('express');
const router = new Router();
const authController = require('./controllers/authController');
const {check} = require('express-validator');
const authMiddleware = require('./middlewares/authMiddleware')

const controller = new authController();

router.post('/registration',
[
    check('userName', "Имя пользователя не должно быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
], controller.registration);

router.post('/login', controller.login);
router.get('/users', authMiddleware, controller.getUsers);

module.exports = router;
