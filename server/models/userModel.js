const mongoose = require('mongoose')
const validator = require("validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})

// Hash password usign mongoose hook
userSchema.pre('save', async function (next) {
    const salt = await bcrypt.genSalt();
    let newPassword = this.password.toString();
    this.password = await bcrypt.hash(newPassword, salt);
    next();
})


const aadharSchema = new Schema({
    aadhar: {
        type: Object
    },
    user: { type: Schema.Types.ObjectId, ref: 'user' },
}, { timestamps: true });

const panSchema = new Schema({

    pancard: {
        type: Object
    },
    user: { type: Schema.Types.ObjectId, ref: 'user' },

}, { timestamps: true });

const salarySlipSchema = new Schema({

    slips: [Object],

    user: { type: Schema.Types.ObjectId, ref: 'user' },

}, { timestamps: true });

const User = mongoose.model('user', userSchema)
const Aadhar = mongoose.model('aadhar', aadharSchema)
const PanCard = mongoose.model('pancard', panSchema)
const SalarySlip = mongoose.model('salaryslip', salarySlipSchema)
module.exports = { User, Aadhar, PanCard, SalarySlip }