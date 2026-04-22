const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const fs = require('fs');
const { isValidTodo } = require('./utils/validators');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors(
    {
        origin: ['http://localhost:5000','http://localhost:5000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
));


app.get('/', (req, res) => {
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

app.post('/create', (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Server is running on ${chalk.blue(`http://localhost:${PORT}`)}`);
});

