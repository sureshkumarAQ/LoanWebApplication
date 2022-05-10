const express = require("express");
const controller = require("../controller/userController.js");
const userAuth = require("../middleware/userAuth");
const { upload } = require("../middleware/upload");
const services = require("../services/render");

const route = express.Router();

// Services
route.get("/login", services.userLogin);
route.get("/register", services.userSignup);
route.get("/apply", services.userLoanApply);

//APIs

route.post("/register", controller.Register);
route.post("/login", controller.Login);

route.post(
  "/uploadProfilePhoto",
  userAuth,
  upload.single("profilePhoto"),
  controller.uploadProfilePhoto
);
route.post(
  "/uploadAadhar",
  userAuth,
  upload.single("Aadhar"),
  controller.uploadAdhar
);
route.post(
  "/uploadPan",
  userAuth,
  upload.single("panCard"),
  controller.uploadPan
);
route.post(
  "/uploadSalarySlips",
  userAuth,
  upload.array("SalarySlips"),
  controller.uploadSalarySlips
);

module.exports = route;
