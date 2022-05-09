const express = require("express");
const route = express.Router();
const userAuth = require('../middleware/userAuth')
const controller = require('../controller/loanController')

route.post('/applyLoan',userAuth, controller.applyNewLoan)
route.post('/acceptLoan/:loanID',userAuth, controller.acceptLoan)


module.exports = route;