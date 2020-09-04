const mongoose = require('mongoose');

const Classes = mongoose.Schema({
    classes :{
        type:Array,
    },
    no_of_student:{
        type:Number
    },
    school_id:{
        type:Number,
        required:true
    }
})

const Class = module.exports = mongoose.model('Class',Classes)