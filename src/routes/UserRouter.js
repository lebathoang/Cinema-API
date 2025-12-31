const express = require('express');
const router = express.Router();
const userRouter = require('../controller/UserController');
const authMiddleware = require('../middlewares/UserMiddleware');

router.get('/profile', authMiddleware, userRouter.profile);
router.get('/list', userRouter.list);
router.put("/change-password", userRouter.changePassword);
router.post("/send-mail", userRouter.sendMail);


module.exports = router;
