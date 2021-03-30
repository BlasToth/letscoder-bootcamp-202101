const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[3];
    if (token == null) return res.status(401).send("Please login!");
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).send("Invalid token");
      req.user = user;
      next();
    })
  }

  module.exports = authenticateToken;