const jobSchema = {
  type: "object",
  required: ["job_title", "company"],
  properties: {
    _jobId: { type: "string" },
    job_title: { type: "string" },
    company: { type: "string" },
    job_url: { type: "string" },
    job_description: { type: "string" },
    job_location: { type: "string" },
    job_type: { type: "string" },
    job_salary: { type: ["string", "null"] },
    job_posted: { type: ["string", "null"] },
    job_applied: { type: ["string", "null"] },
    job_status: { type: "string" },
    job_notes: { type: "string" },
  },
};

const getJobOpts = {
  response: {
    200: {
        type: 'object',
        properties: {
            job: {                
                items: jobSchema
            }
        },
        required: ['job']
    }
  }
};

const getJobsOpts = {
  response: {
    200: {
        type: 'array',
        items: {
            type: 'object',
            properties: {
              jobs: {              
                items: jobSchema
            }
        },
        required: ['jobs']
        }
    }
  }
};

// ...
const putJobOpts = {
  schema: {
    body: {
      type: 'object',
      properties: {
        jobId: { type: 'string' },
        job_title: { type: 'string' },
        company: { type: 'string' },
        job_url: { type: 'string' },
        job_description: { type: 'string' },
        job_location: { type: 'string' },
        job_type: { type: 'string' },
        job_salary: { type: 'string' },
        job_posted: { type: 'string'},
        job_applied: { type: 'string' },
        job_status: { type: 'string' },
        job_notes: { type: 'string' }
      },
      required: ['jobId']
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
          jobupdated: { type: 'string' },
          updated: { type: 'boolean' }
        },
        required: ['jobupdated', 'updated']
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
        jobId: { type: 'string' }
      },
      required: ['jobId']
    },
    response: {
      200: {
        type: 'object',
        properties: {
          jobDeleted: { type: 'string' },
          deleted: { type: 'boolean' }
        },
        required: ['jobDeleted', 'deleted']
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

module.exports = {jobSchema, getJobsOpts, getJobOpts, putJobOpts, deleteJobOpts};