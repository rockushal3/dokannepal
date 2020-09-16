const jwt = require('jsonwebtoken');
const config = require('../config');
const User = require('../model/User');

let checkUserToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
        if(token){
            if (token.startsWith('Bearer ')) {
                // Remove Bearer from string
                token = token.slice(7, token.length);
              }
     
        jwt.verify(token, config.secret, async(err, decoded)=>{
            if(err){
                console.log(err)
                return res.json({
                    success: false,
                    message : "Token is not valid",
                    token : null
                })
            }
            else {
                req.decoded = decoded;
             User.findOne({
                    _id : decoded.id, 
                    'tokens.token' : token
                }, function(err, user){
                    if(err) return res.send(err)

                    if(!user){
                        return res.json({
                            success : false,
                            message : "Auth token is not supplied",
                            token : null
                        })
                    }
                    req.userdata = user;
                    req.token = token;
                    next();
                })
              
            }
        });
    }else{
        return res.json({
            success: false,
            message: 'Auth token is not supplied',
            token : null
          });
    }
}
module.exports = {
    checkUserToken : checkUserToken
}