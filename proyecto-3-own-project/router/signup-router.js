const express = require('express');
const signupRouter = express.Router();
const Signup = require('../models/signup-model');
const path = require('path');
const bcrypt = require('bcrypt');
const { validateEmail, validatePassword, validateNickname } = require('../validations/validations')


signupRouter
    .route('/')
    .get((req, res) => {
        res.send("ciao")
      })

signupRouter
    .route('/')
    .post( async (req, res) => {
      // const { body: { nickname, email, password } } = req;
      // const nickname = await req.body.nickname;
      try {
        const email = req.body.email;
        const password = await req.body.password;
  
        validateEmail(email);
        const valEmail = await User.findOne({email});
        if (valEmail) {
          return res.status(400).json({message: `The given email: ${email} - already exists`})
        }
        if (password)
        validatePassword(password);
        
        // validateNickname(nickname);
        
      } catch (error) {
        res.status(400).send({message: error.message})
      }
        try {
            // const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const user = new User({
                email: req.body.email,
                password: hashedPassword,
                nickname: req.body.nickname
              });
              
              user
                .save()
                .then((result) => {
                  console.log(`Created User: ${user}`);
                  res.json(`Created User: ${user.nickname}`);
                })
                .catch((err) => {
                  console.log(err);
                  res.json(`There was an error: ${err}`)
                });
              
        } catch  {
            res.status(500).send();
        }
    })



module.exports = signupRouter;