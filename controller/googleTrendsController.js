const googleTrends = require('google-trends-api');

exports.trendsdata = (req, res) => {
    googleTrends.interestOverTime({keyword: req.query.key,geo: 'NP',startTime:new Date('2019-02-01'), endTime: new Date('2020-09-06')})
.then(function(results){
  res.send(results)
})
.catch(function(err){
    res.send(err)
});
}

exports.trendsdataregion = (req, res) => {
  googleTrends.interestByRegion({keyword: req.query.key,geo: 'NP',startTime:new Date('2019-02-01'), endTime: new Date('2020-09-06')})
.then(function(results){
res.send(results)
})
.catch(function(err){
  res.send(err)
});
}