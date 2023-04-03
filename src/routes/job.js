const jobSchema = require("../models/jobSchema");
const UUID = require("uuid");

async function jobRoutes(app, options, done){

    app.post('/job/:id', jobSchema, async (request, reply) => {      

        const {job_title, company, job_url, job_description, job_location, job_type, job_salary, job_posted, job_applied, job_status, job_notes} = request.body;

        const job = {
            _jobId: UUID.v4(),
            job_title,
            company,
            job_url,
            job_description,
            job_location,
            job_type,
            job_salary: job_salary || null,
            job_posted: new Date(job_posted) || null,
            job_applied: new Date(job_applied) || null,
            job_status,
            job_notes
        };

        const db = app.mongo.db;
        const collection = db.collection('users');                
        const result = await collection.updateOne({_id: request.params.id}, {$push: {job_tracker: job}});
        reply.send({jobId: job._jobId, registered: result.acknowledged});

    });

    app.get('/jobs', async (request, reply) =>{
        const db = ap.mongo.db;
        const collection = db.collection("users");
        const result = await collection.findOne({_id: request.params.id});
        const jobs = result.job_tracker;
        reply.send(jobs);
    })

    app.get('/job/:id', async (request, reply) => {
        const userId = request.params.userId;
        const jobId = request.jobId;
        const db = ap.mongo.db;
        const collection = db.collection("users");
        const result = await collection.find({_id: userId});    
        const jobs = result.job_tracker;
        const job = jobs.find(job => job._jobId === jobId);
        reply.send(job);

    })

    app.put('/job/:userId', async (request, reply) => {
        const userId = request.params.userId;
        const jobId = request.body.jobId;        
        const db = ap.mongo.db;
        const collection = db.collection("users");      

        const result = await collection.updateOne(
          { _id: userId, job_tracker: { $elemMatch: { _jobId: jobId } } },
          { $set: { "job_tracker.$": request.body } }
        );
      
        if (result.modifiedCount === 0) return reply.status(404).send({ message: "Cannot find job" });   
      
        return reply.status(200).send(result);
      });
    
    app.delete('/job/:id', async (request, reply) => {
        const {jobId} = request.body;
        const db = ap.mongo.db;
        const collection = db.collection("users");
        const result = await collection.updateOne({_id: request.params.id}, {$pull: {job_tracker: {_jobId: jobId}}});
        reply.send(result);        
    })

    done();
}

module.exports = jobRoutes;
