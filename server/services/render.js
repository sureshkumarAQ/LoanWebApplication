const axios = require("axios");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8080;

exports.loanList = (req, res) => {
  // Make a get request to loans
  axios
    .get(`http://localhost:${PORT}/loan/loans`)
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
    .get(`http://localhost:${PORT}/loan/loan/${loanID}`)
    .then(function (response) {
      // console.log(response.data);
      res.render("modifyLoan", { loan: response.data });
    })
    .catch((err) => {
      res.send(err);
    });
};

exports.userProfile = (req, res) => {
  const token = req.cookies.jwtoken;
  // axios
  //   .get("http://localhost:3000/user/profile", {
  //     headers: {
  //       jwtoken: token,
  //       "Content-Type": "application/json",
  //     },
  //   })
  //   .then(function (response) {
  //     console.log(response.data);
  //     res.render("profile", { user: response.data });
  //   })
  //   .catch((err) => {
  //     res.send(err);
  //   });

  let one = `http://localhost:${PORT}/loan/acceptedLoan`;
  let two = `http://localhost:${PORT}/user/profile`;
  let three = `http://localhost:${PORT}/user/profilePhoto`;
  let four = `http://localhost:${PORT}/loan/modifiedLoan`;

  const requestOne = axios.get(one, {
    headers: {
      jwtoken: token,
      "Content-Type": "application/json",
    },
  });
  const requestTwo = axios.get(two, {
    headers: {
      jwtoken: token,
      "Content-Type": "application/json",
    },
  });
  const requestThree = axios.get(three, {
    headers: {
      jwtoken: token,
      "Content-Type": "application/json",
    },
  });
  const requestFour = axios.get(four, {
    headers: {
      jwtoken: token,
      "Content-Type": "application/json",
    },
  });

  axios
    .all([requestOne, requestTwo, requestThree, requestFour])
    .then(
      axios.spread((...responses) => {
        const responseOne = responses[0].data;
        const responseTwo = responses[1].data;
        const responseThree = responses[2].data;
        const responseFour = responses[3].data;
        // use/access the results
        // console.log(responseFour);
        const Responces = [
          responseOne,
          responseTwo,
          responseThree,
          responseFour,
        ];
        // console.log(Responces);
        res.render("profile", { Responces: Responces });
      })
    )
    .catch((errors) => {
      console.log(errors);
    });
};
