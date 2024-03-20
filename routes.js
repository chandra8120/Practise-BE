import express from 'express'
import multipleImagesController from './controller/multipleImagesController.js'
import shirtController from './controller/shirtsController.js'
import loginController from './controller/loginController..js'
import pdfController from './controller/pdfController.js'
import practiseController from './controller/practiseController.js'


const router=express.Router()

router.post("/signup",loginController.signup)
router.post('/login',loginController.login)
router.post('/logout',loginController.logout)

router.post("/post",multipleImagesController.createSekhar)
router.get("/get",multipleImagesController.getAllSekhars)

router.post("/postshirt",shirtController.createShirt)
router.get("/getshirts",shirtController.getAllShirts)
router.delete("/deleteshirt",shirtController.deleteShirt)

router.post('/upload-pdf', pdfController.createPdf);
router.get('/getAllpdfs',pdfController.getAllPdfs)
router.get('/getPdf/:id', pdfController.getPdf);

router.post('/postPractise',practiseController.createPractise)
router.get('/getAllPractise',practiseController.getAllPractise)



export default router 