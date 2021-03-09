const express = require('express');
const loginRouter = express.Router();

const path = require('path');


// loginRouter
//     .route('/log')
//     .get ((req, res) => {
//         const loginPath = path.join(__dirname, '../admin/login.html')
//     res.sendFile(loginPath);
//     // res.sendFile(__dirname + "../admin/login.html");
// })

loginRouter
    .route('/')
    .get((req, res) => {
        res.render('login', { title: "Login" })
    })

loginRouter
    .route('/')
    .post( (req, res) => {
        console.log(req.body.password)
    })
        



module.exports = loginRouter;