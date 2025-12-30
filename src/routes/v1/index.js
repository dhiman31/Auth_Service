const user_controller = require('../../controllers/userController')
const express = require('express');
const router = express.Router();
const {validLoginRequest , validSignUpRequest} = require('../../middlewares/userMiddlewares');

router.post('/user/signup',validSignUpRequest,user_controller.Register)
router.post('/user/login',validLoginRequest,user_controller.login)
router.delete('/user/delete',user_controller.deleteAccount)

module.exports = router;