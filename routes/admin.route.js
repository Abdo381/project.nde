const arouter =require("express").Router()
const adminController =require("../app/controller/admin.controller")
const adminAuth =require ("../middleware/admin.auth")
arouter.post("/register",adminAuth,adminController.register)
arouter.post("/login",adminController.login)
arouter.post("/logout", adminAuth,adminController.logout)
 module.exports =arouter

