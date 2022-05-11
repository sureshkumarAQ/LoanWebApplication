const { ApplyLoan, ModifyLoan } = require("../models/loanModel");
const { User } = require("../models/userModel");

const PORT = process.env.PORT || 8080;

exports.applyNewLoan = async (req, res) => {
  try {
    const userID = req.user._id;
    if (!userID) {
      res.status(401).send("Please Login to accept/modify a loan request");
    }

    const user = await User.findById(userID);

    if (!user) {
      res.status(400).send("User Not found");
    }
    if (req.body.loanAmount > user.maxLoanAmount) {
      res
        .status(501)
        .send(`Your loan amount should be less than ${user.maxLoanAmount}`);
    } else {
      const loan = await new ApplyLoan({
        user: userID,
        loanAmount: req.body.loanAmount,
        tenure: req.body.tenure,
        interestRate: req.body.interestRate,
      });
      // console.log(loan);
      await loan.save(loan).then((data) => {
        // res.status(201).send(data);
        res.redirect("/loan/loanRequests");
      });
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
};

exports.acceptLoan = async (req, res) => {
  try {
    const userID = req.user._id;
    const loanID = req.params.loanID;

    const loan = await ApplyLoan.findById(loanID);
    // console.log(loan);

    const loanUserID = loan.user;
    const loanUser = await User.findById(loanUserID);

    if (!loan) {
      res.status(201).send("No loan request with this ID");
    }

    //Calculating score based on age and ctc
    let ageScore, ctcScore;
    if (loanUser.age > 75 || loanUser.age < 25) {
      ageScore = 0;
    } else {
      ageScore = 100 - (loanUser.age - 25) * 2;
    }

    if (loanUser.ctc > 5000000) {
      ctcScore = 100;
    } else if (loanUser.ctc < 300000) {
      ctcScore = 0;
    } else {
      ctcScore = ((loanUser.ctc - 300000) * 2) / 100000;
    }

    // Calculating updated loanScore based on total repayed loans by user

    let loanScore, preScore;
    if (loanUser.totalLaon + 1 >= 9) {
      loanScore = 100;
    } else {
      loanScore = (loanUser.totalLaon + 2) * 10;
    }

    preScore = (loanUser.lecs - 300) / 4;

    const updatedLecs = 300 + (ageScore + loanScore + preScore + ctcScore);
    const updatedMaxLoanAmount = (5000000 / 400) * (updatedLecs - 300);

    await User.findOneAndUpdate(
      {
        _id: loanUserID,
      },
      {
        totalLaon: loanUser.totalLaon + 1,
        lecs: updatedLecs,
        maxLoanAmount: updatedMaxLoanAmount,
      }
    ).exec();
    // console.log(loanUser);
    await ApplyLoan.findOneAndUpdate(
      {
        _id: loanID,
      },
      {
        acceptanace: true,
        usersWhoAccept: userID,
      }
    ).exec();

    // res.status(200).send(loanUser);
    res.redirect("/loan/loanRequests");
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.modifyLoanRequest = async (req, res) => {
  try {
    const userID = req.user._id;
    const loanID = req.params.loanID;

    const loan = await ApplyLoan.findById(loanID);

    const loanUserID = loan.user;

    const modifiedLoan = await new ModifyLoan({
      modifier: userID,
      user: loanUserID,
      modifyLoanAmount: req.body.modifyLoanAmount,
      modifyTenure: req.body.modifyTenure,
      modifyInterestRate: req.body.modifyInterestRate,
    });
    // console.log(modifiedLoan);
    await modifiedLoan.save(modifiedLoan).then((data) => {
      res
        .status(201)
        .send(
          `"Modified loan request send successfully !! Redirect to home page http://localhost:${PORT}/loan/loanRequests}`
        );
      // res.redirect('/user/login');
    });
  } catch (err) {
    res.status(400).send(err);
  }
};

exports.acceptModifiedLoanRequest = async (req, res) => {
  try {
    const userID = req.user._id;
    const loanID = req.params.loanID;
    const loanUser = await User.findById(userID);

    const loan = await ModifyLoan.findById(loanID);

    if (!loan) {
      res.status(201).send("No loan request with this ID");
    }
    console.log(loan);

    //Calculating score based on age and ctc
    let ageScore, ctcScore;
    if (loanUser.age > 75 || loanUser.age < 25) {
      ageScore = 0;
    } else {
      ageScore = 100 - (loanUser.age - 25) * 2;
    }

    if (loanUser.ctc > 5000000) {
      ctcScore = 100;
    } else if (loanUser.ctc < 300000) {
      ctcScore = 0;
    } else {
      ctcScore = ((loanUser.ctc - 300000) * 2) / 100000;
    }

    // Calculating updated loanScore based on total repayed loans by user

    let loanScore, preScore;
    if (loanUser.totalLaon + 1 >= 9) {
      loanScore = 100;
    } else {
      loanScore = (loanUser.totalLaon + 2) * 10;
    }

    preScore = (loanUser.lecs - 300) / 4;

    const updatedLecs = 300 + (ageScore + loanScore + preScore + ctcScore);
    const updatedMaxLoanAmount = (5000000 / 400) * (updatedLecs - 300);

    await User.findOneAndUpdate(
      {
        _id: userID,
      },
      {
        totalLaon: loanUser.totalLaon + 1,
        lecs: updatedLecs,
        maxLoanAmount: updatedMaxLoanAmount,
      }
    ).exec();
    console.log(loanUser);
    await ModifyLoan.findOneAndUpdate(
      {
        _id: loanID,
      },
      {
        acceptanace: true,
      }
    ).exec();
    res.redirect("/user/myProfile");
  } catch (err) {
    res.status(400).send(err);
  }
};
