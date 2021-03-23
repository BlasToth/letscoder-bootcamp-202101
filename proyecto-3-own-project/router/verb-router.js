const express = require("express");
const verbRouter = express.Router();
const Verb = require("../models/verb-model");
const shuffle = require("../utils/shuffle");
const authenticateToken = require("../middlewares.js");
const jwt = require("jsonwebtoken");
// const app = express();

// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

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
      console.log("This is: " + response[1]);
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
    return res.send(verbs);
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
            return el._id == "6050f7da172f0e3eb05408b7"; //hardcoded ID --> TODO change it to dynamic
          });
          // console.log(filteredUser)
          const filteredKnownVerbsOfTheUser = filteredUser[0].knownVerbs;
          // console.log("ID: " + filteredKnownVerbsOfTheUser); // 3 ID
          const slicedId = filteredKnownVerbsOfTheUser.slice(",");
          console.log(slicedId);
          const verbsToArray = [...verbs];
          let verbsToArrayId = [];
          for (let i = 0; i < verbsToArray.length; i++) {
            verbsToArrayId.push(verbsToArray[i]._id);
          }
          // console.log(verbsToArrayId)

          // console.log(verbsToArray) -- length: 6

          let difference = verbsToArrayId.filter(
            (el) => !slicedId.includes(el)
          );
          // console.log(difference);
          // Find the verbs with these new IDs
          Verb.find({_id: difference}, (err, verbs) => {
            if (err) {
              res.status(404).send(err.response.data);
            } else {
              const filteredVerbs = verbs
              console.log(`new verbs: ${filteredVerbs}` )
            }
          });
          // Find ends here
        }
      });

      // filter ends
      const randomVerb = verbs[Math.floor(Math.random() * verbs.length)];
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
      res.send(showVForm);
    }
  });
});
// FE sends back the answer
verbRouter.route("/check").post(authenticateToken, (req, res) => {
  const userId = req.user._id;
  // console.log(req.user._id);
  console.log(req.body);
  const response = req.body;

  // check if the answer is correct
  Verb.find({ _id: response[1] }, (err, verb) => {
    if (err) {
      res.status(404).send(err.response.data);
    } else {
      if (response[0] === "case 0" && response[2] === verb[0].v1) {
        addPoints(userId);
        addVerbToKnownArray(userId, response);
        // Verdict
        res.json({ verdict: true });
        // TODO remove the verb from the array to avoid repetition
      } else if (response[0] === "case 1" && response[2] === verb[0].v2) {
        addPoints(userId);
        addVerbToKnownArray(userId, response);
        res.json({ verdict: true });
        // TODO remove the verb from the array to avoid repetition
      } else if (response[0] === "case 2" && response[2] === verb[0].v3) {
        addPoints(userId);
        addVerbToKnownArray(userId, response);
        res.json({ verdict: true });
      } else {
        res.json({ verdict: false });
      }
    }
  });
});

verbRouter.route("/onerandomverb").get(authenticateToken, (req, res) => {
  Verb.find({}, (err, verbs) => {
    if (err) {
      res.status(404).send(err.response.data);
    } else {
      res.json(verbs[Math.floor(Math.random() * verbs.length)]);
    }
  });
});

module.exports = verbRouter;
