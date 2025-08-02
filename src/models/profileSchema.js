

const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
    bio: {
        type: String
    },
    age: {
        type: Number
    },
    profilePicture: {
        type: String
    }
})

const profileModel = mongoose.model('profile', profileSchema)

module.exports = profileModel