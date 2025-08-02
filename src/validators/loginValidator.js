


const Joi = require('joi');

const loginValidation = Joi.object({
    email: Joi.string().email().required().min(5).max(30),
    password: Joi.string().min(8).max(20).required().regex(/^[a-zA-Z0-9]{3,30}$/)
})

module.exports = loginValidation;