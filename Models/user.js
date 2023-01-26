const mongoose = require("mongoose")
var bcrypt = require('bcrypt')
var UserSchema = mongoose.Schema({

    FirstName: { type: String, required: true, minlength: 3 },
    LastName: { type: String, required: true, minlength: 3 },
    Email: { type: String, required: true, unique: true },
    MobileNumber: { type: String, required: true, unique: true , minlength : 11 , maxlength : 11},
    Password: { type: String, minlength: 6, required: true },
    Gender: { type: String,enum : ['male','female'],},
    IsAdmin: { type: Boolean, default: false },
    NumberOFLogin:{type:Number , default:0},
    IsActive: { type: Boolean},
    Active:{type:Boolean, default:true}
},

    { timestamps: true })
    
UserSchema.pre('save', async function (next) {
    try {
        var salt = await bcrypt.genSalt(10)
        var hashdata = bcrypt.hashSync(this.Password, salt)
        this.Password = hashdata
        next()
    } catch (error) {
        next(error)
    }
})




var User = mongoose.model("User", UserSchema)
module.exports = User