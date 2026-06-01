const express = require("express");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

const JWT_SECRET = "I love biryani";

const app = express();

app.use(express.json());

const users = [
  {
    username: "raman",
    password: "abc123",
    todos: ["go to school", "go to park"],
  },
  {
    username: "rahul",
    password: "I love biryani",
    todos: ["go to college", "go to park"],
  },
];

app.post("/signup", (req, res) => {
  console.log("request recieved");
  const { username, password } = req.body;

  users.push({ username: username, password: password });

  console.log(users);

  res.json({
    msg: "signed up / user registered successfully",
  });
});

app.post("/signin", (req, res) => {
  const { username, password } = req.body;

  let foundUser = null;

  foundUser = users.find((user) => {
    if (user.username == username && user.password == password) {
      return true;
    }
  });

  if (foundUser) {
    let token = jwt.sign({ username: foundUser.username }, JWT_SECRET);

    console.log(users);
    res.json({ msg: "token generated successfully", token: token });
  } else {
    res.json({ msg: "invalid username or password" });
  }
});

app.use(authMiddleware);

app.get("/me", (req, res) => {
  const username = req.username_token;

  // db call on this username to get their todos
  const userObj = users.find((u) => {
    return u.username == username;
  });

  res.json({ username: userObj.username, password: userObj.password });
});

app.get("/todo", (req, res) => {
  const username = req.username_token;

  // db call on this username to get their todos
  const userObj = users.find((u) => {
    return u.username == username;
  });

  res.json({ todos: userObj.todos });
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
