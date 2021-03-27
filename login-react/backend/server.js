const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/login', (req, res) => {
    res.send({
        token: 'test123'
    });
});

app.listen(4000, () => console.log('App listening on port 4000'))