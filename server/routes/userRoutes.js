const express = require("express");
const controller = require('../controller/userController.js')
const getController = require('../controller/getController.js')
const userAuth = require('../middleware/userAuth')
const {upload} = require('../middleware/upload')

const route = express.Router();

//APIs

route.post('/register',controller.Register);
route.post('/login',controller.Login);

route.post('/uploadProfilePhoto',userAuth,upload.single('profilePhoto'),controller.uploadProfilePhoto);
route.post('/uploadAadhar',userAuth,upload.single('Aadhar'),controller.uploadAdhar);
route.post('/uploadPan',userAuth,upload.single('panCard'),controller.uploadPan);
route.post('/uploadSalarySlips',userAuth,upload.array('SalarySlips'),controller.uploadSalarySlips);



// GET APIS
route.get('/myProfile',userAuth,getController.userProfile)

module.exports = route;