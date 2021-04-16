const validations = {
    validateEmail(emailForm){
        if (typeof emailForm !== 'string') throw new TypeError(`${emailForm} is not an e-mail`)
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(emailForm)){throw new Error(`This e-mail: ${emailForm} is not a valid email`)}
        if(!emailForm.trim().length) throw new Error ('Email cannot be empty')
        
    },
    validatePassword(password){
        if(typeof password !== 'string') throw new TypeError(`${password} is not a password`)
        if(!password.trim().length) throw new Error('The password cannot be empty')
        if(password.length < 6 ) throw new Error ("Password's length must be greater than 6")
    },
    validateNickname(nickname){
        if(typeof nickname !== 'string') throw new TypeError(`${nickname} is not a nickname`)
        if(nickname === "nickname") throw new Error (`Nickname cannot be ${nickname}`)
    }
}

module.exports = validations