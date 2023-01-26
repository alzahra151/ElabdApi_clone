const mongoose = require("mongoose")
var SubCategorieschema = mongoose.Schema({

    ArsubCatName: {type: String,required: true},

    EnsubCatName:{type: String,required: true},

},

      { timestamps: true })


var SubCategorie = mongoose.model("SubCategorie", SubCategorieschema)
module.exports = SubCategorie