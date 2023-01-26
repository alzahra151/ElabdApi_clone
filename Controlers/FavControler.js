
const Fav = require('../Models/Fav')
const Product = require('../Models/product')
const User = require('../Models/user')
async function addFav(UserID, RequestData) {

     const oldfav =await Fav.find({"ProductID":RequestData.ProductID})
     if(oldfav){
        const newFav = new Fav({
            UserId: UserID,
            ProductID: RequestData.ProductID,
        })
        const storedProduct = await Product.findById(RequestData.ProductID)
        await Product.findByIdAndUpdate(RequestData.ProductID,{$set:{"NumberOfFav":storedProduct.NumberOfFav+1}})
        return newFav.save()
     }
     else{
        return null
     }

  
}


async function removeFromFav(Favtid , UserID) {
    let favprd = await Fav.findById(Favtid)
    console.log();
    console.log();
    if (favprd == null) {
        return "Incorrect Fav Id"

    } 


    else if (favprd.UserId.toString() !== UserID){
        return "UnOuthorized Access"

    }
    else {
        await Fav.findByIdAndDelete(Favtid)
        return "Product Deleted Successfuly"
    }
}

async function GetAllFav(UserID) {
    const user = await User.findById(UserID)

    if (user) {
        return await Fav.find({ UserId: UserID }).populate('ProductID')
    }
    else {
        return null
    }

}
module.exports = { addFav, removeFromFav , GetAllFav}