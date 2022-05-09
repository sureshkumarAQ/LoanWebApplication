const express = require("express");
const route = express.Router();
const userAuth = require('../middleware/userAuth')
const controller = require('../controller/loanController')
const getController = require('../controller/getController')


route.post('/applyLoan',userAuth, controller.applyNewLoan)
route.post('/acceptLoan/:loanID',userAuth, controller.acceptLoan)

// Get APIs 
route.get('/loans',userAuth,getController.homePage)


module.exports = route;