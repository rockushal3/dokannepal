const express = require('express');
const router = express.Router();
const googleTrends = require('../controller/googleTrendsController'); 


router.get('/trends', googleTrends.trendsdata);
router.get('/trendsdataregion', googleTrends.trendsdataregion);
module.exports = router;