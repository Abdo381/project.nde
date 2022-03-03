const mongoose = require("mongoose")
const JWT =require("jsonwebtoken")
const validator =require("validator")
const bcrypt =require("bcryptjs")
const adminSchema =mongoose.Schema({
    name:{
        type:String,
        trim:true,
        require:true,
        unique:true


    },
    email:{
        type:String,
        trim:true,
        require:true,
        unique:true,
        validate(vali){
            if(validator.isEmail(vali))throw new Error ("Invalid account")
        }
    },
    password:{
        type:String,
        match:'/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/',
    },
    image:{
        type:String,

    },
    otp:{
        type:String,
        trim:true
    },
    token:{
        type:String,
        trim:true
    }
},
{timestamp:true})
adminSchema.methods.toJSON= function(){
    const admin = this.toJSON()
    const deletes =['password','__v','token']
    return admin
}
adminSchema.pre("save",async function(){
    if(this.isModified ("password"))
    this.password = await bcrypt.hash(this.password,parseInt(process.env.salt))
})
adminSchema.statics.login=async (email , password)=>{
    const adminData = await admin.findOne({email})
    if(!adminData) throw new Error ('Please verify the account')
    const isValid = await bcrypt.compare(password, adminData.password)
    if(!isValid)throw new Error('Please verify the password')
    return adminData
}
adminSchema.methods.generateToken = async function(){
    const admin =this
    const token =JWT.sign({_id:admin._id},process.env.JWTKEY)
    admin.token=admin.token.concat({token})
    await admin.save()
    return token
    }
const admin = mongoose.model("admin", adminSchema)
 module.exports =admin