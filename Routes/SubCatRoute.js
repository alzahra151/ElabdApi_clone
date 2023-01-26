const express = require('express')
const router = express.Router()
const { CreateSubCategorie, UpdateSubCategorie, GetAllSubCategories, GetSubCategorieByID, DeletSubCategorie}= require('../Controlers/SubCatControlers')
const {VerfiyAdmin} = require('../Controlers/Auth')




router.post("/", VerfiyAdmin, async function (request, response, next) {
    try {
        const SubCategorie = await CreateSubCategorie(request.body)
        response.status(200).json(SubCategorie)
    }
    catch (error) {
        response.status(401).json(error.message)
    }
})


router.put("/:id", VerfiyAdmin, async function (request, response, next) {
    try {
        const SubCategorie = await UpdateSubCategorie(request.params.id,request.body)
        if(SubCategorie){
            response.status(200).json(SubCategorie)
        }
        else{
            response.status(401).json("InCorecct ID")
        }

    }
    catch (error) {
        response.status(401).json(error.message)
    }
})


router.get("/:id", async function (request, response, next) {
    try {
        const SubCategorie = await GetSubCategorieByID(request.params.id)
        if(SubCategorie){


            response.status(200).json(SubCategorie)
        }
        else{
            response.status(401).json("InCorrect ID")

        }

}
    catch (error) {
        response.status(401).json(error.message)
    }
})


router.get("/" ,async function (request, response, next) {
    try {
        const ArName = request.query.ArName 
        const EnName = request.query.EnName
        const SubCategorie = await GetAllSubCategories(ArName,EnName)
        
        if(SubCategorie){
            response.status(200).json(SubCategorie)
        }
        else{
            response.status(401).json("Empty List")

        }

}
    catch (error) {
        response.status(401).json(error.message)
    }
})


router.delete("/:id", VerfiyAdmin, async function (request, response, next) {
    try {
        const message = await DeletSubCategorie(request.params.id)
            response.status(200).json(message)
}
    catch (error) {
        response.status(401).json(error.message)
    }
})










module.exports=router