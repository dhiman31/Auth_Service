const user_controller = require('../../controllers/userController')
const express = require('express');
const router = express.Router();
const {validAuthRequest,validate_is_admin_request} = require('../../middlewares/userMiddlewares');

router.post('/user/signup',validAuthRequest,user_controller.Register)
router.post('/user/login',validAuthRequest,user_controller.login)
router.delete('/user/delete',user_controller.deleteAccount)
router.get('/user/isAuthenticated',user_controller.isAuthenticated)
router.get('/user/isAdmin',validate_is_admin_request,user_controller.isAdmin)

module.exports = router;