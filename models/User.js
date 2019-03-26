var mongoose = require("mongoose");

var userSchema = mongoose.Schema({
    username:String,
    password:String,
    isAdmin:{
        type:Boolean,
        default:true
    }
})



module.exports = mongoose.model("User",userSchema);