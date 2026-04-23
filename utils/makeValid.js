const getLastId = require('./lastId');

const makeValid = (todo) => {
  if (typeof todo !== 'object' || todo === null) {
    throw new Error('Invalid todo object');
  }
  todo.id = getLastId() + 1;
  todo.completed = false;
  return todo;
};

module.exports = makeValid;
