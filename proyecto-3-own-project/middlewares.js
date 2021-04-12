const jwt = require("jsonwebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[3];
    if (token == null) return res.status(401).send("Please login!");
    // console.log(token)
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).send("Invalid token");
      // console.log(token)
      req.user = user;
      // console.log(user)
      next();
    })
  }

  function authenticateAdmin(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).send("Please login with an addmin role!");
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) return res.status(403).send("Invalid token to access admin role");

      if (user.role !== "admin") return res.status(403).send("Only admins!");
      req.user = user;
      next();
    })
  }

  module.exports = {
    authenticateToken,
    authenticateAdmin
  }
