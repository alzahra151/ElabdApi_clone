const User = require('../Models/user')
const jwt = require('jsonwebtoken')

function VerfiyToken(request, response, next) {
    const Data = request.headers.token
    if (Data == null) {
        return response.status(401).json('Sorry You Have To Send Your Acess Token')
    }
    else {
        const token = Data.split(" ")[1]
       
        if (Data) {
            
            jwt.verify(token, process.env.SECRET_KEY, function (error, User) {
                if (error) {
                    return response.status(401).json('Sorry ! Token Is InValied Or Expired')
                }
                else {
                    request.User = User
                    next()
                }
            })

        } else {
            return response.status(401).json('Sorry ! You Are Not Authenticated')
        }
    }

}

function VerfiyAuthorization(request, response, next) {
    VerfiyToken(request, response, function () {
        if (request.User.id === request.params.id || request.User.IsAdmin) {
            next()
        }
        else {
            return response.status(401).json('Sorry ! You Are Not Authenticated')

        }
    })
}

function VerfiyAdmin(request, response, next) {
    VerfiyToken(request, response, function () {
        if (request.User.IsAdmin) {
            next()
        }
        else {
            return response.status(401).json('Sorry ! You Are Not Allowed To Do That')

        }
    })
}


function VerfiyUser(request, response, next) {
    VerfiyToken(request, response, async function () {
        const StoredUser = await User.findById(request.User.id)

        if (StoredUser) {
            if (StoredUser.IsAdmin === false) {
                next()
            }
            else {
                response.status(401).json('Sorry ! Admin Cannot Do That')
            }
        }
        else {
            return response.status(401).json('Sorry ! You Are Not Authenticated')

        }
    })
}


module.exports = { VerfiyToken, VerfiyAuthorization, VerfiyAdmin, VerfiyUser }