const {userSchema, getUserOpts} = require('../models/userSchema');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');


async function userRoutes(app, options, done) {
    //Register route
    app.post('/register', userSchema, async (request, reply) => {
        const {username, password} = request.body;
        const db = app.mongo.db;
        const collection = db.collection('users');
        const hashedPassword = await bcrypt.hash(password, 10) ;
        const user = {
            _id: uuidv4(),
            username,
            password: hashedPassword,
            job_tracker: [],
            recruiter_tracker: [],
        };        
        const resultPostUser = await collection.insertOne(user);
        reply.send(resultPostUser)
    }),

    app.get('/users', getUserOpts, async (request, reply) => {        
        const db = app.mongo.db;
        const collection = db.collection('users');
        const result = await collection.find().toArray();    
        reply.send(result)
    
    }),

    app.get('/users/:id', async(request, reply) => {
        console.log(request.params.id)
        const db = app.mongo.db;
        const collection = db.collection('users');
        const resultGetUserById = await collection.findOne({_id: request.params.id});        
        reply.send(resultGetUserById);

    })


    done()
}

module.exports = userRoutes