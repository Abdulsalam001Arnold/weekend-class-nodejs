
const Joi = require('joi');

const userValidation = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    email: Joi.string().email().required().min(5).max(30),
    password: Joi.string().min(8).max(20).required().regex(/^[a-zA-Z0-9]{3,30}$/),
    bio: Joi.string().min(3).max(100).optional(),
    age: Joi.number().optional(),
})

module.exports = userValidation;