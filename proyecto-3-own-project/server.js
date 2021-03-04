require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;
const verbs = require('./router/verb-router');
const logins = require('./router/login-router');
const loginRouter = require("./router/login-router");

app.use(bodyParser.urlencoded( {extended: true} ));

// connect to DB with mongoose
mongoose
.connect(
    DB_URL,
    {
     useNewUrlParser: true ,
     useUnifiedTopology: true ,
     useCreateIndex: true
    }
)
.then(result => {
    app.listen(port, () => {        // we only start listening when the connection is complete
        console.log(`Server is running on ${port}`)
    });
})
.catch(err => {
    console.log(`THERE WAS AN ERROR: ${err.message}`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/admin/admin.html");
})

app.post("/log", (req, res) => {
    console.log(req.body);
    const loginUser = new Login({
        email: req.body.email,
        password: req.body.password,
        nickname: req.body.nickname
    }) 
    console.log(loginUser)
        loginUser
        .save()
        .then(result => {
            console.log('Created USER');
        })
        .catch(err => {
            console.log(err);
        })
        res.redirect('login/log');
})

app.post("/", (req, res) => {
        console.log(req.body)
        const verb = new Verb({
            sourceName: req.body.sourceName,
            v1: req.body.v1,
            v2: req.body.v2,
            v3: req.body.v3,
            wrongV1: req.body.wrongv1,
            wrongV2: req.body.wrongv2,
            wrongV3: req.body.wrongv3
        })
        console.log(verb)
        verb
        .save()
        .then(result => {
            console.log('Created Verb');
        })
        .catch(err => {
            console.log(err);
        })
        res.redirect('/');
    })

app.use("/verbs", verbs);

app.use("/login", logins);

