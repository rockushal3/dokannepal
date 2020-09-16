const order = require("../model/Order");


class OrderController{

    
    addOrder(req, res){
        var id = req.userdata.id;

        let shippingAddress = {
            fullname : req.body.shippingAddress.fullname,
            phonenumber : req.body.shippingAddress.phonenumber,
            address : req.body.shippingAddress.address,
            city  : req.body.shippingAddress.city,
            zone : req.body.shippingAddress.zone
        }
 
       var orderdata = {
            userid : id,
            productid  : req.body.productid,
            quantity : req.body.quantity,
            total : req.body.total,
            shippingAddress : shippingAddress,
            paymentOption : req.body.paymentOption,
            isPaid : req.body.paid,
            isDelivered : false,
        }

        order.create(orderdata, function(err, data){
            if(err) return res.status(500).send({
                success : false,
                message : err
            })


            return res.status(200).json({
                success:true,
                message : "Order Added"
            })
        })
    }
    
    addOrders(req, res){
        var id = req.userdata.id;

       req.body.map(value => {
      

        let shippingAddress = {
            fullname : value.shippingAddress.fullname,
            phonenumber : value.shippingAddress.phonenumber,
            address : value.shippingAddress.address,
            city  : value.shippingAddress.city,
            zone : value.shippingAddress.zone
        }
        var orderdata = {
            userid : id,
            productid  : value.productid,
            quantity : value.quantity,
            total : value.total,
            shippingAddress : shippingAddress,
            paymentOption : value.paymentOption,
            isPaid : value.paid,
            isDelivered : false,
        }
             order.create(orderdata);
       });
       return res.status(200).json({
           success: true,
           message: "Order Added Successfully"
       })
    }

    getOrdersByUser(req, res){
        let id = req.userdata._id
            order.find({userid : id} ).populate({ 
                path: 'productid',
                populate: {
                    path: 'discount',
                    model: 'discount',
                    as : 'dis'
                  } 
             }).exec(function(err, orderdata){
                if(err) return res.status(500).send({
                    success : false,
                    message : err
                })

                return res.status(200).json({
                    success: true,
                    message : "Orders",
                    orders : orderdata
                })

            })
    }

    cancelOrders(req, res){
        var id = req.userdata.id;

      
       
        req.body.map(value => {
            
            order.deleteOne({userid : id, productid : value}, function(err, data){
                if(err) console.log(err);

                console.log(data);
          
            });
          
        }
        ); 

        return res.status(200).json({
            success: true,
            message: "Order Successfully Deleted"
        })
    }
}


module.exports = OrderController;