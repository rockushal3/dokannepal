const rating = require('../model/Rating');
const mongoose = require('mongoose');

class RatingsController {


    addRatings(req, res){
     rating.findOne({user : req.userdata._id, product : req.body.product}, function(err, review){
        if(err) res.status(500).send(err); 
           
        if(!review){
            rating.create({
                user : req.userdata._id,
                product : req.body.product,
                ratings: req.body.ratings,
                review : req.body.review
            }, function(err, ratings){
                if(err) return res.status(500).send(err);
    
                return res.json({
                    success: true,
                    message:  "Ratings Successfully Added",
                
                });
            });
         } else{
                 
         var updatedata = {
            ratings: req.body.ratings,
            review : req.body.review
        };
        
        rating.findByIdAndUpdate(review._id, updatedata, function(err, review){
            if(err) res.status(500).send(err); 

            rating.findById(review._id, function(err, reviewdata){
                return res.json({
                    success: true,
                    message:  "Ratings Updated Added",
                   
                });
            })
        })
         }

    
     })
    }


    getRatings(req, res){
       
        rating.find({product : req.params.product}).populate("user").exec(function(err, review){
            if(err) return res.status(500).send(err);

            return res.json({
                success: true,
                message:  "Ratings",
                reviews : review
            });
        });
    }

    getRatingByUser(req, res){
        rating.findOne({product : req.params.product, user : req.userdata._id}).populate("user").exec(function(err, review){
            if(err) return res.status(500).send(err);

            return res.json({
                success: true,
                message:  "Ratings",
                userReview : review
            });
        })
    }



    getRatingsByLimit(req, res){
       
        rating.find({product : req.params.product}).limit(2).populate("user").exec(function(err, review){
            if(err) return res.status(500).send(err);

            return res.json({
                success: true,
                message:  "Ratings",
                reviews : review
            });
        });
    }

    ratingsCount(req, res){

        rating.aggregate([
            {
                $match : {product : {$in:[mongoose.Types.ObjectId(req.params.product)]}}
            },
            {
                $group : {
                    _id : '$ratings',
                    count: { $sum: 1 },
                 
                }
            },
            { $sort : { "_id": -1 } },
            {
                $project:{
                  rating:"$_id",
                  count : "$count",
                 _id:false
                } 
            }
        ], function(err, data){
            if(err) return res.status(500).send(err);

            return res.status(200).json({
                success : true,
                message : "Ratings Breakdown",
                ratingsBreakdown : data
            })
        })
    }

}


module.exports = RatingsController;