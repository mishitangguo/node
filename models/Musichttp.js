var mongoose = require("mongoose");

var MusichttpSchema = mongoose.Schema({
    author:{
        type:String,
        default:""
    },
    link:{
        type:String,
        default:""
    },
    pic:{
        type:String,
        default:""
    },
    type:{
        type:String,
        default:""
    },
    title:{
        type:String,
        default:""
    },
    songid:{
        type:Number,
        default:""
    },
    url:{
        type:String,
        default:""
    },
    
})

MusichttpSchema.statics.getMusichttp = function(json,callback){
    this.model("Musichttp").find(json,callback)
}
module.exports = mongoose.model("Musichttp",MusichttpSchema)