//
// IMPORTS

const fastify = require('fastify')({ logger: true, requestTimeout: 20000 });
const CLICKHOUSE = require('./services/CLICKHOUSE');

//
// IMPORT ENDPOINTS

const usageEndpoint = require('./endpoints/usage.endpoint');
const feedbackEndpoint = require('./endpoints/feedback.endpoint');

//
// SETUP HTTP OPTIONS

fastify.route({
  method: 'OPTIONS',
  url: '/*',
  handler: async (request, reply) => reply.code(204).header('Content-Length', '0').header('Access-Control-Allow-Methods', 'POST').send(),
});

//
// SETUP ENDPOINTS

fastify.post('/collector/usage/website', usageEndpoint.website);
fastify.post('/collector/feedback/stopsExplorerRealtime', feedbackEndpoint.stopsExplorerRealtime);

//
// START FASTIFY SERVER

fastify.listen({ port: 5050, host: '0.0.0.0' }, async (err, address) => {
  if (err) throw err;
  console.log(`Server listening on ${address}`);
  await CLICKHOUSE.setup();
});
