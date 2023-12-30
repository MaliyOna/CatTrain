const Router = require('express');
const router = new Router();
const codeController = require('../controllers/codeController');

const controller = new codeController();

router.put('/:codeId', controller.updateCode);

module.exports = router;