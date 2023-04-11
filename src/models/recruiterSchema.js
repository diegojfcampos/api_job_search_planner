const recruiterSchema =  {
    type: "object",
    required: ["recruiter_name"],
    properties:{
        _recruiterId: {type: "string"},
        recruiter_name: {type: "string"},
        recruiter_company: {type: "string"},
        recruiter_email: {type: "string", format: "email"},
        recruiter_socialmedia: {type: "string", format: "url"},
        recruiter_registration: {type: "string", format: "date"},
        recruiter_phone: {type: "string"},
        recruiter_notes: {type: "string"},
    }
}

const getRecruiterOpts = {
    response:{
        200:{
            type: "object",
            properties:{
                recruiter: recruiterSchema
            },
            required: ['recruiter']
        }
    }
}

const getRecruitersOpts = {
    response: {
        200:{
            type: 'array',
            items: {                
                    type: 'object',
                    properties: {
                    recruiters: recruiterSchema
                },
                required: ['recruiters']
            }
        }  
    }
}

const putRecruterOpts = {
    schema: {
      body: {
        type: 'object',
        properties: {
            recruiterId: {type: "string"},
            recruiter_name: {type: "string"},
            recruiter_company: {type: "string"},
            recruiter_email: {type: "string", format: "email"},
            recruiter_socialmedia: {type: "string", format: "url"},
            recruiter_registration: {type: "string", format: "date"},
            recruiter_phone: {type: "string"},
            recruiter_notes: {type: "string"},
        },
        required: ['recruiterId']
      },
      params: {
        type: 'object',
        properties: {
          userId: { type: 'string' }
        },
        required: ['userId']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            recruiterUpdated: { type: 'string' },
            updated: { type: 'boolean' }
          },
          required: ['recruiterupdated', 'updated']
        },
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          },
          required: ['message']
        }
      }
    }
};

const deleteJobOpts = {
    schema: {
      params: {
        type: 'object',
        properties: {
          userId: { type: 'string' }
        },
        required: ['userId']
      },
      body: {
        type: 'object',
        properties: {
            recruiterId: { type: 'string' }
        },
        required: ['recruiterId']
      },
      response: {
        200: {
          type: 'object',
          properties: {
            recruiterDeleted: { type: 'string' },
            deleted: { type: 'boolean' }
          },
          required: ['recruiterDeleted', 'deleted']
        },
        404: {
          type: 'object',
          properties: {
            message: { type: 'string' }
          },
          required: ['message']
        }
      }
    }
};


module.exports = {recruiterSchema, getRecruiterOpts, getRecruitersOpts, putRecruterOpts, deleteJobOpts };