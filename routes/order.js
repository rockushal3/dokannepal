const express = require('express');
const router = express.Router();
const orderController = require('../controller/orderController'); 

const order= new orderController();

const tokenHandler = require("../middleware/tokenHandler");

router.post('/order', tokenHandler.checkUserToken, order.addOrder);
router.post('/order/multiple', tokenHandler.checkUserToken, order.addOrders);
 router.get('/order', tokenHandler.checkUserToken, order.getOrdersByUser);
 router.get('/getorder', order.getallorder);
 router.get('/getorderpending', order.getallorderpending);
 router.put('/order/:id', order.updateOrder);
 router.delete('/order', tokenHandler.checkUserToken, order.cancelOrders);
module.exports = router;