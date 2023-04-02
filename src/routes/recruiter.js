
async function recruiterRoutes(app, options, done) {

    app.get('/recruiter', async (request, reply) => {
        const db = app.mongo.db;
        const collection = db.collection('users');
        const result = await collection.findOne({_id: request.params.id});
        const recruiters = result.recruiter_tracker;
        reply.send(recruiters)
    }),

    app.get('/recruiter/:id', async (request, reply) => {
        const recruiterId = request.body;
        const db = app.mongo.db;
        const collection = db.collection('users');
        const result = await collection.findOne({_id: request.params.id});
        const recruiters = result.recruiter_tracker;
        const recruiter = recruiters.find(recruiter => recruiter._recruiterId === recruiterId);
        reply.send(recruiter)
    }),

    app.put('/recruiter/:id', async (request, reply) => {
        const userId = request.params.userId;
        const recruiterId = request.body.jobId;        
        const db = ap.mongo.db;
        const collection = db.collection("users");      

        const result = await collection.updateOne(
          { _id: userId, job_tracker: { $elemMatch: { _recruiterId: recruiterId } } },
          { $set: { "recruiter_tracker.$": request.body } }
        );
      
        if (result.modifiedCount === 0) return reply.status(404).send({ message: "Cannot find recruiter" });   
      
        return reply.status(200).send(result);
    }),

    app.delete('/recruiter/:id', async (request, reply) => {
        const recruiterId = request.body;
        const db = ap.mongo.db;
        const collection = db.collection("users");
        const result = await collection.updateOne({_id: request.params.id}, {$pull: {recruiter_tracker: {_recruiterId: recruiterId}}});
        reply.send(result);    
    }),
    
    done()
}