const {recruiterSchema,getRecruiterOpts, getRecruitersOpts, putRecruterOpts, deleteJobOpts} = require('../models/recruiterSchema');
const UUID = require("uuid");

async function recruiterRoutes(app, options, done) {

    app.addHook('preHandler',  app.authenticate)
    
    app.post('/postrecruiter/:userId',recruiterSchema, async (request, reply) => {

        const {recruiter_name, recruiter_email, recruiter_phone, recruiter_socialmedia, recruiter_notes} = request.body;
        const recruiter = {
            _recruiterId: UUID.v4(),
            recruiter_name,
            recruiter_email,
            recruiter_socialmedia,
            recruiter_registration_date: new Date() || null,
            recruiter_phone,
            recruiter_notes
        };        
        
        const db = app.mongo.db;
        const collection = db.collection('users');
        const validateUser = await collection.findOne({_id: request.params.userId});

        if(!validateUser) reply.status(404).send({message: 'User not found'});

        const result = await collection.updateOne({_id: request.params.userId}, {$push: {recruiter_tracker: recruiter}});
        reply.send({recruiterId: recruiter._recruiterId, registered: result.acknowledged});
        
    }),

    app.get('/getrecruiters/:userId', getRecruitersOpts,  async (request, reply) => {
        const db = app.mongo.db;
        const collection = db.collection('users');
        const user = await collection.findOne({_id: request.params.userId});
        const recruiters = user.recruiter_tracker;
        reply.send({recruiters: recruiters});
    }),

    app.get('/getrecruiter/:userId', getRecruiterOpts, async (request, reply) => {
        const recruiterId = request.body;
        const db = app.mongo.db;
        const collection = db.collection('users');
        const user = await collection.findOne({_id: request.params.userId});
        const recruiters = user.recruiter_tracker;
        const recruiter = recruiters.find(recruiter => recruiters._recruiterId === recruiterId);
        reply.send({recruiter})
    }),
    
    app.get('/getsortrecruiters/:userId', async (request, reply) => {        
        const db = app.mongo.db;
        const collection = db.collection('users');
        const user = await collection.findOne({_id: request.params.userId});
        const recruiters = user.recruiter_tracker;
        recruiters.sort((a, b) => a.recruiter_name.localeCompare(b.recruiter_name))
        reply.send({recruiters})
    }),

    app.put('/updaterecruiter/:userId', putRecruterOpts, async (request, reply) => {
        const recruiterId = request.body.recruiterId;
        const db = app.mongo.db;
        const collection = db.collection('users');
        const user = await collection.findOne({_id: request.params.userId});

        const updateObj = {};
        if(request.body.recruiter_name) updateObj['recruiter_tracker.$.recruiter_name'] = request.body.recruiter_name;
        if(request.body.recruiter_email) updateObj['recruiter_tracker.$.recruiter_email'] = request.body.recruiter_email;
        if(request.body.recruiter_phone) updateObj['recruiter_tracker.$.recruiter_phone'] = request.body.recruiter_phone;
        if(request.body.recruiter_socialmedia) updateObj['recruiter_tracker.$.recruiter_socialmedia'] = request.body.recruiter_socialmedia;
        if(request.body.recruiter_registration_date) updateObj['recruiter_tracker.$.recruiter_registration_date'] = request.body.recruiter_registration_date;
        if(request.body.recruiter_notes) updateObj['recruiter_tracker.$.recruiter_notes'] = request.body.recruiter_notes;     
        
        const result = await collection.updateOne(
            { _id: request.params.userId, recruiter_tracker: { $elemMatch: { _recruiterId: recruiterId } } }, { $set: updateObj});
        
        if (result.modifiedCount === 0) reply.status(404).send({ message:  "Recruiter was not altered" });
        reply.send({recruiterUpdated: recruiterId, updated: result.acknowledged});

    }),

    app.delete('/deleterecruiter/:userId', deleteJobOpts, async (request, reply) => {
        const recruiterId = request.body.recruiterId;
        const userId = request.params.userId; 
        const db = app.mongo.db;
        const collection = db.collection("users");
        const user = await collection.findOne({_id: userId});
        const recruiters = user.recruiter_tracker;
        const indexToDelete = recruiters.findIndex(recruiter => recruiter._recruiterId === recruiterId); 
        if(indexToDelete === -1) return reply.status(404).send({message: 'Recruiter not found'});
        recruiters.splice(indexToDelete, 1);
        await collection.updateOne({_id: userId}, {$set: {recruiter_tracker: recruiters}});
        reply.send({recruiterDeleted: recruiterId});
      });      
    
    done()
}

module.exports = recruiterRoutes;