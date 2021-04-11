require('dotenv').config();
const express = require('express');
const loginRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const { JsonWebTokenError } = require('jsonwebtoken');
const { authenticateToken } = require('../middlewares');
const { validateEmail, validatePassword } = require('../validations/validations')

loginRouter
    .route('/')
    .get((req, res) => {
        res.send({message: "Please Log in!"})
    })

loginRouter
    .route('/')
    .post( (req, res) => {
        const {body: {email, password}} = req;
        validateEmail(email);
        validatePassword(password);        
        
        User.find({}, (err, users) => {
            if (err) {
                res.status(404).send(err.response.data);
            } else {
            //    res.send(users);
               const authUser = users.find(u => u.email === req.body.email);
            //    console.log(req.body)
               
               if (authUser == null) {
                   return res.status(400).send('Cannot find user');
               }
              
                bcrypt.compare(req.body.password, authUser.password)
                .then((result) => {
                    if (result){
                        const role = authUser.role;
                        
                        // JWT
                        const accessToken = jwt.sign({
                            _id: authUser._id, 
                            role
                        }, process.env.ACCESS_TOKEN_SECRET);

                        // res.header('auth-token', accessToken)
                        res.json({token: accessToken})

                    } else {
                        res.status(401).send("Acces denied") //json 401
                    }
                }); 
            }
        })
    })

    loginRouter
    .route("/usernick")
    .get(authenticateToken, (req, res) => {
        const userId = req.user._id;
        // console.log(userId + " req.user._id");

        // get actual user to send nickname and points
        User.find({_id: `${userId}`}, (err, user) => {
            if (err) {
                res.status(404).send(err.response.data);
            } else {
           const { points, nickname } = user[0];
        //    console.log(nickname + " " + points)
           
           res.json({userId, points, nickname})
            }
        });

    });

    loginRouter
    .route("/halloffame")
    .get(authenticateToken, (req, res) => {
        User.find({}, (err, users) => {
            if (err) {
                res.status(404).send(err.response.data);
            } else {  
                res.json({users})
            }
        }).select("-email")
        .select("-password")
        .select("-role")
        .limit(10)
        .sort("-points")
    })
    
module.exports = loginRouter;