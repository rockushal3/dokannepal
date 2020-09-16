const admin = require("../model/Admin");



class AdminContorller{

    login(req, res){
        admin.find({email : req.body.email}, function(err, admin){

            
        });
    }
}


module.exports = AdminContorller;