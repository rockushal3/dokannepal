
const user = require('../model/User');
let jwt = require('jsonwebtoken');
let config = require('../config');
const Nexmo = require('nexmo');
const bcrypt = require('bcrypt');


class AuthController{
    login(req, res){
        user.findOne({email : req.body.email, type : "Account"}, function(err, user){

            if(err){
                return res.status(500).json({
                    success : false,
                    message : "Server error"
                })
            }

            if(!user){
                return res.status(401).json({
                    success : false,
                    message : "Incorrect username or password",
                    token : null
                })
            }

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
            if(!passwordIsValid){
                return res.status(401).json({
                    success : false,
                    message : "Incorrect username or password",
                    token : null
                })
            }

            let token = jwt.sign({id : user._id.toString()}, config.secret,
            {
                expiresIn : '24h'
            });
            user.tokens  = user.tokens.concat({token : token});
            user.save();
            return res.status(200).json({
                success : true,
                message : "Authentication successful",
                token : token,
                _id : user._id
             
                
            })
        })
    }

    checkEmailAvailability(req, res){
           
            
        user.findOne({email : req.body.email, type : "Account"}, function(err, user){
            if(err){
                return res.status(500).send('Error on the server');
                
            }
    
            if(user){
               
                return res.send({
                    success : false,
                    message: 'Email Already Exists',
                    
                });
            }else{
                return res.send({
                    success : true,
                    message: 'Email Available',
                    
                });
            }
            
        })
    }

    register(req, res){

        user.findOne({email : req.body.email, type : req.body.type}, function(err, userAvailable){
            if(err){
                return res.status(500).send('Error on the server');
                
            }
    
            if(userAvailable){
                let token = jwt.sign({id : userAvailable._id.toString()}, config.secret,
                {
                    expiresIn : '24h'
                });
                userAvailable.tokens  = userAvailable.tokens.concat({token : token});
                userAvailable.save();
                return res.send({
                    success : false,
                    message: 'Account Already Exists',
                    token : token,
                    _id : userAvailable._id
                });

            }else{
                var hashedPasword = bcrypt.hashSync(req.body.password, 8);
           
                user.create({
                    firstname : req.body.firstname,
                    lastname : req.body.lastname,
                    location : req.body.location,
                    phone : req.body.phone,
                    type : req.body.type,
                    location : req.body.location,
                    email : req.body.email,
                    password : hashedPasword
                }, 
                function(err, user){
                    if(err) return res.status(500).send(err);
    
                    let token = jwt.sign({id : user._id}, config.secret,
                       {
                           expiresIn : '24h'
                       });
                       user.tokens = user.tokens.concat({token : token});
                       user.save();
    
                       return res.status(200).json({
                           success : true,
                           message : 'Authentication successful',
                           token : token,
                           _id : user._id
                       })
                    })
            }
            
        })
            

    }

    sendVerificationCode(req, res){
       
 
        const accountSid = 'AC2362f51eb9cad154bddb22c89f17965b';
        const authToken = '954fc0c8b1764756d5a8b7e671cf55ce';
        const client = require('twilio')(accountSid, authToken);

        client.verify.services.create({friendlyName: 'MeroPasal', codeLength : '4'})
                      .then(function(service){
                        console.log(service.sid)
                       client.verify.services(service.sid)
                       .verifications
                       .create({to: '+977' + req.body.phone, channel: 'sms'})
                       .then(function(verification){
                         
                        
                        console.log(verification.status);

                        return res.json({
                            success : true,
                            message : 'Verification Code Sent!',
                            sid : service.sid
                        })

                       });
                      });

    }

    verifyCode(req, res){

        const accountSid = 'AC2362f51eb9cad154bddb22c89f17965b';
        const authToken = '954fc0c8b1764756d5a8b7e671cf55ce';
        const client = require('twilio')(accountSid, authToken);

        
                        client.verify.services(req.body.sid)
                        .verificationChecks
                        .create({to: '+977' + req.body.phone, code: req.body.code})
                        .then(function(verification_check){ 

                            console.log(verification_check.status)

                            if(verification_check.status == "approved"){
                                return res.json({
                                    success : true,
                                    message : 'Phone Verified Successfully!'
                                })
                            }else{
                                return res.json({
                                    success : false,
                                    message : 'Invalid Code'
                                })
                            }
                          
                        });
               
      
    }

   
   

}

module.exports = AuthController;