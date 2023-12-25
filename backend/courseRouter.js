const Router = require('express');
const router = new Router();
const courseController = require('./controllers/courseController');
const {check} = require('express-validator');
const authMiddleware = require('./middlewares/authMiddleware')

const controller = new courseController();

router.post('/',
[
    check('title', "Название не должно быть пустым").notEmpty(),
    check('title', "Название должено быть больше 1 и меньше 10 символов").isLength({min:1, max:50})
], controller.createCourse);

router.get('/', controller.getAllCourse);

//router.post('/login', controller.login);
//router.get('/users', authMiddleware, controller.getUsers);

module.exports = router;