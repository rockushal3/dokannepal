const mongoose = require('mongoose');
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
const UserSchema = new Schema({
    firstname : {
        type : String,
        required : [true, "Firstname is required"]
    },
    lastname : {
        type: String,
        required : [true, "lastname is required"]
    },
    location : {
        type : String,
      
    },
    phone : {
        type : String,
    },
    type : {
        type : String,
    },
    email : {
        type : String,
        required : [true, "email is required"]
    },
    password : {
        type : String,
        required : [true, "password is required"]
    },
    shippingAddress: [ShippingAddress],

    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
}, { timestamps: true });


const User = mongoose.model('user', UserSchema);

module.exports = User;