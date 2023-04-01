const registerSchema = {
    type: 'object',
    required: ['username', 'password'],
    properties: {
        _id: {type: 'string'},
        username: {type: 'string', format: 'email',  pattern: '[-!#$%&\'*+\\/0-9=?A-Z^_a-z{|}~](\\.?[-!#$%&\'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\\.?[a-zA-Z0-9])*\\.[a-zA-Z](-?[a-zA-Z0-9])+'},
        password: {type: 'string'},
        job_tracker:{type: 'array', default: [], items: {type: 'object'}},
        recruiter_tracker:{type: 'array', default: [], items: {type: 'object'}},
        
    }
}


module.exports = registerSchema;