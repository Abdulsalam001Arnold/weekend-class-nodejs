

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


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})