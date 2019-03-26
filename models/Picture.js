var mongoose =require("mongoose");

var PictureSchema = mongoose.Schema({
    title:{
        type:String,
        default:""
    },
    url:{
        type:String,
        default:[]
    }
})

PictureSchema.statics.getpictureData = function(json,callback){
    this.model("Picture").find(json,callback);
}


module.exports = mongoose.model("Picture",PictureSchema)