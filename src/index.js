

const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()
const basicRoute = require('./routes/basicRoute')
const userRoute = require('./routes/userRoutes')

mongoose.connect(process.env.MONGO_URI).then(() => console.log('Database connected successfully!')).catch((err) => console.error(`Error has occured: ${err}`))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api', userRoute)
app.use(basicRoute)
app.get('/', (req, res) => {
    res.send('This is our hosted API!!!')
})



if(process.env.NODE_ENV !== 'production'){
    const PORT = 3000
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
}

module.exports = app