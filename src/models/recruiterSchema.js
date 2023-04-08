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
        recruiter_phone: {type: "string", format: "phone"},
        recruiter_notes: {type: "string", format: "text"},
    }
}

module.exports = recruiterSchema;