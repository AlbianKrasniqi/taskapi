require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const notFound = require('./middleware/not-found')


// Import Routes
const authRoute = require('./routes/auth')
const postsRoute = require('./routes/posts')


// Connect to DB
mongoose.connect(process.env.DB_DATABASE, {
    useNewUrlParser : true
}, () => console.log('Connected to DB'))


app.use('/uploads', express.static('uploads'))
app.use(express.json())


// Route Middleware
app.use('/api/user', authRoute)
app.use('/api/posts', postsRoute)
app.use(notFound)




// Listening
app.listen(3000, () => console.log('Server Started'))