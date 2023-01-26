const express = require('express')
const router = express.Router()
const { CreateCategorie, UpdateCategorie, GetAllCategories, GetCategorieByID, DeletCategorie}= require('../Controlers/Categori')
const {VerfiyAdmin} = require('../Controlers/Auth')




router.post("/", VerfiyAdmin, async function (request, response, next) {
    try {
        const Categorie = await CreateCategorie(request.body)
        response.status(202).json(Categorie)
    }
    catch (error) {
        response.status(401).json(error.message)
    }
})


router.put("/:id", VerfiyAdmin, async function (request, response, next) {
    try {
        const Categorie = await UpdateCategorie(request.params.id,request.body)
        if(Categorie){
            response.status(200).json(Categorie)
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
        const Categorie = await GetCategorieByID(request.params.id)
        if(Categorie){


            response.status(200).json(Categorie)
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
        const Categorie = await GetAllCategories(ArName,EnName)
        
        if(Categorie){
            response.status(200).json(Categorie)
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
        const message = await DeletCategorie(request.params.id)
            response.status(200).json(message)
}
    catch (error) {
        response.status(401).json(error.message)
    }
})










module.exports=router