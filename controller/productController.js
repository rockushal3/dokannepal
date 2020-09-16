const product = require("../model/Product");
const rating = require('../model/Rating');
 const mongoose = require('mongoose');
const discount = require('../model/Discount');
const fs = require('fs');
const obj = mongoose.Types.ObjectId;

var getProductPromise = (productdata) => {

    var promise = productdata.map((value) => {
    
         return new Promise(function(resolve, reject) {
             
        product.aggregate([      {
            $match : {_id : {$in:[mongoose.Types.ObjectId(value._id)]}}
        },   {
        $lookup : {
            from : "discounts",
            localField : "discount",
            foreignField : "_id",
            as : "discount",
            
        },
    },
        ], function(err, data){
            if(err) return res.status(500).send(err);
        
            resolve({
                product: data[0],
                avgratings : value.avgRatings
            })
        }) 
         });
     })
     return  Promise.all(promise)
}

var checkIfDirectoryExists = (dirname, successcallback, errorcallback) => {
    try{
        var stats = fs.lstatSync(dirPath);
       
        if (stats.isDirectory()) {
            successCallback();
        }
    }catch(e){
        errorcallback();
    }
}

 var mkdirectory = (dirPath) => {

    return new Promise(function(resolve, reject) {
        checkIfDirectoryExists(dirPath, function() {
            resolve();
        }, function() {
            fs.mkdirSync(dirPath);
            resolve();
        });
    });

}

class ProductController{


    addProducts(req, res){
 
        console.log(req.body)
            product.create({
                product_name : req.body.name,
                category_id : req.body.category,
                price : req.body.price,
                detail: req.body.detail,
                image : [],
                brand : req.body.brand
            }, function(err, response){
                if(err) return res.status(500).send(err);
                req.files.map(function(item, index){    
                    var imagename = item.filename;
                    var imagearray = [];
        
                    imagearray.push(imagename)
                product.findByIdAndUpdate(response._id, { $push : { image : { "$each" : imagearray}}}, function(err, productRes){
                    if(err) return res.send({
                        success : false,
                        message : err.message
                    })

                    var path = "public/images/products/";
                    var dirname = path + "/" + response._id;
                    var tmpfilename = "tmp" + imagename;
                    var fileExists = fs.existsSync(dirname);

                    if(fileExists){
                            fs.rename('public/images/tmp/' + imagename, dirname + '/' + imagename, function(err){
                                if(err) return res.status(400).send(err.message)
                                if(index == (imagearray.length - 1)){
                                    return res.status(200).send({
                                        success: true,
                                        message: "Product Added",
                                    });
                                }
                            })
                    } else {
                        mkdirectory(dirname).then(function(){
                            fs.rename('public/images/tmp/' + imagename, dirname + '/' + imagename, function(err){
                                if(err) return res.status(400).send(err.message)
                                if(index == (imagearray.length - 1)){
                                    return res.status(200).send({
                                        success: true,
                                        message: "Product Added",
                                    });
                                }
                            })
                        })
                    }

                })
                
               
            })
        })
        
        
    } 

    getExclusiveProducts(req, res){

        product.aggregate([      {
            $match : {discount : {"$exists": true, 
            "$ne": null 
            } }
        },   {
        $lookup : {
            from : "discounts",
            localField : "discount",
            foreignField : "_id",
            as : "discount",
            
        },
    },
        ], function(err, products){
            if(err) return res.status(500).send(err);
        
               
        
            return res.json({
                success : true,
                message: "Products",
                products : products
            });
        }).limit(15);
        
    }

    getProducts(req, res){
     
        product.find(function(err, products){
            if(err) return res.status(500).send(err);
        
            return res.json({
                success : true,
                message: "Products",
                products : products
            });
        })
    
    }

    getproductDetail(req,res){
        product.find().populate('category_id').populate('discount').then(function (findAllpost) {
            res.send(findAllpost).catch(function (e) {
                res.send(e)
            })
        })
    }

    getLatestProducts(req, res){
            product.aggregate([  {
                $lookup : {
                    from : "ratings",
                    localField : "_id",
                    foreignField : "product",
                    as : "ratings",
                    
                }
            },
            
            { 
                $unwind : { 
                    path : '$ratings', 
                    preserveNullAndEmptyArrays : true 
                } 
            },
            {
                $group : {
                    _id : '$_id',
                    
                    avgratings : {
                    
                            '$avg': { '$ifNull' : ['$ratings.ratings', 0]},
                       
                    }
                }
            } ,{
                $project : {
                    
                        avgRatings : '$avgratings'
                }
            }
        ], function(err, products){
                    if(err) return res.status(500).send(err);
                   
                    getProductPromise(products).then(function(data){
                        return res.json({
                            success : true,
                            message: "Latest Product",
                            products : data,
                         
                        });
                    })
                  product.populate(products , [{"path" : "_id"}] , function(err, results){
                    if(err) return res.status(500).send(err);
                    
                  
                  
                
                  

                  })
                }).sort('-createdAt')
    }

    

    getProductById(req, res){

        let id = req.params.id;
      
        product.aggregate([      {
            $match : {_id : {$in:[mongoose.Types.ObjectId(id)]}}} 
            ,   {
        $lookup : {
            from : "discounts",
            localField : "discount",
            foreignField : "_id",
            as : "discount",
            
        },
    },
        ], function(err, product){
            if(err) return res.status(500).send(err);
        
            rating.aggregate([
                {
                    $match : {product : {$in:[mongoose.Types.ObjectId(id)]}}} ,  
                    {
                    $group : {
                        _id : '$product',
                        
                        avgratings : {
                        
                                '$avg': { '$ifNull' : ['$ratings', 0]},
                           
                        }
                    }
                }
            ], function(err, value){
                if(err) return res.status(500).send(err);

                if(value[0] != undefined){
                    return res.json({
                        success : true,
                        message: "Product",
                         product : product[0],
                        avgratings : value[0].avgratings
                    });
                }else{
                    return res.json({
                        success : true,
                        message: "Product",
                         product : product[0],
                        avgratings : 0
                    });
                }
               
            })
        
        });
        
     
        

    }

    getProductsByBrand(req, res){
        let brand = req.params.brand;
        let id = req.params.id;
        product.find(( 
        {
            $and: [
               {_id : {"$ne": mongoose.Types.ObjectId(id) }},
                { $or: [{brand : { $regex: brand , $options : 'i' } },
              
                 
                ]},
               
            ]}
            ), function(err, products){
            if(err) return res.send({
                success : false,
                message : err.message
            })

            var productsarray = []

            products.forEach(element => {
                var productObj = {
                    _id : element._id,
                    product_name : element.product_name,
                    brand  : element.brand,
                    image :element.image
                }

                productsarray.push(productObj)
            });

            return res.send({
                success  : true,
                similarProducts : productsarray
            })
        }).limit(6);
    }

    getProductsBySearch(req, res){
        let search = req.params.search;

         if(obj.isValid(search)){
            product.aggregate([ {$match : { $or: [{category_id:   mongoose.Types.ObjectId(search) }  
                ]
        
                }}, {
                $lookup : {
                    from : "ratings", 
                    localField : "_id",
                    foreignField : "product",
                    as : "ratings",
                    
                }
            },
            
            { 
                $unwind : { 
                    path : '$ratings', 
                    preserveNullAndEmptyArrays : true 
                } 
            },
            {
                $group : {
                    _id : '$_id',
                    
                    avgratings : {
                    
                            '$avg': { '$ifNull' : ['$ratings.ratings', 0]},
                       
                    }
                }
            } ,{
                $project : {
                    
                        avgRatings : '$avgratings'
                }
            }
        ], function(err, products){
                    if(err) return res.status(500).send(err);
                   
                    getProductPromise(products).then(function(data){
                        return res.json({
                            success : true,
                            message: "Latest Product",
                            products : data,
                         
                        });
                    })
                  product.populate(products , [{"path" : "_id"}] , function(err, results){
                    if(err) return res.status(500).send(err);
                    
                  
                  
                
                  
    
                  })
                }).sort('-createdAt')
         }else{

        
        product.aggregate([ {$match : { $or: [{product_name: { $regex: '.*' + search + '.*' , $options : 'i' } } , 
        {brand : {$regex: '.*' + search + '.*' , $options : 'i' }}]
    
            }}, {
            $lookup : {
                from : "ratings", 
                localField : "_id",
                foreignField : "product",
                as : "ratings",
                
            }
        },
        
        { 
            $unwind : { 
                path : '$ratings', 
                preserveNullAndEmptyArrays : true 
            } 
        },
        {
            $group : {
                _id : '$_id',
                
                avgratings : {
                
                        '$avg': { '$ifNull' : ['$ratings.ratings', 0]},
                   
                }
            }
        } ,{
            $project : {
                
                    avgRatings : '$avgratings'
            }
        }
    ], function(err, products){
                if(err) return res.status(500).send(err);
               
                getProductPromise(products).then(function(data){
                    return res.json({
                        success : true,
                        message: "Latest Product",
                        products : data,
                     
                    });
                })
              product.populate(products , [{"path" : "_id"}] , function(err, results){
                if(err) return res.status(500).send(err);
                
              
              
            
              

              })
            }).sort('-createdAt')
        }

    }

    updateProducts(req, res){
        product.findByIdAndUpdate(req.params.id, req.body).then(function () {
            res.status(200).send().catch(function (e) {
                res.status(400).send()
                console.log(e)
            })
        
    })
    }

    deleteProducts(req, res){
        product.findByIdAndDelete(req.params.id).then(function () {
            res.send("post Deleted").catch(function (e) {
                res.send(e)
            })
        })
    }

}


module.exports = ProductController;