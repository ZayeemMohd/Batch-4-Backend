const { program } = require("commander");
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname, "todo.json");

const data = fs.readFileSync(filePath, "utf8");
let existingTodoList = JSON.parse(data);

program
  .name("TODO CLI")
  .description("CLI based todo application with persistent memory")
  .version("1.0.0");

program
  .command("add")
  .description("add new todo to the todo list")
  .argument("<new_todo>", "new todo from user")
  .action((new_todo) => {
    existingTodoList.push(new_todo);
    fs.writeFileSync(filePath, JSON.stringify(existingTodoList));
    console.log("new todo added successfully");
  });

program
  .command("print")
  .description("Print all todos from Todo List")
  .action(() => {
    existingTodoList.forEach((element) => {
      console.log(element);
    });
  });

program
  .command("delete")
  .description("Delete an existing todo")
  .argument("<delete_todo>", "todo which should be deleted")
  .action((delete_todo) => {
    const filteredArray = existingTodoList.filter((existingTodo) => {
      return delete_todo !== existingTodo;
    });
    fs.writeFileSync(filePath, JSON.stringify(filteredArray));
    console.log(delete_todo, "deleted successfully");
  });

program
  .command("update")
  .description("Update an existing todo from todo list")
  .argument("<existing_todo>", "Existing todo which need to be updated")
  .argument("<updated_todo>", "New Updated todo value that need to be updated")
  .action((existing_todo, updated_todo) => {
    let TodoIndex;
    existingTodoList = existingTodoList.filter((todo, index) => {
      if (existing_todo == todo) {
        TodoIndex = index;
        return false;
      } else {
        return true;
      }
    });
    existingTodoList.splice(TodoIndex, 0, updated_todo);

    fs.writeFileSync(filePath, JSON.stringify(existingTodoList));
    console.log(
      "Todo updated successsfully: ",
      existing_todo,
      "->",
      updated_todo,
    );
  });

program.parse();
