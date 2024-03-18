import Login from "./loginModel.js";
import bcrypt from 'bcrypt'

const loginController={

    signup:async(req,res)=>{
    try{
        const {email,password}=req.body

        const existingUser=await Login.findOne({email})
        if(existingUser){
            return res.status(400).json({message:"Already user existed "})
        }
       const hashedpassword=await bcrypt.hash(password,10)
       const newUser=new Login({email,password:hashedpassword})
       await newUser.save()
       res.status(201).json({message:"Successfully signup user"})
    }
    catch(error){
        res.status(500).json({error:"Internal server error"})
    }
}     
}
export default loginController