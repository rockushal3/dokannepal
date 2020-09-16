
const user = require('../model/User');
const bcrypt = require('bcrypt');


class UserController{

    getUser(req, res){
  
        return res.json({
            success : true,
            message : "User is Logged in",
            firstname : req.userdata.firstname,
            lastname : req.userdata.lastname,
            phone : req.userdata.phone,
            location : req.userdata.location,
            email : req.userdata.email,
        })
    }
    deleteuser(req,res){
        user.findByIdAndDelete(req.params.id).then(function () {
            res.send("post Deleted").catch(function (e) {
                res.send(e)
            })
        })
    }
    
    getAllUsers(req,res){
        user.find().then(function (findAllpost) {
            res.send(findAllpost).catch(function (e) {
                res.send(e)
            })
        })
    }

    updateUserDetails(req, res){

        let id = req.userdata.id;
        
        let updateData = {
            firstname : req.body.fname,
            lastname  : req.body.lname,
            phone : req.body.phone,
            location : req.body.location
        }
        user.findByIdAndUpdate(id, updateData, function(err, data){
            if(err) return res.send({
                success : false,
                message : err
            })

            return res.json({
                success : true,
                message: "Update Successfully",
                user : data
            })
        })
    }


    updateEmail(req, res){
        let id = req.params.id;

        

        let updateData = {
            email : req.body.email,
            
        }
        user.findByIdAndUpdate(id, updateData, function(err, data){
            if(err) return res.json({success:false, message : err})

            return res.json({
                success:true,
                message: "Successfully Updated",
                data : data,
            })
        })
    }

    addShippingAddress(req, res){   

        var id = req.userdata.id;

        let shippingAddress = {
            fullname : req.body.fullname,
            phonenumber : req.body.phonenumber,
            address : req.body.address,
            city  : req.body.city,
            zone : req.body.zone
        }


        user.findById(id, function(err, userdata){
            if(err) return res.status(500).send({
                success : false,
                message : err
            });
         console.log(shippingAddress)
            userdata.shippingAddress = userdata.shippingAddress.concat(shippingAddress);
            userdata.save();

            return res.status(200).json({
                success : true,
                message : "Shipping Address Added",
               
            })


        })

    }
   

    getShippingAddress(req, res){
        var id = req.userdata.id;

        user.findById(id, function(err, userdata){
            if(err) return res.status(500).send({
                success: false,
                message: err
            })

            return res.status(200).json({
                success: true,
                message: "Shipping Address",
                shippingAddress : userdata.shippingAddress
            })
        })
    }
}

module.exports = UserController;