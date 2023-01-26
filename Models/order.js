const mongoose = require("mongoose")
var OrderSchema = mongoose.Schema({

    UserId: {type: mongoose.Schema.ObjectId,ref:"User",required: true},
    Products: [{ProductID:{type: mongoose.Schema.ObjectId,ref:"Product" },Quantity:{type:Number,default:1}}],
    Address:{type:String,required:true},
    status:{type:String,enum : ['Waiting','Done',"Canceled"],default:"Waiting"}

}, 

{ timestamps: true })


var Order = mongoose.model("Order", OrderSchema)
module.exports = Order