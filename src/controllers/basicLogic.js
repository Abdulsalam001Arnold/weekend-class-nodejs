
const Contact = require('../models/contactSchema')
const contactValidate = require('../validators/contactValidate')

const getHome = (req, res) => {
    res.send('Welcome to home page!!')
}

const postContact = async(req, res) => {

    try{
        const { fullName, email, phoneNumber, message } = req.body
    
        const { error } = contactValidate.validate({
            fullName,
            email,
            phoneNumber,
            message
        })
    
        if(error) {
            return res.status(400).json({
                status: 'Bad Request',
                message: error.details[0].message
            })
        }
        if(fullName !== "" && email !== "" && message !== ""){
            const contact = await Contact.create({
                fullName,
                email,
                phoneNumber,
                message
            })
            
            res.status(201).json({
                status: 'success',
                data: contact,
                message: 'Contact created successfully'
            })
        }else{
            res.status(400).json({
                status: 'failed',
                message: 'Please fill all the required fields'
            })
        }
    }catch(err){
        res.status(500).json({
            error: err,
            message: 'An error occurred while creating contact'
        })
    }
}

const getAll = async (req, res) => {
    try{
        const contacts = await Contact.find()
        if(!contacts) {
            res.status(404).json({
                status: 'Not Found',
                message: 'No contacts found'
            })
        }
        res.status(200).json({
            status: 'success',
            data: contacts,
            message: 'Contacts fetched successfully'
        })
    }catch(err){
        console.error("Error has occured:", err)
        res.status(500).json({
            status: 'Internal Server Error',
            message: 'An error occurred while fetching contacts'
        })
    }
}

const getSingle = async (req, res) => {
    const { id } = req.params;

    try{
        const contact = await Contact.findById(id)

        if(!contact){
            res.status(404).json({
                status: 'Not Found',
                message: 'Contact not found'
            })
        }
        res.status(200).json({
            status: 'success',
            data: contact,
            message: 'Contact fetched successfully'
        })
    }catch(err){
        console.error("Error has occured:", err)
        res.status(500).json({
            status: 'Internal Server Error',
            message: 'An error occurred while fetching contact'
        })
    }
}

const deleteContact = async (req, res) => {
    const { id } = req.params;
    try{
        const deleteOne = await Contact.findByIdAndDelete(id)

        if(!deleteOne){
            return res.status(404).json({
                status: 'Not Found',
                message: 'Contact not found'
            })
        }
        res.status(200).json({
            status: 'success',
            data: deleteOne,
            message: 'Contact deleted successfully'
        })
    }catch(err){
        console.error("Error has occured:", err)
        res.status(500).json({
            status: 'Internal Server Error',
            message: 'An error occurred while deleting contact'
        })
    }
}


module.exports = { getHome, postContact, getAll, getSingle, deleteContact }