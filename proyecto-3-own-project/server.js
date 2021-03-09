require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;
const verbs = require("./router/verb-router");
const signups = require("./router/signup-router");
const logins = require("./router/login-router");
const roots = require("./router/root-router");



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

// routes
app.use("/", roots);
app.use("/verbs", verbs);
app.use("/signup", signups);
app.use("/login", logins); 

// not found
app.use((req, res) => {
  res.status(404).render("404", { title: "404 - Not found" });
});
