const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    name : {
        type : String,
        required : [true, "Name is required"]
    },
    email : {
        type : String,
        required : [true , "email is required"]
    },
    password : {
        type : String,
        required : [true, "password is required"]
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

const Admin = mongoose.Schema('admin', AdminSchema);
module.exports  = Admin;