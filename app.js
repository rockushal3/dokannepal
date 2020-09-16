require('./database/connection');
var cors = require('cors')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors())
app.use(cors())
app.use("/public", express.static(__dirname + '/public'));

//Authentication Route
app.use('/api/auth', require('./routes/auth'));

//User Route
app.use('/api', require('./routes/user'));
app.use('/api', require('./routes/product'));
app.use('/api', require('./routes/category'));
app.use('/api', require('./routes/discount'));
app.use('/api', require('./routes/ratings'));
app.use('/api', require('./routes/order'));
app.use('/api', require('./routes/googleTrends'));

app.use(function(err, req, res, next){
    res.status(422).send({error: err.message});
    });
    
    
    app.listen(process.env.port || 3030, function(){
    
    
    });
    