const express = require('express')
const router = express.Router()
const { addFav, removeFromFav, GetAllFav } = require('../Controlers/FavControler')
const { VerfiyUser } = require('../Controlers/Auth')
const Product = require('../Models/product')
const User = require('../Models/user')


router.post("/", VerfiyUser, async function (request, response, next) {
    try {
        const product = await Product.findById(request.body.ProductID)
        const user = await User.findById(request.User.id)
        if (product && user) {

            const newFav = await addFav(request.User.id, request.body)
            if(newFav){
                response.status(202).json(newFav)
            }
            else{
                response.status(401).json("This Product Already In Your Favouirate")
            }
        }
        else {
            response.status(401).json("Product id Or User Id Incorrect")
        }

    }
    catch (error) {
        response.status(401).json(error.message)
    }
})

router.delete("/:id", VerfiyUser, async function (request, response, next) {

    try {
        const DeletMessag = await removeFromFav(request.params.id , request.User.id)
        response.status(200).json(DeletMessag)

    } catch (err) {
        response.status(401).json(err.message)
    }
})

router.get("/", VerfiyUser, async function (request, response, next) {
    try {
        const Results = await GetAllFav(request.User.id)
        if (Results) {
            response.status(200).json(Results)

        }
        else {
            response.status(401).json("Incorrect id")

        }

    }
    catch (error) {
        response.status(401).json(err.message)
    }
})

module.exports = router