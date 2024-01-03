const Router = require('express');
const router = new Router();
const exampleController = require('../controllers/exampleController');
const authMiddleware = require('../middlewares/authMiddleware')

const controller = new exampleController();

router.get('/:exampleId', authMiddleware, controller.getExampleById);
router.put('/:exampleId/title', authMiddleware,  controller.updateExampleTitle);
router.put('/:exampleId/description', authMiddleware, controller.updateDescription);
router.delete('/:exampleId', authMiddleware, controller.deleteExample);

module.exports = router;