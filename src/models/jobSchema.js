const jobSchema = {
    type: "object",
    required: ["job_title", "company"],
    properties:{
        job_title: {type: "string"},
        company: {type: "string"},
        job_url: {type: "string"},
        job_description: {type: "string"},
        job_location: {type: "string"},
        job_type: {type: "string"},
        job_salary: {type: "string"},
        job_posted: {type: "string"},
        job_applied: {type: "boolean"},
        job_status: {type: "string"},
        job_notes: {type: "string"},
    }
}

module.exports = jobSchema;