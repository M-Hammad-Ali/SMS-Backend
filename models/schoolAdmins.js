const mongoose = require('mongoose')

const schoolAdmin = mongoose.Schema({
    user_name: {
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

const SchoolAdmins = module.exports = mongoose.model('SchoolAdmin',schoolAdmin)