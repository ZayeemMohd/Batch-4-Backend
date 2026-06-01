const authMiddleware = (req, res, next) => {
  const token = req.headers.token;

  const foundUser = jwt.verify(token, JWT_SECRET);

  if (foundUser.username) {
    req.username_token = foundUser.username;
    next();
  } else {
    res.json({ msg: "invalid token" });
  }
};

module.exports = authMiddleware;
