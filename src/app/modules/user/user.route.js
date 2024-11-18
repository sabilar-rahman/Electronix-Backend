const express=require('express')
const router=express.Router()
const userController = require('./user.controller')



router.post("/register", userController.userRegistration);

// export const UserRoutes = router;

module.exports=router
