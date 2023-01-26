const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const { Register, DiActivate,Login,LoginAdmin, UpdateUserData, DeletUser, GetUserByID, GetAllUser, GetUsersStats, UpdateUserPassword,GetUserInfo ,GetNumberOfLogin , logOut} = require('../Controlers/userControlers')
const { VerfiyAuthorization, VerfiyAdmin } = require('../Controlers/Auth')
const User = require('../Models/user')


router.post("/Register", async function (request, response, next) {
    try {
        const SavedUser = await Register(request.body)
        const { Password, IsAdmin, ...others } = SavedUser._doc
        response.status(202).json(others)
    }
    catch (error) {
        response.status(401).json(error.message)
    }
})

router.post("/Login", async function (request, response, next) {
    const { status, result } = await Login(request.body)

    response.status(status).json(result)
})
router.post("/Admin/Login", async function (request, response, next) {
    const { status, result } = await LoginAdmin(request.body)
    response.status(status).json(result)
})
router.get("/Logout/:id", VerfiyAuthorization,async function (request, response, next) {
    
    const updatestat = await logOut(request.params.id)
    if(updatestat){
        response.status(200).json("Know You Are Offline")
    }
    else{
        response.status(401).json("incorrect infromation")

    }
    
})

router.put("/:id", VerfiyAuthorization, async function (request, response, next) {
    try {
        if (request.body.Password) {
            response.status(401).json("Can't Update Password")
        }
        else {
            const UpdatedUser = await UpdateUserData(request.params.id, request.body)
            if (UpdatedUser == null) {
                response.status(401).json("InCorrrect ID")
            }
            else {
                const { password, ...others } = UpdatedUser._doc
                response.status(202).json(others)
            }
        }

    }
    catch (error) {
        response.status(401).json(error.message)
    }
})

router.put("/PasswordUpdate/:id", VerfiyAuthorization, async function (request, response, next) {
    try {
        if (request.body.Password) {
            const userData = await User.findById(request.params.id)
            const VerifyPassword = bcrypt.compareSync(request.body.oldPassword, userData.Password)
            if (VerifyPassword) {
                const UpdatedUser = await UpdateUserPassword(request.params.id, request.body)
                if (UpdatedUser == null) {
                    response.status(401).json("InCorrrect ID")
                }
                else {
                    const { password, ...others } = UpdatedUser._doc
                    response.status(202).json(others)
                }
            }
            else {
                response.status(401).json("Old Password Is InCorrect")
    
            }
        }
        else{
            response.status(401).json("Can't update data")
        }
    }
    catch (error) {
        response.status(401).json(error.message)
    }
})

router.delete("/:id", VerfiyAuthorization, async function (request, response, next) {
    try {
        console.log(request.params.id);
        const message = await DeletUser(request.params.id)

        response.status(201).json(message)

    }
    catch (error) {
        response.status(401).json(error.message)
    }

})

router.get("/Stats/Results/Login/:id", VerfiyAuthorization, async function (request, response, next) {
    try {
        const UserData = await GetNumberOfLogin(request.params.id)
        if (UserData == null) {
            response.status(401).json("InCorrrect ID")
        }
        else {
            response.status(201).json(UserData)
        }

    }
    catch (error) {
        response.status(401).json(error.message)
    }

})
router.get("/UserInfo", VerfiyAdmin, async function (request, response, next) {

    try {
        const data = await GetUserInfo()
        console.log(data);
        response.status(200).json(data)
    }
    catch (error) {
        response.status(401).json(error.message)
    }
})

router.get("/", VerfiyAdmin, async function (request, response, next) {

    try {
        const NewOption = request.query.new
        const Skip = request.query.Skip || 0
        const limit = request.query.limit || 5
        var UsersData = await GetAllUser(NewOption, Skip, limit);
        response.status(200).json(UsersData)
    }
    catch (error) {
        response.status(401).json(error.message)
    }

})

router.get("/Stats/Results", VerfiyAdmin, async function (request, response, next) {

    try {
        const data = await GetUsersStats()
        response.status(200).json(data)
    }
    catch (error) {
        response.status(401).json(error.message)
    }
})
router.get("/:id", VerfiyAuthorization, async function (request, response, next) {
    try {
        const UserData = await GetUserByID(request.params.id)
        if (UserData == null) {
            response.status(401).json("InCorrrect ID")
        }
        else {
            const { password, ...others } = UserData._doc
            response.status(200).json(others)
        }

    }
    catch (error) {
        response.status(401).json(error.message)
    }

})

router.put("/Active/:id", VerfiyAdmin, async function (request, response, next) {
    try {
        const message = await DiActivate(request.params.id)
        response.status(200).json(message)

    }
    catch (error) {
        response.status(401).json(error.message)
    }

})


module.exports = router
