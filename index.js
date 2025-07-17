const express = require('express')

const mongoose = require('mongoose')
const { createUser, basePath, falsePath, loginUser } = require('./controller/user.controller')
const { validateSignupMiddleware, validateLoginMiddleware } = require('./validators/auth.validator')

const api = express()

api.use(express.json())
api.use(express.urlencoded({extended: true}))

const PORT = 8080

api.post('/signup', validateSignupMiddleware, createUser)
api.post('/login', validateLoginMiddleware, loginUser)

api.all('/', basePath)
api.use(falsePath)

api.listen(PORT,async () => {
    console.log(`server is running on ${PORT}`)
    await mongoose.connect('mongodb://127.0.0.1:27017/test')
    console.log('database connected')
})

