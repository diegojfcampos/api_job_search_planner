const app = require('fastify')({ logger: true, prettyPrint: { colorize: true, ignore: 'pid,hostname'} })
const corsFatify = require('@fastify/cors')
const envFastify = require('@fastify/env')
const dbOptions = require('./src/models/dbSchema')

//Creating server
const start = async () => {
    try {
    //Registering @cors
    await app.register(corsFatify, {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'],
        exposedHeaders: ['Content-Type', 'Authorization'],
        credentials: true,
        maxAge: 3600
    })

    //Registering @env envoirment variables 
    await app.register(envFastify, dbOptions)
    const dbUserName = encodeURIComponent(app.config.DB_USERNAME)
    const dbPassword = encodeURIComponent(app.config.DB_PASSWORD)
    const dbName = encodeURIComponent(app.config.DB_NAME)
    const dbUrl = `mongodb+srv://${dbUserName}:${dbPassword}@cluster0.uvzqwgp.mongodb.net/${dbName}?retryWrites=true&w=majority`

    //Registering and connecting to MongoDB
    app.register(require('@fastify/mongodb'), {
        url: dbUrl,
        forceClose: true,
        useUnifiedTopology: true,
      });
    
    //Debugging DB connection
    console.log({Server_Status: app.config.PORT})

    //Registering Routes
    app.get('/', async (request, reply) => {
        reply.send({ Server_Status: 'Running' })
    })

    //Running Server
    await app.listen({port:3001, host: '0.0.0.0'})    

    }catch (err) {
        app.log.error(err)
        process.exit(1)
    }
}

start()
