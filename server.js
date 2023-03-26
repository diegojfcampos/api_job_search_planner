const app = require('fastify')({ logger: true })
const cors = require('@fastify/cors')
const fastifyEnv = require('@fastify/env')

const dbSchema = require('./src/models/dbschema')


//Setting Up Cors
app.register(cors,{ 
    origin: true,
    methods: 'GET,POST,PUT,DELETE'
})

app.register(fastifyEnv, {
    schema: dbSchema,
    dotenv: true,
    confKey: 'config',
})

app.register(require('./src/controllers/dbconnect'))


//Seting Up Routes
app.get('/', async (request, reply) =>{
    reply.send({Status: "SERVER RUNNING!"})
})

app.post('/login', async (request, reply) =>{
    reply.send({Status: "LOGIN"})
})


//Setting Up server
const start = async () => {
    try{
        await app.listen({port: 3000})        
    }catch(error){
        app.log.error(error)
        process.exit(1)
    }
}

start();
