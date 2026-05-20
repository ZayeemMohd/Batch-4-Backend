let todoArr = ["go to gym", "go to college"];

function addTodo(todo) {
  todoArr.push(todo);
}

function printTodo() {
  todoArr.forEach((todo) => {
    console.log(todo);
  });
}

function deleteTodo(del_todo) {
  const filteredTodo = todoArr.filter((todo) => {
    return del_todo !== todo;
  });

  todoArr = [...filteredTodo];
}

addTodo("go to market");
deleteTodo("go to gym");
printTodo();
