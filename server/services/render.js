const axios = require("axios");

exports.loanList = (req, res) => {
  // Make a get request to loans
  axios
    .get("http://localhost:3000/loan/loans")
    .then(function (response) {
      // console.log(response.data);
      res.render("home", { loans: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
exports.userLogin = (req, res) => {
  res.render("login");
};
exports.userSignup = (req, res) => {
  res.render("signup");
};
exports.userLoanApply = (req, res) => {
  res.render("loanapply");
};

exports.modifyLoan = (req, res) => {
  const loanID = req.params.loanID;
  // console.log(loanID);

  axios
    .get(`http://localhost:3000/loan/loan/${loanID}`)
    .then(function (response) {
      // console.log(response.data);
      res.render("modifyLoan", { loan: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
