const express = require('express')
const router = express.Router()

const AuthRouter = require('../controller/AuthController');

router.post("/register", AuthRouter.register);
router.post("/login", AuthRouter.login);
router.post("/active-account", AuthRouter.activateAccount);
router.post("/forgot-password", AuthRouter.forgotPassword);
router.post("/reset-password", AuthRouter.resetPassword);


module.exports = router;