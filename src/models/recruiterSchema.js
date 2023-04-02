const recruiterSchema =  {
    type: "object",
    required: ["recruiter_name", "recruiter_company"],
    properties:{
        recruiter_name: {type: "string"},
        recruiter_company: {type: "string"},
        recruiter_email: {type: "string"},
        recruiter_phone: {type: "string"},
        recruiter_notes: {type: "string"},
    }
}

module.exports = recruiterSchema;