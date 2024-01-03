const Router = require('express');
const router = new Router();
const exerciseController = require('../controllers/exerciseController');
const authMiddleware = require('../middlewares/authMiddleware')

const controller = new exerciseController();

router.get('/:exerciseId', authMiddleware, controller.getExerciseById);
router.put('/:exerciseId/title', authMiddleware, controller.updateExerciseTitle);
router.put('/:exerciseId/description', authMiddleware, controller.updateDescription);
router.delete('/:exerciseId', authMiddleware, controller.deleteExample);

module.exports = router;