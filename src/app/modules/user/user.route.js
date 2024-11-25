const express=require('express')
const router=express.Router()
const userController = require('./user.controller');
const { verifyToken } = require('../../middleware/verifyToken');
const verifyAdmin = require('../../middleware/verifyAdmin');



 router.post("/auth/register", userController.userRegistration);

 router.post("/auth/login", userController.userLogin);
 router.post("/auth/logout", userController.userLogout);

 router.get("/auth/users", verifyToken,verifyAdmin,userController.getAllUsers);

// router.post("/register", userRegistration);



// export const UserRoutes = router;

module.exports=router
