const express = require('express');
const signupRouter = express.Router();
const Signup = require('../models/signup-model');
const path = require('path');
const bcrypt = require('bcrypt');



signupRouter
    .route('/')
    .get((req, res) => {
        res.render('signup', { title: "Sign up" })
    })

signupRouter
    .route('/')
    .post( async (req, res) => {
        try {
            // const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const user = new User({
                email: req.body.email,
                password: hashedPassword,
                nickname: req.body.nickname
              });
              console.log(user);
              user
                .save()
                .then((result) => {
                  console.log("Created User");
                })
                .catch((err) => {
                  console.log(err);
                });
              res.redirect("/login");
        } catch  {
            res.status(500).send();
        }

    })



module.exports = signupRouter;