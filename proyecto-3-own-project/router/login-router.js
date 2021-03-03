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
        Login.find({}, (err, logins) => {
            if (err) {
                res.status(404).send(err.response.data);
            } else {
                // res.json(logins);
                res.send("LOGIN")
            }
        })
    })



module.exports = loginRouter;