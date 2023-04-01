const app = require('fastify')({ logger: true, prettyPrint: { colorize: true, ignore: 'pid,hostname'}, ajv: { customOptions: {coerceTypes: false,}}})
const corsFatify = require('@fastify/cors')
const envFastify = require('@fastify/env')
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

    //Registering @env envoirment variables 
    await app.register(envFastify, dbOptions);
    const dbUserName = encodeURIComponent(app.config.DB_USERNAME);
    const dbPassword = encodeURIComponent(app.config.DB_PASSWORD);
    const dbName = encodeURIComponent(app.config.DB_NAME);
    const dbUrl = `mongodb+srv://${dbUserName}:${dbPassword}@cluster0.uvzqwgp.mongodb.net/${dbName}?retryWrites=true&w=majority`;

    //Registering and connecting to MongoDB
    app.register(require('@fastify/mongodb'), {
        url: dbUrl,
        forceClose: true,
        useUnifiedTopology: true,
      }).after(() => {
        const db = app.mongo.db;
        const usersCollection = db.collection('users');
        usersCollection.createIndex({ username: 1 }, { unique: true });
    });  
    
    
    /*
    *Registering Secure Session
    */
    
    //Registering @Fastify/JWT
    app.register(require('@fastify/jwt'), {
        secret: encodeURIComponent(app.config.SECRET),
      })

    //Registering @Fastify/Auth
    app.register(require('@fastify/auth')).after(() => {
        app.decorate('authenticate', async function (request, reply) {
           await request.jwtVerify();
         
    })});        
 
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

    //Running Server
    await app.listen({port:3000})    

    }catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()
