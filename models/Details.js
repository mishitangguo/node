var mongoose = require("mongoose");


var DetailsSchema = mongoose.Schema({
    // 关联字段-分类id
    category:{
        type:mongoose.Schema.Types.ObjectId,//类型
        ref:"Category" //引用
    },
    // 关联字段-用户id
    user:{
        type:mongoose.Schema.Types.ObjectId,//类型
        ref:"User"//引用
    },
    // 添加时间
    addTime:{
        type:Date,
        default:new Date()
    },
    // 阅读量
    views:{
        type:Number,
        default:0
    },
    // 简介
    description:{
        type:String,
        default:""
    },
    // 内容
    content:{
        type:String,
        default:""
    },
    // 评论
    comments:{
        type:Array,
        default:[]
    },
    // 标题
    title:{
        type:String,
        default:""
    }
})


DetailsSchema.statics.getDetailsData = function(callback){

    this.find({}).populate({
        path: 'category', //指定数据库
        // match: { age: { $gte: 21 }}, //条件
        select: 'name -_id', //读取指定数据
        // options: { limit: 5 } //配置
    }).exec(function(err,result){
        callback(err,result)
    })

}

DetailsSchema.statics.updateIdData = function(fields,callback){
    this.update({_id:fields.id},{
        category:fields.category,
        title:fields.title,
        description:fields.description,
        content:fields.content
    }).then(callback)
}





// DetailsSchema.statics.editCategoryId = function(){
//     return this.find({}).populate({
//         path:"category",
//         select:"name -_id"
//     }).exec(function(err,categorydata){
//         console.log(categorydata);
//     })
// }

module.exports = mongoose.model("Details",DetailsSchema);