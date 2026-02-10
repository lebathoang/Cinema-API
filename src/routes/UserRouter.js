const express = require('express');
const router = express.Router();
const userRouter = require('../controller/UserController');

router.get('/profile/:id', userRouter.profile);
router.get('/list-customer', userRouter.listCustomer);
router.put("/change-password", userRouter.changePassword);
router.post("/send-mail", userRouter.sendMail);

module.exports = router;
