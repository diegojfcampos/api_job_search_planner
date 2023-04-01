const registerSchema = require('../models/registerSchema');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');


async function registerRoute(app, options, done) {
    //Register route
<<<<<<< HEAD
    app.post('/register', {schema: {body: userSchema}}, async (request, reply) => {
=======
    app.post('/register', {schema: {body: registerSchema}}, async (request, reply) => {
>>>>>>> 7482427 (build: created authentication with jwt dotenve and  route login)
        const {username, password} = request.body;

        const db = app.mongo.db;
        const collection = db.collection('users');
        
        const user = {
            _id: uuidv4(),
            username,
            password: await bcrypt.hash(password, 256),
            job_tracker: [],
            recruiter_tracker: [],
        };        

        const resultPostUser = await collection.insertOne(user);

        if (resultPostUser.result.n === 1) {
            const token = app.jwt.sign({username: user.username, id: user._id}, app.config.SECRET, { expiresIn: '2h' });
            reply.send({ token });
          } else {
            reply.status(500).send({ error: 'Failed to create user' });
          }
    }),

<<<<<<< HEAD
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

    }),
    
    app.put('/users/:id', async(request, reply) => {
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

=======
>>>>>>> 7482427 (build: created authentication with jwt dotenve and  route login)
    done()
}

module.exports = registerRoute