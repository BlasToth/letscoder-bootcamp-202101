require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const port = process.env.PORT;
const DB_URL = process.env.DB_URL;
const verbs = require("./router/verb-router");
const signups = require("./router/signup-router");
const logins = require("./router/login-router");
const roots = require("./router/root-router");
const jwt = require("jsonwebtoken");
const authenticateToken = require("./middlewares.js");
const cors = require("cors");
const path = require("path");


app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use('/favicon.ico', express.static('public/favicon.ico'));
app.use(express.json());


// deprecation
mongoose.set('useFindAndModify', false);

// connect to DB with mongoose
mongoose
  .connect(`${DB_URL}`, {
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

// routes
app.use("/api/", roots);
app.use("/api/verbs",  verbs);
app.use("/api/signup", signups);
app.use("/api/login",  logins); 
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
} 
else {
  app.get("/api/", (req, res) => {
    res.send("API is running");
  });
}


