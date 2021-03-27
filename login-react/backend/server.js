require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const app = express();

app.use(cors());
app.use(express.json());

const posts = [
    {
        username: "Pepito Grillo",
        title: 'Pepipost'
    },
    {
        username: "Jon Nieve",
        title: 'Jonipost'
    }
]


app.use('/login', authenticateToken, (req, res) => {
    const username = "Pepito Grillo"
    const user = { name: username };

    const accToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
    res.json({
        token: accToken
    });
});

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.sendStatus(401).json({message: "No token"});

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403).json({message: "It is not a valid token - ACCESS DENIED"});
        req.user = user;
        next();
    })
}

app.listen(4000, () => console.log('App listening on port 4000'))