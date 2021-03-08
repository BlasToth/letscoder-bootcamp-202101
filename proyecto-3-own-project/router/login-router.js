const express = require('express');
const loginRouter = express.Router();
const Login = require('../models/login-model');
const path = require('path');

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
    .post((req, res) => {
        const user = new User({
            email: req.body.email,
            password: req.body.password,
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
    })



module.exports = loginRouter;