import { get } from "mongoose";
import Practise from "../model/practiseModel.js";
import multer from "multer";

const storage=multer.memoryStorage()
const upload=multer({storage:storage})
const practiseController={

    createPractise:[ upload.single('image'),
    async(req,res)=>{
        try{
            const {name,price}=req.body

            if(!req.file){
                return res.status(400).json({message:"Required field missing image"})
            }
            const image=req.file.buffer.toString('base64')

            if(!name || !price ){
                return res.status(400).json({message:'required fields missing name price'})
            }
            const newPractise=new Practise({name,price,image})
            const savedPractise=await newPractise.save()
            res.status(201).json({message:"Successfully added the data",savedPractise})
        }
        catch(error){
            res.status(500).json({error:'Internal server error'})
        }
    }
],
getAllPractise:async(req,res)=>{
    try{
        const getData=await Practise.find()
        res.status(200).json(getData)
    }
    catch(error){
        res.status(500).json({error:"Failed to get data,internal server error"})
    }
}
}
export default practiseController