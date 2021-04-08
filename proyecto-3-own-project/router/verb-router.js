const express = require("express");
const verbRouter = express.Router();
const Verb = require("../models/verb-model");
const shuffle = require("../utils/shuffle");
const { authenticateToken } = require("../middlewares.js");
const jwt = require("jsonwebtoken");


function addPoints(currentUserId) {
  // add points to the counter
  // console.log(currentUserId)
  User.find({ _id: currentUserId }, (err, user) => {
    if (err) {
      res.status(404).send(err.response.data);
    } else {
      // console.log("This is User.points from Verb: " + user[0].points)
      userPoints = user[0].points;
      User.findOneAndUpdate(
        { _id: currentUserId },
        { points: userPoints + 5 }
      ).then(() => {
        User.findOne({ _id: currentUserId });
      });
    }
  });
}

function addVerbToKnownArray(currentUserId, response) {
  // add verb to the knownVerbs array
  // console.log(currentUserId)
  User.find({ _id: currentUserId }, (err, user) => {
    if (err) {
      res.status(404).send(err.response.data);
    } else {
      // console.log("This is User.points from Verb: " + user[0].points)
      // console.log("This is: " + response[1]);
      userknownVerbs = response[1];
      User.findOneAndUpdate(
        { _id: currentUserId },
        { $addToSet: { knownVerbs: userknownVerbs } }
      ).then(() => {
        User.findOne({ _id: currentUserId });
      });
    }
  });
}

// everything inside /verbs
// public route
verbRouter.route("/verbs").get((req, res) => {
  Verb.find({}, (err, verbs) => {
    if (err) {
      return res.status(404).send(err.message);
    }
    // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
    return res.send(verbs);
  });
});

verbRouter
.route("/knownverbs")
.get( authenticateToken, (req, res) => {
  const userId = req.user._id;
  // console.log(userId + " req.user._id");
    // get actual user to send knownVerbs array
    User.find({_id: `${userId}`}, (err, user) => {
        if (err) {
            res.status(404).send(err.response.data);
        } else {
          const arrayOfKnownVerbs = user[0].knownVerbs;
        // console.log(arrayOfKnownVerbs)
        Verb.find({ _id: { $in: arrayOfKnownVerbs } }, (err, verbs) => {
          if (err) {
            res.status(404).send(err.response.data);
          } else {
            // console.log(verbs)
            if (verbs.length === 0) {
              res.json({message: "You have no verbs yet! Try the Quiz!"})
            } else res.json({verbs})
          }
        });
      
        }
    });
});

// send possible answers to FE
verbRouter.route("/answers").get(authenticateToken, (req, res) => {
  Verb.find({}, (err, verbs) => {
    if (err) {
      res.status(404).send(err.response.data);
    } else {
      // TODO filter verbs
      User.find({}, (err, users) => {
        if (err) {
          res.status(404).send(err.response.data);
        } else {
          const usersToArray = [...users];
          // console.log(usersToArray)
          const filteredUser = usersToArray.filter((el) => {
            // console.log(req.user)
            return el._id == req.user._id; 
          });
          // console.log(filteredUser)
          const filteredKnownVerbsOfTheUser = filteredUser[0].knownVerbs;
          // console.log("ID: " + filteredKnownVerbsOfTheUser); // 3 ID
          const slicedId = filteredKnownVerbsOfTheUser.slice(",");
          // console.log(slicedId);
          const verbsToArray = [...verbs];
          
          let verbsToArrayId = [];
          for (let i = 0; i < verbsToArray.length; i++) {
            verbsToArrayId.push(verbsToArray[i]._id);
          }
          // console.log(verbsToArrayId)

          // console.log(verbsToArray) -- length: 5

          let difference = verbsToArrayId.filter(
            (el) => !slicedId.includes(el)
          );
          // console.log(difference);
          if (difference.length === 0) {
            // console.log("No more verbs")
            res.json({message: "Congratulations! You have learnt all the irregular verbs!"});
          } else {
            // Find the verbs with these new IDs
            Verb.find({ _id: difference }, (err, verbs) => {
              if (err) {
                res.status(404).send(err.response.data);
              } else {
                const filteredVerbs = verbs;
                // console.log(filteredVerbs)
  
                const randomVerb =
                  filteredVerbs[Math.floor(Math.random() * filteredVerbs.length)];
                  // console.log(randomVerb)
                const {
                  sourceName,
                  v1,
                  v2,
                  v3,
                  wrongV1,
                  wrongV2,
                  wrongV3,
                  _id,
                  gifUrl,
                  audioUrl,
                } = randomVerb;
  
                // send random v form
                const vForms = [v1, v2, v3];
                randomVFormNum = Math.floor(Math.random() * 3);
                // subtract one from the forms
                let showVForm = [];
                if (randomVFormNum === 0) {
                  let answersForCase0 = wrongV1.split(", ");
                  answersForCase0.push(v1);
                  shuffle(answersForCase0);
                  showVForm.push("case 0", v2, v3, _id, answersForCase0);
                } else if (randomVFormNum === 1) {
                  let answersForCase1 = wrongV2.split(", ");
                  answersForCase1.push(v2);
                  shuffle(answersForCase1);
                  showVForm.push(v1, "case 1", v3, _id, answersForCase1);
                } else if (randomVFormNum === 2) {
                  let answersForCase2 = wrongV3.split(", ");
                  answersForCase2.push(v3);
                  shuffle(answersForCase2);
                  showVForm.push(v1, v2, "case 2", _id, answersForCase2);
                }
                // send random v form end
                showVForm.push(gifUrl, audioUrl, sourceName);
                // res.header('auth-token', accessToken)
                res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
                res.json({showVForm});
              }
            });
            // Find ends here
            
          }
        }
      });

      // filter ends
    }
  });
});
// FE sends back the answer
verbRouter.route("/check").post(authenticateToken, (req, res) => {
  const userId = req.user._id;
  // console.log(req.user._id + " req.user._id");
  // console.log(req.body + " req.body");
  const response = req.body.body;
  // console.log(response[1] + " resp1")

  // check if the answer is correct
  Verb.findById({ _id: `${response[1]}` }, (err, verb) => {
    // console.log(verb)
    if (err) {
      res.status(404).send(err.response.data);
    } else {
      if (response[0] === "case 0" && response[2] === verb.v1) {
        addPoints(userId);
        addVerbToKnownArray(userId, response);
        // Verdict
        res.json({ verdict: true });
        // TODO remove the verb from the array to avoid repetition
      } else if (response[0] === "case 1" && response[2] === verb.v2) {
        addPoints(userId);
        addVerbToKnownArray(userId, response);
        res.json({ verdict: true });
        // TODO remove the verb from the array to avoid repetition
      } else if (response[0] === "case 2" && response[2] === verb.v3) {
        addPoints(userId);
        addVerbToKnownArray(userId, response);
        res.json({ verdict: true });
      } else {
        res.json({ verdict: false });
      }
    }
  });
});

verbRouter.route("/onerandomverb").get( (req, res) => {
  Verb.find({}, (err, verbs) => {
    if (err) {
      res.status(404).send(err.response.data);
    } else {
      res.json(verbs[Math.floor(Math.random() * verbs.length)]);
    }
  });
});

module.exports = verbRouter;
