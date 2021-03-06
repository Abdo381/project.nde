const router =require("express").Router()
const userController =require("../app/controller/user.controler")
const auth =require ("../middleware/auth")
router.post("/register",userController.register)
router.post("/login",userController.login)
router.get("/all",auth, userController.getAll)
router.get("/all/:id",auth, userController.getSingle)
router.delete("/all",auth, userController.delAll)
router.delete("/all/:id",auth,userController.delSingle)
router.post("/logout", auth,userController.logout)
router.post("/logoutAll", auth,userController.logoutAll)


module.exports = router