const express =require("express")
const app =express()
require("dotenv").config()
require("../../database/connecction")
app.use(express.json())
const userRuotes =require("../../routes/user.route")
app.use("/api/user",userRuotes)
app.get("*",(req,res)=>res.send({error:"invalid url"}))
module.exports=app