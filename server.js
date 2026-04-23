const express = require('express');
const chalk = require('chalk');
const cors = require('cors');
const toggleCompleted = require('./utils/toggle');

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

app.put('/toggle/:id', (req, res) => {
  const id = Number(req.params.id);

  try {
    const updatedTodo = toggleCompleted(id);

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Todo not found' });
    }

    res.json(updatedTodo);
  } catch (err) {
    console.error('Error toggling todo:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${chalk.blue(`http://localhost:${PORT}`)}`);
});

