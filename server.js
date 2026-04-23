const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const fs = require('fs');
const { isValidTodo } = require('./utils/validators');

const createTodo = require('./routes/create');
const deleteTodo = require('./routes/delete');
const getTodo = require('./routes/get');
const editTodo = require('./routes/edit');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors(
    {
        origin: ['http://localhost:5000','http://localhost:5000'],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
    }
));

app.use('/', getTodo);
app.use('/', deleteTodo);
app.use('/', createTodo);
app.use('/', editTodo);


app.listen(PORT, () => {
  console.log(`Server is running on ${chalk.blue(`http://localhost:${PORT}`)}`);
});

