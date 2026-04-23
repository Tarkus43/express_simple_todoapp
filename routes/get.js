const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
    console.log('Received GET request for all todos');

    try {
        fs.readFile('todos.json', 'utf8', (err, data) => {
        todos = JSON.parse(data);
        console.log('Read todos.json successfully');
        res.json(JSON.stringify(todos));
        });
    } 
    catch (error) {
        console.error(chalk.red('Error reading todos.json:'), error);
        res.status(500).json({error: 'Internal server error' });
    }
    
});

router.get('/:id', (req, res) => {
  console.log(`Received GET request for todo with id: ${req.params.id}`);

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
          console.log(`Todo with id ${idToGet} not found`);
          return res.status(404).json({ error: 'Todo not found' });
        }

        console.log(`Found todo with id ${idToGet}:`, todo);
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