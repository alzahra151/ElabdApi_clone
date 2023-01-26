
const Categorie = require('../Models/Categorie')

async function CreateCategorie(Data) {
            const NewCategorie = new Categorie({
                CatArName: Data.CatArName,
                CatEnName: Data.CatEnName,
                SubCategorieID:Data.SubCategorieID,
                CatArSize:Data.CatArSize,
                CatEnSize:Data.CatEnSize
            })

            return await NewCategorie.save()
}

async function UpdateCategorie(catId,data) {
    const cat= await Categorie.findById(catId)
    if(cat){
            return await Categorie.findByIdAndUpdate(catId, { $set: data, }, { new: true, runValidators: true }).populate( 'SubCategorieID.SubCat' )}
        else{
            return "Categorie ID Incorrect"
        }}

async function GetAllCategories(ArName,EnName) {
    if (ArName) {
        return await Categorie.find({CatArName:ArName}).populate( 'SubCategorieID.SubCat' )
    }
    else if(EnName){
        return await Categorie.find({CatArName:EnName}).populate( 'SubCategorieID.SubCat' )
    }
    else {
        return await Categorie.find().populate( 'SubCategorieID.SubCat' )
    }
}

async function GetCategorieByID(catId) {
    return await Categorie.findById(catId).populate( 'SubCategorieID.SubCat' )
}

async function DeletCategorie(catId) {
    const categorie = await Categorie.findOne({ _id: catId})
    if (categorie == null) {

        return " InCorrect Categorie ID "
    }
    else {
        
        await Categorie.findOneAndDelete({ _id: catId})

        return "Categorie Has Been Deleted"
    }
}


module.exports = { CreateCategorie, UpdateCategorie, GetAllCategories, GetCategorieByID, DeletCategorie}