const fastify = require('fastify')({ logger: true, requestTimeout: 20000 });
const { createClient } = require('@clickhouse/client');

//
// SETUP CLIENT

const client = createClient({
  host: 'http://clickhouse:8123',
});

//
// TABLE NAME

const tableName = 'feedback_stops_explorer_realtime';

//
// ROUTE

fastify.route({
  method: 'OPTIONS',
  url: '/*',
  handler: async (request, reply) => {
    reply.code(204).header('Content-Length', '0').header('Access-Control-Allow-Methods', 'POST').send();
  },
});

fastify.post('/feedback/stopsExplorerRealtime', async (request, reply) => {
  await client.insert({
    table: tableName,
    values: [
      {
        stop_id: request.body.stop_id,
        trip_id: request.body.trip_id,
        vehicle_id: request.body.vehicle_id,
        sentiment: request.body.sentiment,
        details: JSON.stringify(request.body.details),
      },
    ],
    format: 'JSONEachRow',
    clickhouse_settings: {
      async_insert: 1,
      wait_for_async_insert: 1,
    },
  });
  return reply.send(200);
});

//
// START FASTIFY SERVER

fastify.listen({ port: 5050, host: '0.0.0.0' }, async (err, address) => {
  if (err) throw err;
  console.log(`Server listening on ${address}`);
  await client.command({
    query: `
        CREATE TABLE IF NOT EXISTS ${tableName} (
            timestamp DateTime64(3, 'Europe/Lisbon') DEFAULT now(),
            stop_id FixedString(6),
            trip_id String DEFAULT '',
            vehicle_id String DEFAULT '',
            sentiment Enum('positive' = 1, 'negative' = 0),
            details String DEFAULT ''
        )
        ENGINE MergeTree()
        PRIMARY KEY (timestamp, vehicle_id, sentiment)
        ORDER BY (timestamp, sentiment, trip_id, vehicle_id, details)
    `,
  });
});
