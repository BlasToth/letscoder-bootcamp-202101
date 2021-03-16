const express = require('express');
const verbRouter = express.Router();
const Verb = require('../models/verb-model');
const shuffle = require('../utils/shuffle')

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
            const { sourceName, v1, v2, v3, wrongV1, wrongV2, wrongV3, _id, gifUrl, audioUrl } = randomVerb;
            
            // send random v form
            const vForms = [v1, v2, v3];
            randomVFormNum = Math.floor(Math.random() * 3);
            // subtract one from the forms
            let showVForm = []
            if (randomVFormNum === 0) {
                let answersForCase0 = wrongV1.split(", ");
                answersForCase0.push(v1);
                shuffle(answersForCase0);
                showVForm.push("case 0", v2, v3, _id, answersForCase0)
            } else if (randomVFormNum === 1) {
                let answersForCase1 = wrongV2.split(", ");
                answersForCase1.push(v2);
                shuffle(answersForCase1);
                showVForm.push(v1, "case 1", v3, _id, answersForCase1)
            } else if (randomVFormNum === 2) {
                let answersForCase2 = wrongV3.split(", ");
                answersForCase2.push(v3);
                shuffle(answersForCase2);
                showVForm.push(v1, v2, "case 2", _id, answersForCase2);
            }
            // send random v form end
            showVForm.push(gifUrl, audioUrl, sourceName);
            console.log(showVForm)
            res.send(showVForm);
        }
    })      
})
// FE sends back the answer
verbRouter
    .route('/check')
    .post((req, res) => {
       const response = req.body.decide;
       console.log(response);
       // TODO check if the answer is correct
        Verb.find({_id : response[1]}, (err, verb) => {
            if (err) {
                res.status(404).send(err.response.data);
            } else {
                if (response[0] === "case 0" && response[2] === verb[0].v1) {
                    res.json({verdict: true});
                    // TODO add points to the counter
                    // TODO remove the verb from the array to avoid repetition
                } else if (response[0] === "case 1" && response[2] === verb[0].v2) {
                    res.json({verdict: true});
                    // TODO add points to the counter
                    // TODO remove the verb from the array to avoid repetition
                } else if (response[0] === "case 2" && response[2] === verb[0].v3) {
                    res.json({verdict: true});
                } else {
                    res.json({verdict: false});
                }

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


module.exports = verbRouter;