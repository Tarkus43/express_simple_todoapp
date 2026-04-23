const express = require('express');
const router = express.Router();
const fs = require('fs');
const { isValidTodo } = require('../utils/validators');

router.put('/:id', (req, res) => {
  const id = Number(req.params.id);
  const updatedTodo = req.body;

  if (!isValidTodo(updatedTodo)) {
    return res.status(400).json({ error: 'Invalid todo format' });
  }

  try {
    fs.readFile('todos.json', 'utf-8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading todos' });
      }

      try {
        const todoList = JSON.parse(data);
        const index = todoList.todos.findIndex(todo => todo.id === id);
        
        if (index === -1) {
          return res.status(404).json({ error: 'Todo not found' });
        }

        updatedTodo.id = id;
        updatedTodo.completed = Boolean(updatedTodo.completed);
        todoList.todos[index] = updatedTodo;

        fs.writeFile('todos.json', JSON.stringify(todoList), (err) => {
          if (err) {
            return res.status(500).json({ error: 'Error updating todo' });
          }
          res.json(todoList.todos[index]);
        });
      } catch (e) {
        res.status(500).json({ error: 'Error parsing todos' });
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;