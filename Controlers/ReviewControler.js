
const Review = require('../Models/Review')
const Product = require('../Models/product')
const User = require('../Models/user')
async function addReview(UserID, RequestData) {

    const newReview = new Review({
        UserID: UserID,
        ProductID: RequestData.ProductID,
        Text: RequestData.Text,
        Stars: RequestData.Stars,
    })

    return newReview.save()
  
}

async function GetAllReview() {  
    return await Review.find()
}

async function GetReviewByID(ReviewID) {
    const rev = await Review.findById(ReviewID)

    if (rev) {
        return rev
    }
    else {
        return null
    }

}

async function DeleteReviewByID(ReviewID) {
    const rev = await Review.findById(ReviewID)

    if (rev) {
        return await Review.findByIdAndDelete(ReviewID)
    }
    else {
        return null
    }

}


async function CollectReview(ProductID) {
    const prdlist = await Review.find({"ProductID":ProductID})
let counter=0
let items = prdlist.length
for (const item of prdlist) {
    counter=counter+item.Stars
}
const res = counter/items
return {...prdlist,res

}
}

module.exports = { GetReviewByID, GetAllReview , addReview , DeleteReviewByID , CollectReview}