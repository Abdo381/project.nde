const mongoose = require("mongoose")
const JWT =require("jsonwebtoken")
const validator =require("validator")
const bcrypt =require("bcryptjs")
const userSchema = mongoose.Schema({
name:{
    type:String,
    trim:true,
    require:true
},
emil:{
    type:String,
    trim:true,
    require:true,
    unique:true,
    validate(vali){
        if(!validator.isEmail(vali))throw new Error ("Invalid account")
    }
},
password:{
type:String,
require:true,
match:'/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/',
},
birthDate:{
    type:String,
    require:true
},
image:{
    type:String,

},
otp:{
    type:String,

},
token:{
    type:String,
    trim:true
}




},
{timestamps:true})
userSchema.methods.toJAON =function(){
    const user= this.toObject()
    const deletes =['password','__v', "token"]
    return user
}
userSchema.pre("save",async function(){
    if(this.isModified ("password"))
    this.password = await bcrypt.hash(this.password,parseInt(process.env.salt))
})
userSchema.statics.login=async(emil, password)=>{
    const userData = await user.findOne({emil})
    if(!userData) throw new Error('Please verify the account')
    const isValid =await bcrypt.compare(password, userData.password)
    if(!isValid) throw new Error('Please verify the password')
    return userData
}
userSchema.methods.generateToken = async function(){
const user =this
const token =JWT.sign({_id:user._id},process.env.JWYKEY)
user.token=user.token.concat({token})
await user.save()
return token
}
const user =mongoose.model("user",userSchema)

module.exports =user