const app = require('fastify')({ logger: true, prettyPrint: { colorize: true, ignore: 'pid,hostname'}, ajv: { customOptions: {coerceTypes: true}}})
const corsFatify = require('@fastify/cors')
const envFastify = require('@fastify/env')
const fastify = require('fastify')
const dbOptions = require('./src/models/dbSchema')

/* 
*Setting Up Server
*/
const start = async () => {
    try {
    //Registering @cors
    await app.register(corsFatify, {
        origin: '0.0.0.0',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        maxAge: 3600
    })
    app.log.info("Cors Registered")

    //Registering @env envoirment variables 
    await app.register(envFastify, dbOptions);
    const dbUserName = encodeURIComponent(app.config.DB_USERNAME);
    const dbPassword = encodeURIComponent(app.config.DB_PASSWORD);
    const dbName = encodeURIComponent(app.config.DB_NAME);
    const dbUrl = `mongodb+srv://${dbUserName}:${dbPassword}@cluster0.uvzqwgp.mongodb.net/${dbName}?retryWrites=true&w=majority`;
    app.log.info("Dotenv Configured")
    //Registering and connecting to MongoDB
    app.register(require('@fastify/mongodb'), {
        url: dbUrl,
        forceClose: true,
        useUnifiedTopology: true,
      }).after(() => {
        const db = app.mongo.db;
        const usersCollection = db.collection('users');
        usersCollection.createIndex({ username: 1 }, { unique: true })});
    
    //Debugging DB connection
    app.log.info("MongoDB Connected")
    
    /*
    *Registering Secure Session
    */
    
    //Registering @Fastify/JWT
    app.register(require('@fastify/jwt'), {
        secret: encodeURIComponent(app.config.SECRET),
        sign: { expiresIn: '2h' }
      })
      app.log.info("JWT decoding token and verifying signature")

    //Registering @Fastify/Auth
    app.register(require('@fastify/auth')).after(() => {
        app.decorate('authenticate', async function (request, reply) {
           await request.jwtVerify();
         
    })});     
    app.log.info("Routes protected with JWT and Auth")
    /* 
    *Registering Routes
    */
    
    //Root route
    app.get('/', async (request, reply) => {
        reply.send({ Server_Status: 'Running' })
    });

    //Routes
    app.register(require('./src/routes/register') , { prefix: '/api/v1' }); //Signup
    app.register(require('./src/routes/login') , { prefix: '/api/v1' }); //Login
    app.register(require('./src/routes/user') , { prefix: '/api/v1' }); //User  
    app.register(require("./src/routes/job") , { prefix: '/api/v1' }); //Job
    app.register(require('./src/routes/recruiter') , { prefix: '/api/v1' }); //Recruiter'))
    
    /* 
    *Documentation
    */

    //Registering @Fastify/Swagger
    app.register(require('@fastify/swagger'), {
        exposeRoute: true,
        routePrefix: '/api/v1/documentation',        
        swagger: {
            info: { title: 'Job Tracker API', description: 'API for Job Tracker', version: '0.1.0' },            
            schemes: ['http', 'https'],
            consumes: ['application/json'],
            produces: ['application/json']
        },
    }),
    app.log.info("Swagger Documentation configured")
    //Running Server
    await app.listen({port:3001})    

    }catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()
