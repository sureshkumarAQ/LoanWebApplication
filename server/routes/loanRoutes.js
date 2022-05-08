const express = require("express");
const route = express.Router();
const { applyNewLoan } = require('../controller/loanController')

route.post('/applyLoan/:id', applyNewLoan)


module.exports = route;