const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = 4000;

app.use(bodyParser.urlencoded( {extended: true} ));

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
const myDataSchema = {
    
}

const myDataModel = mongoose.model("myData", myDataSchema);

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/admin/admin.html");
})


app.post("/", (req, res) => {
    let newData = new Data({
        name: req.body.wrongv1,
    });
    newData.save();
    res.redirect('/');
})

// app.listen(4000, () => {
//     console.log("server is running on 4000");
// })