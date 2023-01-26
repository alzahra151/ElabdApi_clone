
const express = require('express')
const router = express.Router()
const { GetReviewByID, GetAllReview , addReview , DeleteReviewByID , CollectReview} = require('../Controlers/ReviewControler')
const { VerfiyAuthorization, VerfiyAdmin } = require('../Controlers/Auth')




router.post("/:id", VerfiyAuthorization, async function (request, response, next) {
    try {
        const rev = await addReview(request.User.id,request.body)
        response.status(200).json(rev)
    }
    catch (error) {
        response.status(401).json(error.message)
    }
})


router.get("/", VerfiyAdmin, async function (request, response, next) {
    try {
        const rev = await GetAllReview()
       
            response.status(200).json(rev)
        
    }
    catch (error) {
        response.status(401).json(error.message)
    }
})

router.get("/:id", VerfiyAuthorization, async function (request, response, next) {
    try {
        const rev = await GetReviewByID(request.params.id)
        if(rev){
            response.status(200).json(rev)

        }
        else{
            response.status(401).json("Incorrect ID")

        }
       
        
    }
    catch (error) {
        response.status(401).json(error.message)
    }
})

router.delete("/:id", VerfiyAdmin, async function (request, response, next) {
    try {
        const rev = await DeleteReviewByID(request.params.id)
        if(rev){
            response.status(200).json("Deleted Successfully")

        }
        else{
            response.status(401).json("Incorrect ID")

        }
       
        
    }
    catch (error) {
        response.status(401).json(error.message)
    }
})

router.get("/Stars/:id", async function (request, response, next) {
    try {
        const rev = await CollectReview(request.params.id)
       
            response.status(200).json(rev)
        
    }
    catch (error) {
        response.status(401).json(error.message)
    }
})


module.exports = router
