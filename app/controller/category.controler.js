const categoryModel = require("../../database/models/category.model")
class category{
    static addcategory= async(req,res)=>{
        try{
            const category = new categoryModel({
                adminId:req.admin._id,
                ...req.body
            })
            await category.save()
            res.send({apiStatus:true, data:category, message:"added"})            
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"errorAdd"})
        }
    }
    static allcategorys= async(req,res)=>{
        try{
            const categorys = await categoryModel.find()
            res.send({apiStatus:true, data:categorys, message:"data featched"})
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error"})
        }
    }
    static mycategorys= async(req,res)=>{
        try{
            await req.admin.populate("mycategorys")
            res.send({apiStatus:true, data:{admin:req.admin, categorys:req.admin.mycategorys}, message:"data featched"})
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error"})
        }
    }
    static delcategory= async(req,res)=>{
        try{
            const categorys = await categoryModel.deleteOne({
                _id:req.params.id,
                adminId:req.admin._id
            })
            if(!categorys) throw new Error("invalid category")
            res.send({apiStatus:true, data:categorys, message:"data featched"})
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error"})
        }    
    }
}
module.exports = category
