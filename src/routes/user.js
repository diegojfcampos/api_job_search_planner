const userSchema = require('../models/userSchema');



async function userRoutes(app, options, done) {

    //app.addHook('preHandler', app.authenticate);

    app.get('/users', userSchema, async (request, reply) => {        
        const db = app.mongo.db;
        const collection = db.collection('users');
        const result = await collection.find().toArray();    
        reply.send(result)
    
    }),

    app.get('/users/:id', {preHandler: app.authenticate},  async(request, reply) => {        
        const db = app.mongo.db;
        const collection = db.collection('users');
        const resultGetUserById = await collection.findOne({_id: request.params.id});        
        reply.send(resultGetUserById);

    }),
    
    app.put('/users/:id', async(request, reply) => {

        if(request.body.username) return reply.status(400).send({error: 'Username cannot be changed'});
        const db = app.mongo.db;
        const collection = db.collection('users');
        const resultUpdateUserById = await collection.updateOne({_id: request.params.id}, {$set: request.body});
        reply.send(resultUpdateUserById);
    }),

    app.delete('/users/:id', async(request, reply) => {
        const db = app.mongo.db;
        const collection = db.collection('users');
        const resultDeleteUserById = await collection.deleteOne({_id: request.params.id});
        reply.send(resultDeleteUserById);
    }),

    done()
}

module.exports = userRoutes