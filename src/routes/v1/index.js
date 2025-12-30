const user_controller = require('../../controllers/userController')
const express = require('express');
const router = express.Router();
const {validAuthRequest} = require('../../middlewares/userMiddlewares');

router.post('/user/signup',validAuthRequest,user_controller.Register)
router.post('/user/login',validAuthRequest,user_controller.login)
router.delete('/user/delete',user_controller.deleteAccount)
router.get('/user/isAuthenticated',user_controller.isAuthenticated)

module.exports = router;