const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 4000;
const verbs = require('./router/verb-router');
const login = require('./router/login-router');

app.use(bodyParser.urlencoded( {extended: true} ));

// connect to DB with mongoose
mongoose
.connect(
    "mongodb+srv://bago:BfLExgnD2F19btN5@bcapp.eoazq.mongodb.net/verbs",
    {
     useNewUrlParser: true ,
     useUnifiedTopology: true ,
     useCreateIndex: true
    }
)
.then(result => {
    app.listen(port, () => {
        console.log(`Server is running on ${port}`)
    });
})
.catch(err => {
    console.log(`THERE WAS AN ERROR: ${err.message}`);
});

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/admin/admin.html");
})

app.use("/verbs", verbs);

app.use("/login", login);

