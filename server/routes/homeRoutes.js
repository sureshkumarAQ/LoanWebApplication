const express = require("express");
const route = express.Router();
const userAuth = require("../middleware/userAuth");
const controller = require("../controller/loanController");
const getController = require("../controller/getController");
const services = require("../services/render");

// Services
route.get("/", services.loanList);
route.get("/modifyLoan/:loanID", services.modifyLoan);

module.exports = route;
