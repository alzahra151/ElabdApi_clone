const express = require('express')
const router = express.Router()
const { CreateOrder, UpdateOrder, GetAllOrders, GetOrderByID, DeletOrder ,GetOrderStats}= require('../Controlers/orderControlers')
const {VerfiyAuthorization,VerfiyAdmin , VerfiyUser} = require('../Controlers/Auth')






// Make Order for only registered Users
router.post("/", VerfiyUser, async function (request, response, next) {
    try {
        const order = await CreateOrder(request.User.id,request.body)
        if(order){
            response.status(202).json(order)

        }
        else{
            response.status(401).json('inCorrect Infromation')

        }
    }
    catch (error) {
        response.status(401).json(error.message)
    }
})
//  User : Can Update his Own Order
router.put("/:id", VerfiyUser, async function (request, response, next) {
    try {
        const order = await UpdateOrder(request.params.id,request.User.id,request.body)
        if(order){
            const {UserId,...others}=order._doc
            response.status(200).json(others)
        }
        else{
            response.status(401).json("InCorecct ID")
        }

    }
    catch (error) {
        response.status(401).json(error.message)
    }
})
// ; User : Can search for his Own Order
router.get("/:id", VerfiyUser, async function (request, response, next) {
    try {
        const order = await GetOrderByID(request.params.id)
        if(order){
            const {UserId,...others}=order._doc

            response.status(200).json(others)
        }
        else{
            response.status(401).json("InCorrect ID")

        }

}
    catch (error) {
        response.status(401).json(error.message)
    }
})
// admin only can get all order or new orders or someone orser
router.get("/", VerfiyAdmin ,async function (request, response, next) {
    try {
        const Qnew = request.query.new 
        const UserName = request.query.name
        const order = await GetAllOrders(Qnew,UserName)
        
        if(order){
            response.status(200).json(order)
        }
        else{
            response.status(401).json("Empty List")

        }

}
    catch (error) {
        response.status(401).json(error.message)
    }
})
//  User : Can delete his Own Order
router.delete("/:id", VerfiyUser, async function (request, response, next) {
    try {
        const message = await DeletOrder(request.params.id,request.User.id)
            response.status(200).json(message)
}
    catch (error) {
        response.status(401).json(error.message)
    }
})
// Only Admin Can See WebSite Data Analysis
router.get("/Stats/Results", VerfiyAdmin, async function (request, response, next) {

    try {
        const data = await GetOrderStats()
        response.status(200).json(data)
    }
    catch (error) {
        response.status(401).json(error.message)
    }
})








module.exports=router