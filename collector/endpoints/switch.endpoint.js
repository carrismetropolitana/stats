/* * */

const CLICKHOUSE = require('../services/CLICKHOUSE');

/* * */

module.exports.switchCm = async (request, reply) => {
  await CLICKHOUSE.client.insert({
    table: 'switch_cm',
    values: [
      {
			app_version: request.body.app_version,
			debug_mode: request.body.debug_mode,
			short_link_destination: request.body.short_link_destination,
			short_link_id: request.body.short_link_id
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
