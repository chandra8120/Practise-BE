import { Schema,model } from "mongoose";

const loginSchema=new Schema({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
})
const User=model("User",loginSchema)
export default User