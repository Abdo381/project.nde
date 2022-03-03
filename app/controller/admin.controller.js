const userModel =require("../../database/models/user.model")
class admin{
    static register= async(req,res)=>{
        try{
            const admin = new userModel(req.body)
            await admin.save()
            res.send({
                apiStatus:true, data: admin, message:"data added successfuly"
            })
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error adding admin"})
        }
    }
    static login = async(req,res)=>{
        try {
            const admin = await adminModel.login(req.body.email,req.body.password)
            const token = await admin.generateToken()
            res.send({
                apiStatus:true,
                data:{admin,token},
                message:"logged in"
            })

        } catch (e) {
            res.send({apiStatus:false,data:e.message , message:"invalid login"})

        }
    }
    static logout= async(req,res)=>{
        try {
            req.admin.token = req.admin.token.filter (t => t.token !=req.token)
            await req.admin.save()
            res.send({apiStatus:true ,data:{}, message:"logged out"})
        } catch (e) {
            res.send({apiStatus:false, data:e.message, message:"error in logout"})

        }
    }
}
module.exports =admin
