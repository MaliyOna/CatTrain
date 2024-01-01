const Router = require('express');
const router = new Router();
const topicController = require('../controllers/topicController');
const {check} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware')

const controller = new topicController();

router.get('/:topicId', controller.getTopicById);
router.put('/:topicId/title', controller.updateTopicTitle);
router.put('/:topicId/description', controller.updateTopicDescription);
router.post('/:topicId/example', controller.addExampleToTopic);
router.post('/:topicId/exercise', controller.addExerciseToTopic);
router.delete('/:topicId', controller.deleteTopic);

module.exports = router;