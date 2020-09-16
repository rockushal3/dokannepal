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
    getdiscountbyid(req,res){
        console.log(req.params.id)
        discount.findById(req.params.id)
        .then(function (postById) {
            res.send(postById)
        }).catch(function (e) {
            res.send(e)
        })
    }
    updateDiscount(req, res){
        
            discount.findByIdAndUpdate(req.params.id, req.body).then(function () {
                res.status(200).send().catch(function (e) {
                    res.status(400).send()
                    console.log(e)
                })
            
        })
    }

    deleteDiscount(req, res){
        discount.findByIdAndDelete(req.params.id).then(function () {
            res.send("post Deleted").catch(function (e) {
                res.send(e)
            })
        })
    }

}


module.exports = DiscountController;
