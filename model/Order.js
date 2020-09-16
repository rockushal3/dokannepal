const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShippingAddress = new Schema({
    fullname : {
        type : String,
    },
    phonenumber  : {
        type : Number
    },
    address : {
        type : String,
    },
    city : {
        type :String,
    },
    zone : {
        type :String
    },

})
const OrderSchema = new Schema({
    userid : {
        type : Schema.Types.ObjectId,
        ref : 'user'
    },
    productid : {
        type : Schema.Types.ObjectId,
        ref : 'product'
    },
    quantity : {
        type : Number 
    },
    total : {
        type : Number
    },
    shippingAddress : ShippingAddress,
  
    paymentOption : {
        type : String,
    },
    isPaid : {
        type : Boolean
    },
    isDelivered : {
        type : Boolean
    }
}, { timestamps: true });


const Order = mongoose.model("order", OrderSchema);

module.exports = Order;