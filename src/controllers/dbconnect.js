const fastifyPlugin = require('fastify-plugin')
const dbSchema = require('../models/dbschema')
require('dotenv').config()

async function dbConnect(fastify, options) {
  fastify.register(require('fastify-mongodb'), {
    url: `mongodb+srv://diegojfcampos:${process.env.DB_PASSWORD}@cluster0.uvzqwgp.mongodb.net/job_search_planner?retryWrites=true&w=majority`
  })
}

module.exports = fastifyPlugin(dbConnect);