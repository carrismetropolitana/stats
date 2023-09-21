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

fastify.post('/feedback/stopsExplorerRealtime', async (request, reply) => {
  await client.insert({
    table: tableName,
    values: [
      {
        timestamp: Date.now(),
        stop_id: request.body.stop_id,
        trip_id: request.body.trip_id,
        vehicle_id: request.body.vehicle_id,
        sentiment: request.body.sentiment,
        details: JSON.stringify(request.body.details),
      },
    ],
    format: 'JSONEachRow',
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
            timestamp DateTime64(3, 'Europe/Lisbon'),
            stop_id FixedString(6),
            trip_id Nullable(String),
            vehicle_id Nullable(String),
            sentiment Enum('positive' = 1, 'negative' = 0),
            details String
        )
        ENGINE MergeTree()
        ORDER BY (timestamp)
    `,
  });
});
