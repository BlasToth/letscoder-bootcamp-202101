const validations = {
    validateEmail(email){
        if(typeof email !== 'string') throw new TypeError(`${email} is not an e-mail`)
        if(!email.trim().length) throw new Error ('Email cannot be an empty string')
    },
    validatePassword(password){
        if(typeof password !== 'string') throw new TypeError(`${password} is not a password`)
        if(!password.trim().length) throw new Error('The password cannot be empty')
        if(password.length <6 ) throw new Error ("Password's length must be greater than 6")
    }
}

module.exports = validations