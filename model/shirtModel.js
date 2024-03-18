import {model,Schema} from 'mongoose'

const shirtSchema=new Schema({
    name:{type:String,required:true},
    price:{type:String,required:true},
    image:{type:String,required:true},
    link:{type:String,required:true}
})
const Shirt=model("Shirt",shirtSchema)
export default Shirt