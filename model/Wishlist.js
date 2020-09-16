const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const WishlistSchema = new Schema({

    product_id : {
        type : Schema.Types.ObjectId,
        ref : "product"
    },

    user_id : {
        type : Schema.Types.ObjectId,
        ref : "user"
    }
});

const Wishlist = mongoose.model("wishlist", WishlistSchema);
module.exports = Wishlist;