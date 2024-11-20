const express=require('express')
const router=express.Router()
const userController = require('./user.controller')



 router.post("/auth/register", userController.userRegistration);

 router.post("/auth/login", userController.userLogin);
 router.post("/auth/logout", userController.userLogout);

 router.get("/auth/users", userController.getAllUsers);

// router.post("/register", userRegistration);



// export const UserRoutes = router;

module.exports=router
