const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const RatingSchema = new Schema({
    user : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    product : {
        type : Schema.Types.ObjectId,
        ref : 'product'
    },
    ratings : {
        type : Number,
    },
    review : {
        type : String,
    },
  
  
}, { timestamps: true });

const Rating  = mongoose.model("rating", RatingSchema);

module.exports = Rating;
