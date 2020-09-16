const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const DiscountSchema = new Schema({


    discount_name : {
        type : String,
        require : [true, "Discount Name is required"]
    },

    discount_value : {
        type : Number,
    }

});

const Discount  = mongoose.model("discount", DiscountSchema);

module.exports = Discount;
