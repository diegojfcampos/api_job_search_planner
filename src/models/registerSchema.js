const registerSchema = {
    type: 'object',
    required: ['username', 'password'],
    properties: {
        _id: {type: 'string'},
        username: {type: 'string', format: 'email',  pattern: '[-!#$%&\'*+\\/0-9=?A-Z^_a-z{|}~](\\.?[-!#$%&\'*+\\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\\.?[a-zA-Z0-9])*\\.[a-zA-Z](-?[a-zA-Z0-9])+'},
        password: {type: 'string'},
        job_tracker: {
            type: 'array', 
            items: {
                type: 'object', 
                properties: {
                    _id: {type: 'string'},
                    job_title: {type: 'string'},
                    company: {type: 'string'},
                    date_applied: {type: 'string'},
                    status: {type: 'string'},
                    notes: {type: 'string'},     
                    date_added: {type: 'string'},
                    date_updated: {type: 'string'},
                },
            },
        },
        recruiter_tracker: {
            type: 'array', 
            items: {
                type: 'object', 
                properties: {
                    _id: {type: 'string'},
                    recruiter_name: {type: 'string'},
                    recruiter_email: {type: 'string'},
                    recruiter_phone: {type: 'string'},
                    recruiter_notes: {type: 'string'},
                },
            },    
        },   
    }
};

module.exports = registerSchema;
