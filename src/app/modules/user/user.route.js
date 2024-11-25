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

// delete user

router.delete("/auth/users/:id",verifyToken,verifyAdmin, userController.deleteUser);

// update user role

router.patch("/auth/users/:id",verifyToken,verifyAdmin, userController.updateUserRole);



// export const UserRoutes = router;

module.exports=router
