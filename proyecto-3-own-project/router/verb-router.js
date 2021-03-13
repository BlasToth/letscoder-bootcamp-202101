const express = require('express');
const verbRouter = express.Router();
const Verb = require('../models/verb-model');

// everything inside /verbs
verbRouter
.route('/verbs')
.get((req, res) => {
    Verb.find({}, (err, verbs) => {
        if (err) {
            res.status(404).send(err.response.data);
        } else {
           res.send(verbs);
        }
    })
})

verbRouter
.route('/answers')
.get((req, res) => {
    Verb.find({}, (err, verbs) => {
        if (err) {
            res.status(404).send(err.response.data);
        } else {
            const randomVerb = (verbs[Math.floor(Math.random() * verbs.length)]);
            const { sourceName, v1, v2, v3, wrongV1, wrongV2, wrongV3 } = randomVerb;
            console.log(v1, v2)
             const answers = [sourceName, v1, v2, v3, wrongV1, wrongV2, wrongV3]
            res.send(answers)
        }
    })
           
    
   
          
})

verbRouter
    .route('/create')
    .get((req, res) => {
        
        res.render('create-verbs', { title: "Create a verb" })
    })

verbRouter
.route('/oneverb')
.get((req, res) => {
    Verb.find({}, (err, verbs) => {
        if (err) {
            res.status(404).send(err.response.data);
        } else {
            res.json(verbs[2]);
        }
    })
})

verbRouter
.route('/onerandomverb')
.get((req, res) => {
    Verb.find({}, (err, verbs) => {
        if (err) {
            res.status(404).send(err.response.data);
        } else {
            res.json(verbs[Math.floor(Math.random() * verbs.length)]);
        }
    })
})

verbRouter
.route('/oneverb/sourcename')
.get((req, res) => {
    Verb.find({}, (err, verbs) => {
        if (err) {
            res.status(404).send(err.response.data);
        } else {
            res.json(verbs[2].sourceName);
        }
    })
})


module.exports = verbRouter;