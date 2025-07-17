const Joi = require('joi')

const signupSchema = Joi.object({
    username: Joi.string() 
    .alphanum()
    .min(3)
    .max(30)
    .required(),
    dob:  Joi.string().required(),
    email:  Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')), 
})

const loginSchema = Joi.object({
    email:  Joi.string().required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
})

const validateSignupMiddleware = (req, res, next) => {
    try {
        let {error, value} = signupSchema.validate(req.body)
        if (error){
            res.status(400).json({message: error.details[0].message})
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'server error'}) 
    }
} 

const validateLoginMiddleware = (req, res, next) => {
    try {
        let {error, value} = loginSchema.validate(req.body)
        if (error){
            res.status(400).json({message: error.details[0].message})
        } else {
            next()
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message: 'server error'}) 
    }
} 

module.exports = { validateSignupMiddleware, validateLoginMiddleware}