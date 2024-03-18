import express from 'express'
import multipleImagesController from './controller/multipleImagesController.js'
import shirtController from './controller/shirtsController.js'


const router=express.Router()

router.post("/post",multipleImagesController.createSekhar)
router.get("/get",multipleImagesController.getAllSekhars)

router.post("/postshirt",shirtController.createShirt)
router.get("/getshirts",shirtController.getAllShirts)
export default router