require('dotenv').config();
const express = require('express');
const loginRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const path = require('path');
const { JsonWebTokenError } = require('jsonwebtoken');
const authenticateToken = require('../middlewares');

loginRouter
    .route('/')
    .get((req, res) => {
        res.render('login', { title: "Login" })
    })

loginRouter
    .route('/')
    .post( (req, res) => {
        User.find({}, (err, users) => {
            if (err) {
                res.status(404).send(err.response.data);
            } else {
            //    res.send(users);
               const authUser = users.find(u => u.email === req.body.email);
               
               if (authUser == null) {
                   return res.status(400).send('Cannot find user');
               }
              
                bcrypt.compare(req.body.password, authUser.password)
                .then((result) => {
                    if (result){
                        const nick = authUser.nickname;
                        const points = authUser.points;
                        
                        // JWT
                        const accessToken = jwt.sign({_id: authUser._id}, process.env.ACCESS_TOKEN_SECRET);
                        res.header('auth-token', accessToken)
                        // .send(`This is the token: ${accessToken}`)

                        // JWT ends
                        // Verb
                        Verb.find({}, (err, verbs) => {
                            if (err) {
                                res.status(404).send(err.response.data);
                            } else {
                               const dbVerbs = verbs;
                               res.redirect("/login/" + authUser._id);
                               
                              
                            }
                        })
                        // Verb end

                    } else {
                        res.send('<h1>Access denied</h1>')
                    }
                }); 
            }
        })
    })

    loginRouter
    .route('/:id')
    .get((req, res) => {
        User.find({}, (err, users) => {
            if (err) {
                res.status(404).send(err.response.data);
            } else {
            const nick = users.nickname;
            const points = users.points;
            res.render('user', { title: "Login", nick, points })
               
            }
        })


    })

        // res.send(req.params.id)
        
    

    
module.exports = loginRouter;