const mongoose = require('mongoose')

const Schema = mongoose.Schema

const SalarySlip = new Schema({
    slip: {
      type: String,
      required: true,
    } 
});

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    AadharCard: {
        type: String,
        required: true
    },
    PanCard: {
        type: String,
        required: true
    },
    SalarySlips:[
        SalarySlip
    ]
})

const User = mongoose.model('User', userSchema)
module.exports = User