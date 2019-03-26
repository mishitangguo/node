var mongoose = require("mongoose");

var NusicSchema = mongoose.Schema({
    //歌名
    title:{
        type:String,
        default:""
    },
    //歌手
    singer:{
        type:String,
        default:""
    },
    //文件
    music:{
        type:String,
        default:""
    },
    description:{
        type:String,
        default:""
    },
    pic:{
        type:String,
        default:""
    }

})

NusicSchema.statics.getNusicData = function(json,callback){
    this.model("Music").find(json,callback);
}

module.exports = mongoose.model("Music",NusicSchema);