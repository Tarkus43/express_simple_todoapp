const fs = require('fs');
const path = require('path');

function getLastId() {
  const filePath = path.resolve(__dirname, '..', 'todos.json');
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const todoList = JSON.parse(data);

    if (!Array.isArray(todoList) || todoList.length === 0) {
      return -1;
    }

    let maxId = -1;
    for (const todo of todoList) {
      const id = Number(todo && todo.id) || 0;
      if (id > maxId) maxId = id;
    }

    return maxId;
  } catch (err) {
    console.error('Error reading or parsing todos.json:', err);
    return 0;
  }
}

module.exports = getLastId;