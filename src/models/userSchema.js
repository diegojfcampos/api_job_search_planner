const jobSchema = require("./jobSchema");
const recruiterSchema = require("./recruiterSchema");

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
                        job_tracker: {type: 'array', items:  jobSchema},
                        recruiter_tracker: {type: 'array', items: recruiterSchema},
                    }
                }
            }
        }
    }
}

module.exports = getUserOpts;