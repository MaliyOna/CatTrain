const Router = require('express');
const router = new Router();
const topicController = require('../controllers/topicController');
const authMiddleware = require('../middlewares/authMiddleware')

const controller = new topicController();

router.get('/:topicId', authMiddleware, controller.getTopicById);
router.put('/:topicId/title', authMiddleware, controller.updateTopicTitle);
router.put('/:topicId/description', authMiddleware, controller.updateTopicDescription);
router.post('/:topicId/example', authMiddleware, controller.addExampleToTopic);
router.post('/:topicId/exercise', authMiddleware, controller.addExerciseToTopic);
router.delete('/:topicId', authMiddleware, controller.deleteTopic);

module.exports = router;