const fastifyPlugin = require('fastify-plugin')
const dbSchema = require('../models/dbschema')


async function dbConnect(fastify, options) {
  fastify.register(require('@fastify/mongodb'), {
    url: `mongodb+srv://diegojfcampos:${fastify.config.db_password}@cluster0.uvzqwgp.mongodb.net/job_search_planner?retryWrites=true&w=majority`
    
  })
}

module.exports = fastifyPlugin(dbConnect);