const Ajv = require('ajv');
const ajv = new Ajv();

const todoSchema = {
  type: 'object',
  properties: {
    id: { type: 'number' },
    title: { type: 'string' },
    completed: { type: 'boolean' }
  },
  required: ['id', 'title', 'completed'],
  additionalProperties: false
};

const isValidTodo = ajv.compile(todoSchema);

module.exports = {
  isValidTodo
};
