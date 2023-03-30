const dbSchema = {
    type: 'object',
    required: ['PORT', 'DB_USERNAME', 'DB_PASSWORD', 'DB_NAME'],
    properties:{
        PORT: {type: 'string', default: 3000},
        DB_USERNAME: {type: 'string'},
        DB_PASSWORD: {type: 'string'},
        DB_NAME: {type: 'string'}
    }
}

const dbOptions = {
    dotenv: true,
    confKey: 'config',
    schema: dbSchema,
    data: process.env
}

module.exports = dbOptions;