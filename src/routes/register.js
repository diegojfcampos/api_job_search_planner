const registerSchema = require('../models/registerSchema');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');


async function registerRoute(app, options, done) {        
    app.post('/register', {schema: {body: registerSchema}}, async (request, reply) => {
        try {
            const {username, password, passwordVerification} = request.body;    
            if (password !== passwordVerification) return reply.status(400).send({ error: 'Passwords do not match' });            
        
            const hashedPassword = await bcrypt.hash(password, 12);            
            const db = app.mongo.db;
            const collection = db.collection('users');

            const user = {
                _id: uuidv4(),
                username,
                password: hashedPassword,
                job_tracker: [],
                recruiter_tracker: [],
            };    

            const resultPostUser = await collection.insertOne(user);

            if (resultPostUser.acknowledged) {
                const token = app.jwt.sign({ username: user.username, id: user._id }, app.config.SECRET);
                reply.send({ token });
            } else {
                reply.status(500).send({ error: 'Failed to create user' });
            }
        } catch (err) {
            console.log(err);
            reply.status(500).send({ error: 'Failed to create user' });
        }
    });    
    done();
}

module.exports = registerRoute;
