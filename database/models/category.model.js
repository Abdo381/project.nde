const mongoose = require("mongoose")
const categorySchema = mongoose.Schema({
    adminId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"admin"
    },
    name:{
        type:String,
        trim:true,
        required:true
    }
  
})
const category = mongoose.model("category", categorySchema)
module.exports =category