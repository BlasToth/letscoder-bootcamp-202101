const express = require('express');
const loginRouter = express.Router();
const bcrypt = require('bcrypt');

const path = require('path');

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
               console.log(users)
               const authUser = users.find(u => u.email === req.body.email);
               console.log("authUser: " + authUser)
               if (authUser == null) {
                   return res.status(400).send('Cannot find user');
               }
              
                bcrypt.compare(req.body.password, authUser.password)
                .then((result) => {
                    if (result){
                        const nick = authUser.nickname;
                        const points = authUser.points;
                        // Verb
                        Verb.find({}, (err, verbs) => {
                            if (err) {
                                res.status(404).send(err.response.data);
                            } else {
                               const dbVerbs = verbs;
                               res.render('user', { title: `${authUser.nickname}`, nick, dbVerbs, points });
                               ///
                                
                               ///
                            }
                        })
                        // Verb end
                        
                    } else {
                        res.send('Access denied')
                    }
                }); 
               
            }
        })
        // console.log(req.body.email)
        // console.log(req.body.password)
    })
        



module.exports = loginRouter;