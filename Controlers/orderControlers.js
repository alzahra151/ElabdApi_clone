
const Order = require('../Models/order')
const User = require('../Models/user')
const Product = require('../Models/product')

async function CreateOrder(UserID, OrderData) {

    const user = await User.findById(UserID)

    if (user) {
        for (const item of OrderData.Products) {
        
            const prd = await Product.findById(item.ProductID)
            if (prd == null) {
                return null
            }
        }
        const NewOrder = new Order({
            UserId: UserID,
            Products: OrderData.Products,
            Address: OrderData.Address,
            status :  OrderData.status
        })

        for (const item of OrderData.Products) {
            const storedProduct = await Product.findById(item.ProductID)
            await Product.findByIdAndUpdate(item.ProductID, { $set: { "Amount": storedProduct.Amount - item.Quantity, "NumberOfOrder": storedProduct.NumberOfOrder + 1 } })
        }

        return await NewOrder.save()
    }

}

async function UpdateOrder(OrderID, userID, data) {
    const order = await Order.findById(OrderID)
    if (order) {
        if (order.UserId.toString() === userID) {
            return await Order.findByIdAndUpdate(OrderID, { $set: data, }, { new: true, runValidators: true })
        }
    }
}

async function GetAllOrders(Qnew, name) {
    if (Qnew) {
        return await Order.find().sort({ createdAt: -1 }).limit(5)
    }
    else if (name) {
        const user = await User.findOne({ FirstName: name })
        if (user) {
            return await Order.find({ UserId: user.id })
        }
    }
    else {
        return await Order.find().populate('UserId').populate('Products.ProductID')
    }
}

async function GetOrderByID(OrderID) {
    return await Order.findById(OrderID)
}

async function DeletOrder(OrderID, UserID) {
    const order = await Order.findOne({ _id: OrderID })

    const order2 = await Order.findOne({ UserId: UserID })
    if (order == null) {

        return " InCorrect ProductID "
    }
    else if (order2 == null) {

        return " Product Not Yours So you Can't Delete"
    }
    else {

        await Order.findOneAndDelete({ _id: OrderID, UserId: UserID })

        return "User Has Been Deleted"
    }
}

async function GetOrderStats() {
    const date = new Date()
    const LastMonth = new Date(date.setMonth(date.getMonth() - 1))
    const PriviousMonth = new Date(date.setMonth(LastMonth.getMonth() - 1))

    return await Order.aggregate([
        {
            $match: { createdAt: { $gte: PriviousMonth } }
        },
        {
            $project: {
                month: { $month: "$createdAt" }
            }
        },
        {
            $group: { _id: "$month", total: { $sum: 1 } }
        }

    ])

}


module.exports = { CreateOrder, UpdateOrder, GetAllOrders, GetOrderByID, DeletOrder, GetOrderStats }