const mongoose = require('mongoose')

const Schema = mongoose.Schema

const userSchema = new Schema({

    username: {
        type: String,
        required: true,
<<<<<<< HEAD
        unique: true
=======
        unique:true
>>>>>>> c3ae748df29aaea0e532dc5475eac9748f0d4265
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
        // default:
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User