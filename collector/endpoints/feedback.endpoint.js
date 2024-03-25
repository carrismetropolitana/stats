/* * */

const CLICKHOUSE = require('../services/CLICKHOUSE');

/* * */

module.exports.stopsExplorerRealtime = async (request, reply) => {
  await CLICKHOUSE.client.insert({
    table: 'feedback_stops_explorer_realtime',
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

/* * */

module.exports.pipExplorerStatus = async (request, reply) => {
  await CLICKHOUSE.client.insert({
    table: 'feedback_pip_explorer_status',
    values: [
      {
        pip_id: request.body.pip_id,
        answer_code: request.body.answer_code,
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
