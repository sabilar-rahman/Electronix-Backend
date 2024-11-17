import { User } from "./user.model";

const userRegistration = async (req, res)=>{

    try {

        const {name, email, password} = req.body
        const user = await User({...req.body})
        // await user.save()
        console.log(user);
        
    } catch (error) {
        console.log("error registration", error);
        res.status(500).send({message: "registration failed"})
    }

   

}


export const UserControllers = {userRegistration}