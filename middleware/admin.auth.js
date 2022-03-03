const JWT =require("jsonwebtoken")
const adminModel =require("../database/models/admin.model")
 const adminAuth = async (req,res,next)=>{
try {
const token = req.header("Authorization").replace('bearer',"")
const d_token = JWT.verify(token ,process.env.JWTKEY)
const admin =await adminModel.findOne({_id:d_token._id, 'token':token})
  if(!admin)  throw new Error('data error')
  req.admin =admin
  req.token =token
    next()
} catch (e) {
    res.send({apiStatus:false, data:e.message , message:"not authorized"  })
}

}
module.exports = adminAuth





