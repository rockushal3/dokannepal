const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const ProductSchema = new Schema({

    product_name : {
        type : String,
        required : [true, "Product name is required"]
    },
    category_id: {
        type : Schema.Types.ObjectId,
        ref : 'category',
        required : [true, "Category is required"]
    },
    price : {
        type : String,
        required : [true, "Product price is required"]
    },
    detail : {
        type : String,
        
    },
    image : {
        type : [String]
    },
    brand  : {
        type : String
    },
    
    discount : {
        type : Schema.Types.ObjectId,
        ref : 'discount'
    }
    
}, { timestamps: true });

const Product = mongoose.model("product", ProductSchema);
module.exports = Product;