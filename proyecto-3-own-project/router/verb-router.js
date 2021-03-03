const express = require('express');
const verbRouter = express.Router();
const Verb = require('../models/verb-model');

verbRouter
    .route('/verbs')
    .get((req, res) => {
        Verb.find({}, (err, verbs) => {
            if (err) {
                res.status(404).send(err.response.data);
            } else {
                res.json(verbs);
            }
        })
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