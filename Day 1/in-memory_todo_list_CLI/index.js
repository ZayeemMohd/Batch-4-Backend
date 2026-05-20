const { program } = require("commander");

let todoArr = ["go to gym"];

program
  .name("TODO CLI")
  .description("CLI based TODO application to solve your daily life problems")
  .version("1.0.0");

program
  .command("add")
  .description("Command to add a new todo with an argument")
  .argument("<new_todo>", "new task variable")
  .action(() => {
    console.log("add command called");
  });

program
  .command("show")
  .description("Command to show all the todos")
  .action(() => {
    console.log(todoArr);
  });

program
  .command("delete")
  .description("Command to delete an existing todo")
  .argument("<todo_name>", "jo delete karna hai wo")
  .action((todo_name) => {
    let filteredTodo = todoArr.filter((todo) => {
      return todo_name !== todo;
    });

    todoArr = [...filteredTodo];
    console.log("deleted");

    console.log("current todo array ki value after delteing", todoArr);
  
  });

program.parse();
