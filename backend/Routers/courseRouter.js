const Router = require('express');
const router = new Router();
const courseController = require('../controllers/courseController');
const {check} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware')

const controller = new courseController();

router.post('/',
[
    check('title', "Название не должно быть пустым").notEmpty(),
    check('title', "Название должено быть больше 1 и меньше 10 символов").isLength({min:1, max:50})
], controller.createCourse);

router.get('/', controller.getAllCourse);
router.get('/:courseId', controller.getCourseById);
router.put('/:courseId/description', controller.updateDescriptionById);
router.put('/:courseId/level', controller.updateLevelById);
router.put('/:courseId/language', controller.updateLanguageById);
router.post('/:courseId/newtopic', controller.addNewTopic);
router.post('/:courseId/usercourses', controller.checkOrAddConnectionCourse);
router.post('/:courseId/topic/:topicId', controller.checkOrAddConnectionTopic);
router.delete('/:courseId', controller.deleteCourse);
router.put('/topic/:topicId/exercise/:exerciseId', controller.addExerciseToUserTopic);

module.exports = router;