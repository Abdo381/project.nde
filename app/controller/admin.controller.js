const adminModel = require("../../database/models/admin.model")
const otpGen = require("../helper/otp-gen")
class admin{
    static register= async(req,res)=>{
        try{
            const admin = new adminModel(req.body)
            await admin.save() 
            const otp= otpGen(8)
           
            res.send({
                apiStatus:true, data: {admin, otp}, message:"data added successfuly"
            })
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error adding admin"})
        }
    }
    static login = async(req,res)=>{
        try{
            const admin = await adminModel.login(req.body.email, req.body.password)
            const token = await admin.generateToken()
            res.send({
                apiStatus:true,
                data:{ admin, token }, 
                message:"logged in"
            })
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"invalid login"})
        }
    }
    static me = async(req,res)=>{
        res.send({apiStatus:true,data:req.admin, message:'data featched'})
    }
    static logout = async(req,res)=>{
        try{
            req.admin.tokens = req.admin.tokens.filter( t => t.token != req.token )
            await req.admin.save()
            res.send({apiStatus:true, data:{}, message:"logged out"})
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error in logout"})
        }
    }
    static logoutAll = async(req,res)=>{
        try{
            req.admin.tokens = []
            await req.admin.save()
            res.send({apiStatus:true, data:{}, message:"logged out"})
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error in logout"})
        }
    }
    static getSingle = async(req,res)=>{
        try{
            const admin = await adminModel.findById(req.params.id) //statics
            res.send({
                apiStatus:true, data: admin, message:"data featched successfuly"
            })
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error fetching admin"})
        }
    }
    static delSingle = async(req,res)=>{
        try{
            const admin = await adminModel.findByIdAndDelete(req.params.id)
            res.send({
                apiStatus:true, data: admin, message:"data deleted successfuly"
            })
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error deleting admin"})
        }
    }
    static profileImg = async (req, res) =>{
        try{
           
            req.admin.image = req.file.path
            await req.admin.save()
            res.send({apiStatus:true, data:req.admin, message:"image uploaded"})
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error deleting admin"})
        }
    }
}
module.exports = admin
