require('dotenv').config();
const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const app = express();

app.use(cors());
app.use(express.json());

const users = [{
    name: "Mike",
    password: "mike"
}];

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

app.use('/login', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = { name: req.body.username, password: hashedPassword }
        users.push(user);
        console.log(user)
        return user
    } catch {
        res.status(500).send();
    }
const user2 = user;
    
    
    const accToken = jwt.sign(user2, process.env.ACCESS_TOKEN_SECRET)
    res.json({
        username: user2.name,
        token: accToken
    });
});

app.post('/users/login', async (req, res) => {
    const user = users.find(user => user.name === req.body.username)
    if (user == null) {
        return res.status(400).send("Cannot fond user")
    }
    try {
       if (await bcrypt.compare(req.body.password, user.password)){
           res.send("success")
       } else {
           res.send("Not allowed")
       }
    } catch {
        res.status(500).send("")
    }
})

app.get('/posts', (req, res) =>{
    const username = req.body.username;
    console.log("POSTS: " + username)
    res.json(posts.filter(post => post.username === username))
})

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