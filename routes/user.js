const express = require('express');
const router = express.Router();
const userController = require('../controller/usercontroller');

const user = new userController();

const tokenHandler = require("../middleware/tokenHandler");

router.get('/user', tokenHandler.checkUserToken, user.getUser );
router.get('/allusers', user.getAllUsers );
router.delete('/user/:id', user.deleteuser );
router.put('/user', tokenHandler.checkUserToken, user.updateUserDetails);
router.put('/user/email/:id', tokenHandler.checkUserToken, user.updateEmail);
router.post('/user/shippingAddress', tokenHandler.checkUserToken,user.addShippingAddress);
router.get('/user/shippingAddress', tokenHandler.checkUserToken,user.getShippingAddress);

module.exports = router;