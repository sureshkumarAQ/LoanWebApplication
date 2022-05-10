const { ApplyLoan, ModifyLoan } = require("../models/loanModel");
const {
  User,
  userPhoto,
  Aadhar,
  PanCard,
  SalarySlip,
} = require("../models/userModel");

exports.homePage = async (req, res) => {
  try {
    await ApplyLoan.find({ acceptanace: false })
      .select("-__v")
      .populate("user", ["username", "lecs", "maxLoanAmount"])
      .then((loan) => {
        res.status(200).send(loan);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while creating a create operation",
        });
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getLoanByID = async (req, res) => {
  try {
    const loanID = req.params.loanID;
    console.log(loanID);
    await ApplyLoan.findById(loanID)
      .select("-__v")
      .populate("user", ["username", "lecs", "maxLoanAmount"])
      .then((loan) => {
        res.status(200).send(loan);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message ||
            "Some error occurred while creating a create operation",
        });
      });
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.userProfile = async (req, res) => {
  try {
    const userID = req.user._id;
    const user = await User.findById(userID).select("-_id -password -__v");

    if (!user) {
      res
        .status(400)
        .send("Your Profile not found please create account first");
    }
    // console.log(user);
    res.status(201).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.userProfilePhoto = async (req, res) => {
  try {
    const userID = req.user._id;
    const files = await userPhoto.find({ user: userID });

    let filename = "Avatar-Transparent.png";
    for (var i = 0; i < files.length; i++) {
      if (files[i].profilePhoto) {
        filename = files[i].profilePhoto.filename;
        break;
      }
    }
    res.status(201).send(filename);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.acceptedLoanRequest = async (req, res) => {
  try {
    const userID = req.user._id;

    const loans = await ApplyLoan.find({
      user: userID,
      acceptanace: true,
    }).populate("usersWhoAccept", ["username", "lecs", "maxLoanAmount"]);

    if (!loans) {
      res.status(500).send("No loan request accepted");
    }

    // console.log(loans);
    res.status(201).send(loans);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.modifiedLoanRequest = async (req, res) => {
  try {
    const userID = req.user._id;
    const loans = await ModifyLoan.find({
      user: userID,
      acceptanace: false,
    }).populate("modifier", ["username", "lecs", "maxLoanAmount"]);

    if (!loans) {
      res.status(500).send("No modified loan request");
    }
    res.status(201).send(loans);
  } catch (error) {
    res.status(500).send(error);
  }
};
exports.modifiedAcceptedLoanRequest = async (req, res) => {
  try {
    const userID = req.user._id;
    const loans = await ModifyLoan.find({
      modifier: userID,
      acceptanace: true,
    }).populate("user", ["username", "lecs", "maxLoanAmount"]);

    res.status(201).send(loans);
  } catch (error) {
    res.status(500).send(error);
  }
};
