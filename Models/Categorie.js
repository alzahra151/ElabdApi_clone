const mongoose = require("mongoose")
var Categschema = mongoose.Schema({

    CatArName: {type: String,required: true},

    CatEnName:{type: String,required: true},

    CatArSize: {type: [String],required: true},

    CatEnSize:{type: [String],required: true},   

    SubCategorieID :[{SubCat:{type: mongoose.Schema.ObjectId,ref:"SubCategorie",required: true}}]
},

      { timestamps: true })


var Categorie = mongoose.model("Categorie", Categschema)
module.exports = Categorie