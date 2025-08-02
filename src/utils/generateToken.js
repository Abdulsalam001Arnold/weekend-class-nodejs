
const jwt = require('jsonwebtoken')
require('dotenv').config()

const generateToken = (userId) => {
    if(!userId){
        throw new Error('User ID not found')
    }

    try{
        const token = jwt.sign({id: userId}, process.env.JWT_SECRET, {
            expiresIn: '7d'
        })
        return token;
    }catch(err){
        console.error('Error has occured:', err)
    }
}

module.exports = { generateToken }