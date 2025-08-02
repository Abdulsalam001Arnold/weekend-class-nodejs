
const User = require('../models/userSchema')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const JWT_SECRET = process.env.JWT_SECRET


const protect = async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try{
            token = req.headers.authorization.split(' ')[1]

            const decode = jwt.verify(token, JWT_SECRET)

            req.user = await User.findById(decode.id).select('-password')
            next()
        }catch(err){
            console.error('Error:', err)
            return res.status(401).json({
                message: 'Not authorized'
            })
        }
    }else{
        console.error('Token is not found')
        res.status(404).json({
            message: 'Not token found, please login or signup'
        })
    }
}

module.exports = {protect}