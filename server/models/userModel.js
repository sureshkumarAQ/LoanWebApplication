const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  ctc: {
    type: Number,
    required: true,
  },

  bankname: {
    type: String,
  },
  accountnumber: {
    type: Number,
  },
  ifsc: {
    type: String,
  },
  age: {
    type: Number,
    required: true,
  },
  totalLaon: {
    type: Number,
    default: 0,
  },
  // loan eligible criteria score(lecs)
  lecs: {
    type: Number,
    default: 300,
  },
  maxLoanAmount: {
    type: Number,
    default: 0,
  },
});

// Hash password usign mongoose hook
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  let newPassword = this.password.toString();
  this.password = await bcrypt.hash(newPassword, salt);
  next();
});

const profilePhotoSchema = new Schema({
  profilePhoto: {
    type: Object,
  },
  user: { type: Schema.Types.ObjectId, ref: "user" },
});

const aadharSchema = new Schema(
  {
    aadhar: {
      type: Object,
    },
    user: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const panSchema = new Schema(
  {
    pancard: {
      type: Object,
    },
    user: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const salarySlipSchema = new Schema(
  {
    slips: [Object],

    user: { type: Schema.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
const profilePhoto = mongoose.model("profilePhoto", profilePhotoSchema);
const Aadhar = mongoose.model("aadhar", aadharSchema);
const PanCard = mongoose.model("pancard", panSchema);
const SalarySlip = mongoose.model("salaryslip", salarySlipSchema);
module.exports = { User, profilePhoto, Aadhar, PanCard, SalarySlip };
