const app = require('fastify')({ logger: true })
const cors = require('@fastify/cors')

//Setting Up Cors
app.register(cors,{ 
    origin: true,
    methods: 'GET,POST,PUT,DELETE'
})

//Seting Up Routes
app.get('/', async (request, reply) =>{
    reply.send({Status: "SERVER RUNNING"})
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
