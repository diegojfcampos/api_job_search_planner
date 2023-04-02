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


module.exports = jobSchema;