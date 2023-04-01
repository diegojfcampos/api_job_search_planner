const registerSchema = require('../models/registerSchema');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');


async function registerRoute(app, options, done) {        

    app.post('/register', {schema: {body: registerSchema}}, async (request, reply) => {

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
    
    done()
}

module.exports = registerRoute