const express = require('express');
const router = express.Router();
const discountController = require('../controller/discountController');


const tokenHandler = require("../middleware/tokenHandler");


const discount = new discountController;



router.post('/discount', discount.addDiscount);
router.get('/discount', discount.getDiscount);

 

module.exports = router;