const express = require('express');
const router = express.Router();
const ratingsController = require('../controller/ratingsController');


const tokenHandler = require("../middleware/tokenHandler");


const ratings = new ratingsController;



router.post('/ratings', tokenHandler.checkUserToken, ratings.addRatings);
router.get('/ratings/:product', ratings.getRatings);
router.get('/ratings/limit/:product', ratings.getRatingsByLimit);
router.get('/ratings/user/:product', tokenHandler.checkUserToken, ratings.getRatingByUser);
router.get('/ratings/count/:product', ratings.ratingsCount);
module.exports = router;