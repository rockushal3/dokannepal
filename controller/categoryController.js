const category = require("../model/Category");

const fs = require('fs');

class CategoryController{


    addCategory(req, res){
        req.files.map(function(item, index){    
            var imagename = item.filename;
            var path = "public/images/categories/";
            category.create({
                category_name : req.body.category,
                image : imagename
            }, function(err, response){
                if(err) return res.status(500).send(err);
                fs.rename('public/images/tmp/' + imagename, path + imagename, function(err){
                    if(err) return res.status(400).send(err.message)
                  
                        return res.status(200).send({
                            success: true,
                            message: "Category Added",
                        });
               
                })
                
            })
        });
     
    }

    getCategory(req, res){
            category.find(function(err, categories){
                if(err) res.status(500).send(err);

                return res.json({
                    success: true,
                    message: "OK",
                    categories : categories
                })
            })
    }
    getCategoryWithLimit(req, res){
        
      var limit = parseInt(req.params.limit);
   
        category.find(function(err, categories){
            if(err) res.status(500).send(err);

            return res.json({
                success: true,
                message: "OK",
                categories : categories
            })
        }).limit(limit)
}

    getcategorybyid(req,res){
        category.findById(req.params.id)
        .then(function (postById) {
            res.send(postById)
        }).catch(function (e) {
            res.send(e)
        })
    }
    updateCategory(req, res){
        
        req.files.map(function (items) {
            const User = {
                category_name : req.body.category,
                image: items.filename
            }
            category.findByIdAndUpdate(req.params.id, User).then(function () {
                res.status(200).send().catch(function (e) {
                    res.status(400).send()
                    console.log(e)
                })
            })
        })
    }

    deleteCategory(req, res){
        category.findByIdAndDelete(req.params.id).then(function () {
            res.send("post Deleted").catch(function (e) {
                res.send(e)
            })
        })
    }
}


module.exports  = CategoryController;