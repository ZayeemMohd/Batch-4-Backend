const express = require("express");
const bcrypt = require("bcrypt");
const { z } = require("zod");

const mongoose = require("mongoose");
const { TodoModel, UserModel } = require("./utils/db.js");

const jwt = require("jsonwebtoken");
const JWT_SECRET = "I love biryani";

const authMiddleware = require("./middleware/authMiddleware.js");

mongoose.connect(
  "mongodb+srv://bakrid_user:bakrid_2026@bakrid-cluster.zdbxgvu.mongodb.net/todo_app",
);

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  console.log("request recieved");

  const requiredBody = z.object({
    email: z.email(),
    password: z.string().min(6),
    username: z.string().min(2).max(100),
  });

  const parsedData = requiredBody.safeParse(req.body);

  if (!parsedData.success) {
    res.json({
      msg: "invlaid input format",
      error: parsedData.error,
    });
    return;
  }

  const { username, password, email } = req.body;

  const hashedPassword = await bcrypt.hash(password, 5);

  const feedback = await UserModel.create({
    username: username,
    password: hashedPassword,
    email: email,
  });

  console.log("msg from db: ", feedback);

  res.json({
    msg: "signed up / user registered successfully",
  });
});

app.post("/signin", async (req, res) => {
  try {
    const { username, password } = req.body;

    const foundUser = await UserModel.findOne({
      username: username,
    });

    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (passwordMatch) {
      let token = jwt.sign({ id: foundUser._id.toString() }, JWT_SECRET);
      res.json({ msg: "token generated successfully", token: token });
    } else {
      throw error;
    }
  } catch (error) {
    console.log(error);
    res.json({ msg: "invalid username or password" });
  }
});

app.get("/me", authMiddleware, async (req, res) => {
  // we are getting id after extracting and verifing the token
  const user_id = req.username_id;

  // db call on this username to get their todos
  const userObj = await UserModel.findById(user_id);

  res.json({
    username: userObj.username,
    password: userObj.password,
    email: userObj.email,
  });
});

app.get("/todo", authMiddleware, async (req, res) => {
  // we are getting id after extracting and verifing the token
  const user_id = req.username_id;

  // db call on this username to get their todos
  const todoObj = await TodoModel.find({
    userId: user_id,
  });

  res.json({ todos: todoObj });
});

app.post("/todo", authMiddleware, (req, res) => {
  res.json({
    msg: "todo added successfully",
  });
});

app.put("/todo/:id", authMiddleware, (req, res) => {
  res.json({
    msg: "todo updated successfully",
  });
});

app.delete("/todo/:id", authMiddleware, (req, res) => {
  res.json({
    msg: "todo deleted successfully",
  });
});

const port = 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
