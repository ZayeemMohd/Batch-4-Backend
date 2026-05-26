const express = require("express");
const jwt = require("jsonwebtoken");

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

const generateToken = () => {
  let options = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
  ];

  let token = "";

  for (let i = 0; i < 32; i++) {
    // 0 - 36 options[35]
    token = token + options[Math.floor(Math.random() * options.length)];
  }

  return token;
};

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

app.get("/me", authMiddleware, (req, res) => {
  const username = req.username_token;

  // db call on this username to get their todos
  const userObj = users.find((u) => {
    return u.username == username;
  });

  res.json({ username: userObj.username, password: userObj.password });
});

app.get("/todo", authMiddleware, (req, res) => {
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
