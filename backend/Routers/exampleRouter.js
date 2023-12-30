const Router = require('express');
const router = new Router();
const exampleController = require('../controllers/exampleController');
const {check} = require('express-validator');
const authMiddleware = require('../middlewares/authMiddleware')

const controller = new exampleController();

router.get('/:exampleId', controller.getExampleById);
router.put('/:exampleId/title', controller.updateExampleTitle);
router.put('/:exampleId/description', controller.updateDescription);

module.exports = router;