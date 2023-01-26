const mongoose = require("mongoose")
var FAvschema = mongoose.Schema({

    UserId: {type: mongoose.Schema.ObjectId,ref:"User",required: true},

    ProductID:{type: mongoose.Schema.ObjectId,ref:"Product" }},

      { timestamps: true })


var Fav = mongoose.model("Fav", FAvschema)
module.exports = Fav