const { Double, Int32 } = require("mongodb")
const mongoose = require("mongoose")
const productSchema =mongoose.Schema({
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"category"
    },
    name:{
        type:String,
        trim:true,
        required:true
    },
    BuyAtAprice:{
        type:Double,
        trim:true,
        required:true
    },
    SellAtAprice:{
        type:Double,
        trim:true,
        required:true
    },
    Quantity:{
        type:Int32,
        trim:true,
        required:true
    }
})
const product = mongoose.model("product", productSchema)
module.exports =product