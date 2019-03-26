var mongoose = require("mongoose");

//分类数据库
//添加数据的名称
var CategorySchema = mongoose.Schema({
    name:String,
})

//创建数据库名称
CategorySchema.statics.getCategoryData = function(json,callback){
    this.model("Category").find(json,callback);
}



//修改数据库数据
CategorySchema.statics.getCatagoryAmdDetails = function(id,callback){
    let categorylist = [];
    let then = this;
    //查询
    then.find({}).then(function(lists){

        categorylist = lists;
        //查询
        return then.model("Details").findOne({_id:id}).populate("category");

    }).then(function(detailsData){
        callback(categorylist,detailsData)
    })
}





module.exports = mongoose.model("Category",CategorySchema);