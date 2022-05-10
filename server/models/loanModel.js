const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const User = require("./userModel");

const ApplyLoanSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  loanAmount: {
    type: Number,
    required: true,
  },
  tenure: {
    type: String,
    require: true,
  },
  interestRate: {
    type: Number,
    require: true,
  },
  acceptanace: {
    type: Boolean,
    default: false,
  },
  usersWhoAccept: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
});
const ModifyLoanSchema = new Schema({
  modifier: [{ type: Schema.Types.ObjectId, ref: "user" }],
  user: [{ type: Schema.Types.ObjectId, ref: "user" }],

  modifyLoanAmount: {
    type: Number,
  },
  modifyTenure: {
    type: String,
  },
  modifyInterestRate: {
    type: Number,
  },
  acceptanace: {
    type: Boolean,
    default: false,
  },
});

const ApplyLoan = mongoose.model("ApplyLoan", ApplyLoanSchema);
const ModifyLoan = mongoose.model("ModifyLoan", ModifyLoanSchema);
module.exports = { ApplyLoan, ModifyLoan };
