const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 4000;

app.use(bodyParser.urlencoded( {extended: true} ));

// connect to DB with mongoose
mongoose
.connect(
    "mongodb+srv://bago:BfLExgnD2F19btN5@bcapp.eoazq.mongodb.net/verbs",
    { useNewUrlParser: true },
    { useUnifiedTopology: true } 
)
.then(result => {
    app.listen(port, () => {
        console.log(`Server is running on ${port}`)
    });
})
.catch(err => {
    console.log(`THERE WAS AN ERROR: ${err.message}`);
});

// create a data schema
const Schema = mongoose.Schema;

const verbsSchema = new Schema({
    sourceName: String,
    v1: String,
    v2: String,
    v3: String,
    wrongV1: String,
    wrongV2: String,
    wrongV3: String
});
// We'll work with this model in our code
// Mongoose makes the name into lower case and makes it plural
const Verb = mongoose.model('Verb', verbsSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/admin/admin.html");
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

app.get("/verbs", (req, res) => {
    Verb.find({}, (err, verbs) => {
        if (err) {
            res.status(404).send(err.response.data);
        }
        res.json(verbs)
    })
})




// Verb.find({v1: 'bleed'}, (error, data) => {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log(data);
//     }
// })

// app.listen(4000, () => {
    //     console.log("server is running on 4000");
    // })