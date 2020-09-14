const mongoose = require('mongoose');
 
const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        minlength:6
    },
    password:{
        type:String,
        required: true
    },
      firstName:{
        type:String,
        required: true
    }, 
    lastName:{
        type:String,
        required: true
    },
    phone:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
},{timestamps:true});
module.exports = mongoose.model('User',userSchema);