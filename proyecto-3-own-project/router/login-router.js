const express = require('express');
const loginRouter = express.Router();
const Login = require('../models/login-model');
const path = require('path');
const bcrypt = require('bcrypt');


loginRouter
    .route('/log')
    .get ((req, res) => {
        const loginPath = path.join(__dirname, '../admin/login.html')
    res.sendFile(loginPath);
    // res.sendFile(__dirname + "../admin/login.html");
})

loginRouter
    .route('/')
    .get((req, res) => {
        res.render('login', { title: "Login" })
    })

loginRouter
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



module.exports = loginRouter;