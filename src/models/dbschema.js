const dbSchema = {
    type: 'object',
    required: ['db_password'],
    properties: {
      db_password: {
        type: 'string'
      }
    }
  }
  
  module.exports = dbSchema;