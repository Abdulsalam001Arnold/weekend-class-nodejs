
const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String
    },
    price: {
        type: Number
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    }
})

const productModel = mongoose.model('products', productSchema)

module.exports = productModel