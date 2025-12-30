const express = require('express')
const router = express.Router()

const AuthController = require('../controller/AuthController');

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/active-account", AuthController.activateAccount);
router.post("/forgot-password", userRouter.forgotPassword);
router.post("/reset-password", userRouter.resetPassword);


module.exports = router;