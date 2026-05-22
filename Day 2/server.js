const express = require("express");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "todo.json");

const app = express();

// extract json form body
app.use(express.json());

let todoArr = JSON.parse(fs.readFileSync(filePath, "utf8"));

app.get("/todos", (req, res) => {
  res.json(todoArr);
});

app.post("/todo", (req, res) => {
  todoArr.push(req.body.todo);
  fs.writeFileSync(filePath, JSON.stringify(todoArr));
  res.json({ message: "todo added successfully" });
});

app.delete("/todo", (req, res) => {
  const delTodo = req.body.delTodo;

  todoArr = todoArr.filter((todo) => {
    return delTodo !== todo;
  });

  fs.writeFileSync(filePath, JSON.stringify(todoArr));

  res.json({ message: "todo deleted successfully" });
});

app.put("/todo", (req, res) => {
  const { existingTodo, updateTodo } = req.body;

  todoArr.forEach((todo, index) => {
    if (existingTodo == todo) {
      todoArr.splice(index, 1, updateTodo);
    }
  });

  fs.writeFileSync(filePath, JSON.stringify(todoArr));

  res.json({ message: "todo updated successfully" });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log("server is listening on port 8080");
});
