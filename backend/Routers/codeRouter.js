const Router = require('express');
const router = new Router();
const codeController = require('../controllers/codeController');
const authMiddleware = require('../middlewares/authMiddleware')

const controller = new codeController();

router.put('/:codeId', authMiddleware, controller.updateCode);

module.exports = router;