import express from 'express'
import sekharController from './sekharController.js'


const router=express.Router()

router.post("/post",sekharController.createSekhar)
router.get("/get",sekharController.getAllSekhars)

export default router