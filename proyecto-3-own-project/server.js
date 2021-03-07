require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;
const verbs = require("./router/verb-router");
const logins = require("./router/login-router");
const fetch = require("node-fetch");
const API_KEY = process.env.API;
const API_KEY_S = process.env.API_S;

app.use(bodyParser.urlencoded({ extended: true }));

// connect to DB with mongoose
mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((result) => {
    app.listen(port, () => {
      // we only start listening when the connection is complete
      console.log(`Server is running on ${port}`);
    });
  })
  .catch((err) => {
    console.log(`THERE WAS AN ERROR: ${err.message}`);
  });

// static files
app.use(express.static("public"));
app.use("/css", express.static(__dirname + "public/css"));

// register view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // res.sendFile(__dirname + "/admin/admin.html");
  Verb.find({}, (err, verbs) => {
    if (err) {
      res.status(404).send(err.response.data);
    } else {
      const showVerbs = verbs;
      res.render("index", { title: "Home", showVerbs });
    }
  });
});

// app.get("/verbs/create", (req, res) => {
//     res.render('create-verbs', { title: 'Create verbs' })
// })

app.post("/log", (req, res) => {
  console.log(req.body);
  const loginUser = new Login({
    email: req.body.email,
    password: req.body.password,
    nickname: req.body.nickname,
  });
  console.log(loginUser);
  loginUser
    .save()
    .then((result) => {
      console.log("Created USER");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("login/log");
});

app.post("/", (req, res) => {
  console.log(req.body);
  getGifFetch();
  // Gif fetch start
  function getGifFetch() {
    const searchExp = req.body.v1;
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&limit=1&q=${searchExp}`;
    fetch(url, {
      method: "GET",
    })
      .then((response) => {
        if (response.ok) {
          console.log(response);
          return response.json();
        }
      })
      .then((data) => {
        const fetchedGifUrl = data.data[0].images.downsized_medium.url;

        getSoundFetch();
        // Sound fetch start
        function getSoundFetch() {
          const searchExp = req.body.v1;
          const url = `https://www.dictionaryapi.com/api/v3/references/collegiate/json/${searchExp}?key=${API_KEY_S}`;
          fetch(url, {
            method: "GET",
          })
            .then((response) => {
              if (response.ok) {
                //   console.log(response);
                return response.json();
              }
            })
            .then((data) => {
              const audioName = data[0].hwi.prs[0].sound.audio;
              const dictName = audioName.charAt(0);
              const fetchedAudioUrl = `https://media.merriam-webster.com/audio/prons/en/us/mp3/${dictName}/${audioName}.mp3`;
              console.log(fetchedAudioUrl);

              const verb = new Verb({
                sourceName: req.body.sourceName,
                v1: req.body.v1,
                v2: req.body.v2,
                v3: req.body.v3,
                wrongV1: req.body.wrongv1,
                wrongV2: req.body.wrongv2,
                wrongV3: req.body.wrongv3,
                gifUrl: fetchedGifUrl,
                audioUrl: fetchedAudioUrl
              });
              console.log(verb);
              verb
                .save()
                .then((result) => {
                  console.log("Created Verb");
                })
                .catch((err) => {
                  console.log(err);
                });
              res.redirect("/");
            });
        }
        // Sound fetch end

      });
  }
  // Gif fetch end
});

app.use("/verbs", verbs);

app.use("/login", logins);

app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Not found" });
});
