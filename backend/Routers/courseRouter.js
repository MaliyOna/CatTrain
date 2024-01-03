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

router.get('/', authMiddleware, controller.getAllCourse);
router.get('/:courseId', authMiddleware, controller.getCourseById);
router.put('/:courseId/description', authMiddleware, controller.updateDescriptionById);
router.put('/:courseId/title', authMiddleware, controller.updateCourseTitle);
router.put('/:courseId/level',authMiddleware, controller.updateLevelById);
router.put('/:courseId/language', authMiddleware, controller.updateLanguageById);
router.post('/:courseId/newtopic', authMiddleware, controller.addNewTopic);
router.post('/:courseId/usercourses', authMiddleware, controller.checkOrAddConnectionCourse);
router.post('/:courseId/topic/:topicId', authMiddleware, controller.checkOrAddConnectionTopic);
router.delete('/:courseId', authMiddleware, controller.deleteCourse);
router.put('/topic/:topicId/exercise/:exerciseId', authMiddleware, controller.addExerciseToUserTopic);

module.exports = router;