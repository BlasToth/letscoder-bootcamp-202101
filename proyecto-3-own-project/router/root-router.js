const express = require("express");
const rootRouter = express.Router();
const API_KEY = process.env.API;
const API_KEY_S = process.env.API_S;
const fetch = require("node-fetch");
const axios = require("axios");

// everything inside /
rootRouter.route("/")
.get((req, res) => {
  Verb.find({}, (err, verbs) => {
    if (err) {
      res.status(404).send(err.response.data);
    } else {
      const showVerbs = verbs;
      res.send({showVerbs})
    }
  });
});


rootRouter.route("/createverb")
.post((req, res) => {
  // console.log(req.body);
  const searchExp = req.body.v1;
  Promise.all([
    axios.get(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchExp}?key=${API_KEY_S}`
    ),
    axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=1&q=${searchExp}`
    ),
  ])
    .then((data) => {
      // console.log(data[0].data)
      // Work with both sets of data
      const fetchedGifData = data[1].data;
      const fetchedSoundData = data[0].data;
      // console.log(fetchedGifData)
      const fetchedGifUrl = fetchedGifData.data[0].images.downsized_medium.url;

      const audioName = fetchedSoundData[0].hwi.prs[0].sound.audio;
      const dictName = audioName.charAt(0);
      const fetchedSoundUrl = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${dictName}/${audioName}.mp3`;

      const verb = new Verb({
        sourceName: req.body.sourceName,
        v1: req.body.v1,
        v2: req.body.v2,
        v3: req.body.v3,
        wrongV1: req.body.wrongV1,
        wrongV2: req.body.wrongV2,
        wrongV3: req.body.wrongV3,
        gifUrl: fetchedGifUrl,
        audioUrl: fetchedSoundUrl,
      });

      console.log(verb);
      verb
        .save()
        .then((result) => {
          console.log("Created Verb");
          // result.json({message: "Verb Created"})
          res.send({verb})
        })
        .catch((err) => {
          console.log(err);
        });
    //   // res.redirect("/");
    })
    .catch((error) => {
      // if there's an error
      console.log(error);
    });
});

rootRouter.route("/deleteverb")
.delete((req, res) => {
  console.log(req.body.idOfTheVerbToBeDeleted.id)
  const idToDelete = req.body.idOfTheVerbToBeDeleted.id;
  Verb.deleteOne({ _id: `${idToDelete}` }, function (err, result) {
    if (err) res.send(err);
    else {
      console.log('Verb deleted')
      res.json({message: `Verb deleted  `})
    }
  });
})

module.exports = rootRouter;