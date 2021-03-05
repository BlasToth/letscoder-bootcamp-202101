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
        res.render('login')
    })



module.exports = loginRouter;