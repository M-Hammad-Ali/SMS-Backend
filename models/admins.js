//Require the mongoose 
const mongoose = require('mongoose');

//Define the schema
const AdminsList = mongoose.Schema({
    user_name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

//Export the Schema
const Admin = module.exports = mongoose.model('Admin',AdminsList)