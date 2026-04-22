const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  try {
    fs.readFile('todos.json', 'utf8', (err, data) => {
      todos = JSON.parse(data);
      console.log(todos);
      res.json(JSON.stringify(todos));
    });
  } 
  catch (error) {
    console.error(chalk.red('Error reading todos.json:'), error);
    res.status(500).json({error: 'Internal server error' });
  }
    
});

router.get('/:id', (req, res) => {
  const idToGet = parseInt(req.params.id, 10);
  try {
    fs.readFile('todos.json', 'utf8', (err, data) => {
      if (err) {
        return res.status(500).json({ error: 'Error reading todos' });
      }
      try {
        const todoList = JSON.parse(data);
        const todo = todoList.todos.find(todo => todo.id === idToGet);
        if (!todo) {
          return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(todo);
      } catch (e) {
        res.status(500).json({ error: 'Error parsing todos' });
      }
    });
  } catch (error) {
    console.error(chalk.red('Error reading todos.json:'), error);
    res.status(500).json({error: 'Internal server error' });
  }
});

module.exports = router;