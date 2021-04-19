const validations = {
    validateEmail(email){
        if (typeof email !== 'string') throw new TypeError(`${email} is not an e-mail`)
        if (!/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){throw new Error(`This e-mail: ${email} is not a valid email`)}
        if(!email.trim().length) throw new Error ('Email cannot be empty')
        
    },
    validatePassword(password){
        if(typeof password !== 'string') throw new TypeError(`${password} is not a password`)
        if(!password.trim().length) throw new Error('The password cannot be empty')
        if(password.length < 6 ) throw new Error ("Password's length must be greater than 5")
    },
    validateNickname(nickname){
        if(typeof nickname !== 'string') throw new TypeError(`${nickname} is not a nickname`)
        if(nickname === "nickname" || nickname === "kutya") throw new Error (`Nickname cannot be ${nickname}`)
    },
    validateVerb(verb){
        if (typeof verb !== 'string') throw new TypeError(`${verb} is not a verb - please use plain text`)
        if(!verb.trim().length) throw new Error('The verb cannot be empty')


    }
}

module.exports = validations