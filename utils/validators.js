const Ajv = require('ajv');
const ajv = new Ajv({ allErrors: true });

const todoSchema = {
  type: 'object',
  properties: {
    title: { type: 'string', minLength: 1 },
    description: { type: 'string', minLength: 1 }
  },
  required: ['title', 'description'],
  additionalProperties: false
};

const validateTodo = ajv.compile(todoSchema);

function isValidTodo(todo) {
  return validateTodo(todo);
}

module.exports = {
  isValidTodo
};
