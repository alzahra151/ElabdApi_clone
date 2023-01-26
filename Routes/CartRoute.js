const express = require('express')
const router = express.Router()
const { addToCart, removeFromCart, GetAllCArts } = require('../Controlers/cartControlers')
const { VerfiyUser, VerfiyAuthorization } = require('../Controlers/Auth')
const Product = require('../Models/product')
const User = require('../Models/user')


// Make Order for only registered Users
router.post("/", VerfiyUser, async function (request, response, next) {
    try {
        const product = await Product.findById(request.body.ProductID)
        const user = await User.findById(request.User.id)
        if (product && user) {
            const newCart = await addToCart(request.User.id, request.body)
            if (newCart) {
                response.status(202).json(newCart)

            }
            else {
                response.status(401).json("This Product Already In Your Cart")

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
        const DeletMessag = await removeFromCart(request.params.id, request.User.id)
        response.status(200).json(DeletMessag)

    } catch (err) {
        response.status(401).json(err.message)
    }
})

router.get("/", VerfiyUser, async function (request, response, next) {
    try {
        const Results = await GetAllCArts(request.User.id)
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