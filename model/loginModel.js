import { Schema,model } from "mongoose";

const loginSchema=new Schema({
    email:{type:String,required:true,unique:true},
    password:{type:Number,required:true},
})
const Login=model("Login",loginSchema)
export default Login