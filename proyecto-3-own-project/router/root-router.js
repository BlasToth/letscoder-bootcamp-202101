const express = require("express");
const rootRouter = express.Router();
const API_KEY = process.env.API;
const API_KEY_S = process.env.API_S;
const fetch = require("node-fetch");

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

rootRouter.route("/re")
.post((req, res) => {
  console.log(req.body);
  const searchExp = req.body.v1;
  Promise.all([
    fetch(
      `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchExp}?key=${API_KEY_S}`
    ),
    fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=1&q=${searchExp}`
    ),
  ])
    .then(function (responses) {
      // Get an object from each of the responses
      return Promise.all(
        responses.map(function (response) {
          return response.json();
        })
      );
    })
    .then((data) => {
      // Work with both sets of data
      const fetchedGifData = data[1];
      const fetchedSoundData = data[0];
      const fetchedGifUrl = fetchedGifData.data[0].images.downsized_medium.url;

      const audioName = fetchedSoundData[0].hwi.prs[0].sound.audio;
      const dictName = audioName.charAt(0);
      const fetchedSoundUrl = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${dictName}/${audioName}.mp3`;

      const verb = new Verb({
        sourceName: req.body.sourceName,
        v1: req.body.v1,
        v2: req.body.v2,
        v3: req.body.v3,
        wrongV1: req.body.wrongv1,
        wrongV2: req.body.wrongv2,
        wrongV3: req.body.wrongv3,
        // gifUrl: fetchedGifUrl,
        // audioUrl: fetchedSoundUrl,
      });

      console.log(verb);
      verb
        .save()
        .then((result) => {
          console.log("Created Verb");
          result.json({message: "Verb Created"})
        })
        .catch((err) => {
          console.log(err);
        });
      res.redirect("/");
    })
    .catch((error) => {
      // if there's an error
      console.log(error);
    });
});

module.exports = rootRouter;
