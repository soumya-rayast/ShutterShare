const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        index: true
    },
    password: {
        type: String,
        required:true
    },
    accountType: {
        type: String,
        default : 'buyer'
    },
    uploads: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "POST"
        }
    ],
    purchased: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "POST"
        }
    ],
    favourites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "POST"
        }
    ]
})

const User = mongoose.model('User', userSchema)
module.exports = User;