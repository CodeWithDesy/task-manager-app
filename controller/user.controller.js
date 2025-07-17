const User = require('../model/user.model')

async function createUser(req, res) {
    try {
        const userExist = await User.findOne ({email: req.body.email})
        if (userExist) {
            res.status(201).json({message: 'User already exist'})
        } else {
            const user = new User(req.body)
            await user.save()
            res.status(201).json({message: 'User created successfully', data: user})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'server error'})
    }
}

async function loginUser(req, res) {
    try {
        const userExist = await User.findOne({ email: req.body.email })
        if (!userExist) {
            res.status(404).json({message: 'User not found, please signup'})
        } else {
            const passwordMatch = userExist.checkPassword(req.body.password)
            if (passwordMatch) {
                res.status(201).json({message: 'User login successfully', data: userExist})
            } else {
                res.status(404).json({message: 'Invalid password'})
            }
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'server error'})
    }
}

const basePath = (req,res) => {
    try {
        res.status(200).json({message: "Welcome to our api"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'server error'}) 
    }
}
const falsePath = (req, res) => {
    try {
        res.status(404).json({message: 'undefined route'})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'server error'})
    }
}

module.exports = { basePath, falsePath, createUser, loginUser }
