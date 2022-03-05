const productModel = require ("../../database/models/product.model")
class product{
    static addproduct= async(req,res)=>{
        try{
            const product = new productModel({
                adminId:req.admin._id,
                ...req.body
                
            })
            
            await product.save()
            res.send({apiStatus:true, data:product, message:"added"})            
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"errorAdd"})
        }
    }
    static allproducts= async(req,res)=>{
        try{
            const products = await productModel.find()
            res.send({apiStatus:true, data:products, message:"data featched"})
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error"})
        }
    }
    static myproducts= async(req,res)=>{
        try{
            // const products = await productModel.find({adminId:req.admin._id})
            await req.admin.populate("myproducts")
            res.send({apiStatus:true, data:{admin:req.admin, products:req.admin.myproducts}, message:"data featched"})
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error"})
        }
    }
    static delproduct= async(req,res)=>{
        try{
            const products = await productModel.deleteOne({
                _id:req.params.id,
                adminId:req.admin._id
            })
            if(!products) throw new Error("invalid product")
            res.send({apiStatus:true, data:products, message:"data featched"})
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error"})
        }    
    }
    static imageProduct = async (req, res) =>{
        try{
           
            req.product.image = req.file.path
            await req.product.save()
            res.send({apiStatus:true, data:req.product, message:"image uploaded"})
        }
        catch(e){
            res.send({apiStatus:false, data:e.message, message:"error deleting admin"})
        }
    }
}

module.exports = product
