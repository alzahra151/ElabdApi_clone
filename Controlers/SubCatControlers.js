
const SubCategorie = require('../Models/SubCate')


async function CreateSubCategorie(Data) {
            const NewSubCategorie = new SubCategorie({
                ArsubCatName: Data.ArsubCatName,
                EnsubCatName: Data.EnsubCatName,
            })
            return await NewSubCategorie.save()
    
}


async function UpdateSubCategorie(subcatId,data) {
    const Subcat= await SubCategorie.findById(subcatId)
    if(Subcat){
            return await SubCategorie.findByIdAndUpdate(subcatId, { $set: data, }, { new: true, runValidators: true })
    }}

async function GetAllSubCategories(ArName,EnName) {


    if (ArName) {
        const SubCat = await SubCategorie.find({"ArsubCatName":ArName})
        return SubCat    }
    else if(EnName){
        const SubCat = await SubCategorie.find({"EnsubCatName":EnName})
        return SubCat
    }
    else {
        return await SubCategorie.find()
    }


}

async function GetSubCategorieByID(catId) {
    return await SubCategorie.findById(catId)
}

async function DeletSubCategorie(SubcatId) {
    const SubCat = await SubCategorie.findOne({ _id: SubcatId})
    if (SubCat == null) {

        return " InCorrect SubCategorie ID "
    }
    else {
        
        await SubCategorie.findOneAndDelete({ _id: SubcatId})

        return "SubCategorie Has Been Deleted"
    }
}


module.exports = { CreateSubCategorie, UpdateSubCategorie, GetAllSubCategories, GetSubCategorieByID, DeletSubCategorie}