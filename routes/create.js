const express = require('express');
const router = express.Router();
const fs = require('fs');
const { isValidTodo } = require('../utils/validators');

router.post('/', (req, res) => {
  const todo = req.body
  if (!isValidTodo(todo)) {
    return res.status(400).json({ error: 'Invalid todo format' });
  }

  try {
    fs.readFile('todos.json', 'utf-8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading todos' });
      }

      try {
        const todoList = JSON.parse(data);
        todoList.todos.push(todo);

        fs.writeFileSync('todos.json', JSON.stringify(todoList));
        res.json(todoList);
      } catch (e) {
        res.status(500).json({ error: 'Error parsing todos' });
      }
    });
  } catch (err) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

module.exports = router