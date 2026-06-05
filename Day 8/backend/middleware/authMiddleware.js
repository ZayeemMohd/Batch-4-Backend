const jwt = require("jsonwebtoken")
const JWT_SECRET = "I love biryani";


const authMiddleware = (req, res, next) => {
  const token = req.headers.token;

  const foundUser = jwt.verify(token, JWT_SECRET);

  if (foundUser.id) {
    req.username_id = foundUser.id;
    next();
  } else {
    res.json({ msg: "invalid token" });
  }
};

module.exports = authMiddleware;
