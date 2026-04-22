const express = require('express');
const router = express.Router();
const fs = require('fs');

router.delete('/:id', (req, res) => {
  
  console.log('Received DELETE request for ID:', req.params.id);
  const idToDelete = parseInt(req.params.id, 10);

  fs.readFile('todos.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading todos' });
    }

    try {
      const todoList = JSON.parse(data);
      todoList.todos = todoList.todos.filter(todo => todo.id !== idToDelete);
      console.log('Updated todo list after deletion of ID:', idToDelete);

      fs.writeFileSync('todos.json', JSON.stringify(todoList));
      res.json(todoList);
    } catch (e) {
      res.status(500).json({ error: 'Error parsing todos' });
    }
  });
});

module.exports = router;