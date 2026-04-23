const fs = require('fs');

const toggleCompleted = (id) => {
  try {
    const data = fs.readFileSync('todos.json', 'utf-8');
    const todoList = JSON.parse(data);
    const index = todoList.todos.findIndex(todo => todo.id === id);
    
    if (index === -1) {
      return null;
    }

    todoList.todos[index].completed = !todoList.todos[index].completed;

    fs.writeFileSync('todos.json', JSON.stringify(todoList));
    
    return todoList.todos[index];
  } catch (err) {
    console.error('Error toggling todo:', err);
    return null;
  }
};

module.exports = toggleCompleted;