const express = require('express');
const chalk = require('chalk');
const cors = require('cors');

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
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on ${chalk.blue(`http://localhost:${PORT}`)}`);
});

