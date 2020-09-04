const mongoose = require('mongoose');

const StudentList = mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    }
})