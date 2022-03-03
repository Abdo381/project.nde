const categoryModel = require("../../database/models/category.model")
class category{
    static addCategory = async(req ,res)=>{
        try{
            const category = new categoryModel({
               adminId:req.admin._id,
                ...req.body
            })
            await category.save()
            res.send({apiStatus:true, data:post, message:"added"})            
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error"})
        }
    }
    static delCategory = async(req ,res)=>{
        try{
            const categorys = await categoryModel.deleteOne({
                _id:req.params.id,
                adminId:req.admin._id
            })
            if(!categorys) throw new Error("invalid post")
            res.send({apiStatus:true, data:categorys, message:"data featched"})
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error"})
        }   
    }
    static allCategory = async(req ,res)=>{
        try{
            const category = await categoryModel.find()
            res.send({apiStatus:true, data:category, message:"data featched"})
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error"})
        }
    }
    static myCategory = async(req ,res)=>{
        try{
            await req.admin.populate("myCategory")
            res.send({apiStatus:true, data:{admin:req.admin, posts:req.admin.myCategory}, message:"data featched"})
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error"})
        }
    }

}
module.exports=category