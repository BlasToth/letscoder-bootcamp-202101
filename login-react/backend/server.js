require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(express.json());


app.use('/login', (req, res) => {
    const username = "Pepito Grillo"
    const user = { name: username };

    const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({
        token: token
    });
});

app.listen(4000, () => console.log('App listening on port 4000'))