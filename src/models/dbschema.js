const dbSchema = {
    type: 'object',
    required: ['DB_PASSWORD'],
    properties: {
      DB_PASSWORD: {
        type: 'string'
      }
    }
  }
  
  module.exports = dbSchema;