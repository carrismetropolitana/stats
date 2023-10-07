//
const CLICKHOUSE = require('../services/CLICKHOUSE');

//
module.exports.website = async (request, reply) => {
  await CLICKHOUSE.client.insert({
    table: 'usage_website',
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
};
