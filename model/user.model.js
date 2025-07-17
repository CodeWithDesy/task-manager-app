const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const { Schema } = mongoose

const userSchema = new Schema({
    username: {type: String, required: true},
    dob: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
}, {timestamps: true})


userSchema.pre('save', function () {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(this.password, salt)
    this.password = hash
})

userSchema.method('checkPassword', function (password) {
    let valid = bcrypt.compareSync(password, this.password)
    return valid;
})

const User = mongoose.model('User', userSchema)

module.exports = User 