
const Joi = require('joi');

const contactValidate = Joi.object({
    fullName: Joi.string().min(3).max(40).required(),
    email: Joi.string().email().required().min(5).max(50).message({
        'string.email': 'Please enter a valid email address',
        'string.empty': 'Email cannot be empty',
        'any.required': 'Email is required'
    }),
    phoneNumber: Joi.string().optional().min(10).max(17).pattern(/^[0-9]+$/),
    message: Joi.string().required().min(10).max(500)
})

module.exports = contactValidate;

