const express = require('express');
const router = express.Router();
const auth = require('../controller/authcontroller');


const userAuthHandler = new auth();

router.post('/login', userAuthHandler.login);
router.post('/checkemail', userAuthHandler.checkEmailAvailability);
router.post('/register', userAuthHandler.register);
router.post('/sendverificationcode', userAuthHandler.sendVerificationCode);
router.post('/verifycode', userAuthHandler.verifyCode);



module.exports = router;
