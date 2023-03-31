const userSchema = {
    type: 'object',
    required: ['username', 'password'],
    properties: {
        _id: {type: 'string'},
        username: {type: 'string', format: 'email'},
        password: {type: 'string'},
        job_tracker:{type: 'array', items: {type: 'object'}},
        recruiter_tracker:{type: 'array', default: [], items: {type: 'object'}},
        
    }
}

const getUserOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: {
                    type: 'object',
                    properties: {
                        _id: {type: 'string'},
                        username: {type: 'string', format: 'email'},
                        job_tracker: {type: 'array', items: {type: 'object'}},
                        recruiter_tracker: {type: 'array', items: {type: 'object'}},
                    }
                }
            }
        }
    }
}

module.exports = {userSchema, getUserOpts};