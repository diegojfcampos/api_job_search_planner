const jobSchema = require("../models/jobSchema");
const UUID = require("uuid");

async function jobRoutes(app, options, done){

    app.addHook('preHandler', app.authenticate);

    app.post('/postjob/:id', jobSchema, async (request, reply) => {      

        const {job_title, company, job_url, job_description, job_location, job_type, job_salary, job_posted, job_applied, job_status, job_notes} = request.body;

        const job = {
            _jobId: UUID.v4(),
            job_title,
            company,
            job_url,
            job_description,
            job_location,
            job_type,
            job_salary,
            job_posted: new Date() || null,
            job_applied: new Date() || null,
            job_status,
            job_notes
        };

        const db = app.mongo.db;
        const collection = db.collection('users');             
        const validateUser = await collection.findOne({_id: request.params.id});
        
        if(!validateUser) reply.status(404).send({message: 'User not found'});

        const result = await collection.updateOne({_id: request.params.id}, {$push: {job_tracker: job}});        
        reply.send({jobId: job._jobId, registered: result.acknowledged});

    });

    app.get('/getjobs/:userId', async (request, reply) =>{ 

        const db = app.mongo.db;
        const collection = db.collection('users');             
        const user = await collection.findOne({_id: request.params.userId});
        const jobs = user.job_tracker;
        reply.send({jobs: jobs});

    })

    app.get('/getjob/:userId', async (request, reply) => {
        
        const jobId = request.body;
        const db = app.mongo.db;
        const collection = db.collection("users");
        const user = await collection.findOne({_id: request.params.userId});
        const job = user.job_tracker;
        const result = job.find(result => job._jobId === jobId);
        reply.send({job: result});
      });

    app.put('/updatejob/:userId', async (request, reply) => {
        const jobId = request.body.jobId;
        const db = app.mongo.db;
        const collection = db.collection("users");    
        
        const updateObj = {};
        if (request.body.job_title) updateObj["job_tracker.$.job_title"] = request.body.job_title;
        if (request.body.company) updateObj["job_tracker.$.company"] = request.body.company;
        if (request.body.job_url) updateObj["job_tracker.$.job_url"] = request.body.job_url;
        if (request.body.job_description) updateObj["job_tracker.$.job_description"] = request.body.job_description;
        if (request.body.job_location) updateObj["job_tracker.$.job_location"] = request.body.job_location;
        if (request.body.job_type) updateObj["job_tracker.$.job_type"] = request.body.job_type;
        if (request.body.job_salary) updateObj["job_tracker.$.job_salary"] = request.body.job_salary;
        if (request.body.job_posted) updateObj["job_tracker.$.job_posted"] = request.body.job_posted;
        if (request.body.job_applied) updateObj["job_tracker.$.job_applied"] = request.body.job_applied;
        if (request.body.job_status) updateObj["job_tracker.$.job_status"] = request.body.job_status;
        if (request.body.job_notes) updateObj["job_tracker.$.job_notes"] = request.body.job_notes;
    
        const result = await collection.updateOne(
            { _id: request.params.userId, job_tracker: { $elemMatch: { _jobId: jobId } } },
            { $set: updateObj }
        );    
        if (result.modifiedCount === 0) reply.status(404).send({ message:  "Job was not altered" });
    
        reply.send({jobpdated: jobId, updated: result.acknowledged});
    });   
 
    app.delete('/deletejob/:userId', async (request, reply) => {
        const jobId = request.body.jobId;
        const userId = request.params.userId; 
        const db = app.mongo.db;
        const collection = db.collection("users");
        const user = await collection.findOne({_id: userId});
        const jobs = user.job_tracker;
        const indexToDelete = jobs.findIndex(job => job._jobId === jobId); 
        if(indexToDelete === -1) return reply.status(404).send({message: 'Job not found'});
        jobs.splice(indexToDelete, 1);
        await collection.updateOne({_id: userId}, {$set: {job_tracker: jobs}});
        reply.send({jobDeleted: jobId});
      });

    done();
}

module.exports = jobRoutes;
