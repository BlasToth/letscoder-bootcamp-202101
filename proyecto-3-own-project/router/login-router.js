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
        res.send("Login")
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
                        const accessToken = jwt.sign({
                            _id: authUser._id, 
                            nickname: authUser.nickname
                        }, process.env.ACCESS_TOKEN_SECRET);

                        res.header('auth-token', accessToken)
                        res.send({token: accessToken})

                        // JWT ends
                        // Verb
                        // Verb.find({}, (err, verbs) => {
                        //     if (err) {
                        //         res.status(404).send(err.response.data);
                        //     } else {
                        //        const dbVerbs = verbs;
                            //    res.redirect("/login/" + authUser._id);
                               
                              
                        //     }
                        // })
                        // Verb end

                    } else {
                        res.status(401).send("Acces denied") //json 401
                    }
                }); 
            }
        })
    })

    // loginRouter
    // .route('/:id')
    // .get( (req, res) => {
    //     const currentUserId = req.params.id;
    //     User.find({_id: currentUserId}, (err, user) => {
    //         if (err) {
    //             res.status(404).send(err.response.data);
    //         } else {
    //             // console.log("HERE IS THE ID: " + currentUserId)
    //             // console.log(user[0].nickname)
    //         const nick = user[0].nickname;
    //         const points = user[0].points;
            
    //         res.render('user', { title: "Login", nick, points })
               
    //         }
    //     })


    // })

        
        
    

    
module.exports = loginRouter;