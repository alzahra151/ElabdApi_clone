const mongoose = require("mongoose")
var Cartschema = mongoose.Schema({

    UserId: {type: mongoose.Schema.ObjectId,ref:"User",required: true},

    ProductID:{type: mongoose.Schema.ObjectId,ref:"Product" }},

      { timestamps: true })


var Cart = mongoose.model("Cart", Cartschema)
module.exports = Cart