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
      const emailForm = req.body.email;
      // const password = await req.body.password;
      console.log("ALGO" + emailForm)

      validateEmail(emailForm);
      const valEmail = await User.findOne({email: emailForm});
      if(valEmail){
        return res.status(400).json({message: `The given email: ${emailForm} - already exists`})
      }
      // validatePassword(password);
      // validateNickname(nickname);
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