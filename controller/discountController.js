const discount = require('../model/Discount');


class DiscountController{


    addDiscount(req, res){
        discount.create({
            discount_name  : req.body.name,
            discount_value  : req.body.value,
        }, function(err, discount){
            if(err) return res.status(500).send(err);


            return res.json({
                success : true,
                message: "Discount Added",
                discount : discount
            })
        });
    }

    getDiscount(req, res){
        discount.find(function(err, discounts){
            if(err) return res.status(500).send(err);


            return res.json({
                success : true,
                message: "Successfull",
                discounts : discounts
            })
        })
    }

}


module.exports = DiscountController;
