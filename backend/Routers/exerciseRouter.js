const Router = require('express');
const router = new Router();
const exerciseController = require('../controllers/exerciseController');
const {check} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware')

const controller = new exerciseController();

router.get('/:exerciseId', controller.getExerciseById);
router.put('/:exerciseId/title', controller.updateExerciseTitle);
router.put('/:exerciseId/description', controller.updateDescription);

module.exports = router;