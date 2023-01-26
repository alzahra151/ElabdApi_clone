const mongoose = require("mongoose")
var Reviewschema = mongoose.Schema({

    Text: {type: String,required: true},

    Stars:{type: Number,default :0 , enum:[0,1,2,3,4,5]},

    ProductID:{type: mongoose.Schema.ObjectId,ref:"Product",required: true},

    UserID:{type: mongoose.Schema.ObjectId,ref:"User",required: true}


},

      { timestamps: true })


var Review = mongoose.model("Review", Reviewschema)
module.exports = Review