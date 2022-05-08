const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./userModel')

const AskedLoanSchema = new Schema({
    userLinked: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    loanAmount: {
        type: Number,
        required: true
    },
    tenure: {
        type: Number,
        require: true,
    },
    interestRate: {
        type: Number,
        require: true
    },
    acceptanace: {
        type: Boolean,
        default: false
    }

})
const ModifyLoanSchema = new Schema({
    userLinked: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    modifyLoanAmount: {
        type: Number,
        required: true
    },
    modifyTenure: {
        type: Number,
        require: true,
    },
    modifyInterestRate: {
        type: Number,
        require: true
    },
    acceptanace: {
        type: Boolean,
        default: false
    }
})

const Loan = mongoose.model('Loan', AskedLoanSchema)
const ModifyLoan = mongoose.model('ModifyLoan', ModifyLoanSchema)
module.exports = { Loan, ModifyLoan }