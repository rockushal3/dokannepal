const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema({

    category_name : {
        type : String,
        required : [true, "Category Name is required!"]
    },
    image : {
        type : String
    }
});

const Category = mongoose.model("category", CategorySchema);
module.exports = Category;