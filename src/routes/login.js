const bcrypt = require('bcrypt');

async function loginRoute(app, options, done){
    
    app.post('/login', async (request, reply) => {
        const {username, password} = request.body;
        const db = app.mongo.db;
        const collection = db.collection('users');

        const user = await collection.findOne({username: username});
        if(!user) return reply.code(401).send({error: 'Invalid username or password'});
        const validPassword = await bcrypt.compare(password, user.password);
        if(!validPassword) return reply.code(401).send({error: 'Invalid username or password'});
        
        const token = app.jwt.sign({username: user.username, id: user._id},app.config.SECRET, { expiresIn: '2h' });
        reply.send({token});

    });

    done();
}

module.exports = loginRoute;