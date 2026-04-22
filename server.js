const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const fs = require('fs');
const { isValidTodo } = require('./utils/validators');
const createTodo = require('./routes/create');
const deleteTodo = require('./routes/delete');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors(
    {
        origin: ['http://localhost:5000','http://localhost:5000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
));

app.use('/create', createTodo);
app.use('/', deleteTodo);

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

app.listen(PORT, () => {
  console.log(`Server is running on ${chalk.blue(`http://localhost:${PORT}`)}`);
});

