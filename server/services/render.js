const axios = require("axios");
const ejsLint = require("ejs-lint");

exports.loanList = (req, res) => {
  // Make a get request to driver
  axios
    .get("http://localhost:3000/loan/loans")
    .then(function (response) {
      console.log(response.data);
      res.render("home.ejs", { loans: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};
