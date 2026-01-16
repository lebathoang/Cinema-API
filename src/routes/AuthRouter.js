const express = require('express')
const router = express.Router()

const AuthController = require('../controller/AuthController');

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/activate-account", AuthController.activateAccount);
router.post("/resend-activation", AuthController.resendActivation);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);


module.exports = router;