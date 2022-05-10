const express = require("express");
const route = express.Router();
const userAuth = require("../middleware/userAuth");
const controller = require("../controller/loanController");
const getController = require("../controller/getController");
const services = require("../services/render");

route.post("/applyLoan", userAuth, controller.applyNewLoan);
route.post("/acceptLoan/:loanID", userAuth, controller.acceptLoan);
route.post("/modifyLoan/:loanID", userAuth, controller.modifyLoanRequest);
route.post(
  "/acceptModifiedLoan/:loanID",
  userAuth,
  controller.acceptModifiedLoanRequest
);

// Get APIs
route.get("/loans", getController.homePage);
route.get("/loan/:loanID", getController.getLoanByID);

route.get("/acceptedLoan", userAuth, getController.acceptedLoanRequest);

route.get("/modifiedLoan", userAuth, getController.modifiedLoanRequest);

route.get(
  "/modifiedAcceptedLoan",
  userAuth,
  getController.modifiedAcceptedLoanRequest
);

// Services
route.get("/loanRequests", services.loanList);
route.get("/modifyLoan/:loanID", services.modifyLoan);

module.exports = route;
