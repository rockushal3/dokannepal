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
    updateCategory(req, res){

    }

    deleteCategory(req, res){
        
    }


}


module.exports  = CategoryController;