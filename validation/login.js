const Validator = require('validator')
const validText = require('./valid-text')

// example of creating a named function as an export
module.exports = function validateLoginInput(data){
    let errors = {}

    data.username = validText(data.username) ? data.username : ''
    data.password = validText(data.password) ? data.password : ''

    // email is a valid email address
    // if (!Validator.isEmail(data.email)) {
    //     errors.email = 'Email is Not Valid Bro'

    // }
    // field is not empty
    if (Validator.isEmpty(data.username)){
        errors.unsername = 'You forgot to enter Username'
    }

    // password is not empty
    if (Validator.isEmpty(data.password)){
        errors.password = "You didn't enter a password"
    }

    return {
        errors, isValid: Object.keys(errors).length === 0
    }

}