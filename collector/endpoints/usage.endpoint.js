/* * */

const CLICKHOUSE = require('../services/CLICKHOUSE');

/* * */

module.exports.website = async (request, reply) => {
  //
  console.log('----------------------------');
  console.log('request.body', request.body);
  console.log('----------------------------');
  //
  console.log({
    app_version: request.body.app_version,
    //
    referer: request.body.referrer,
    //
    fingerprint: request.body.fingerprint,
    //
    ua: request.body.ua,
    ua_browser_name: request.body.ua_browser_name,
    ua_browser_version: request.body.ua_browser_version,
    ua_engine_name: request.body.ua_engine_name,
    ua_engine_version: request.body.ua_engine_version,
    ua_os_name: request.body.ua_os_name,
    ua_os_version: request.body.ua_os_version,
    ua_device_model: request.body.ua_device_model,
    ua_device_type: request.body.ua_device_type,
    ua_device_vendor: request.body.ua_device_vendor,
    ua_cpu_architecture: request.body.ua_cpu_architecture,
    //
    device_timezone: request.body.device_timezone,
    device_screen_width: request.body.device_screen_width,
    device_screen_height: request.body.device_screen_height,
    device_screen_orientation: request.body.device_screen_orientation,
    device_locale: request.body.device_locale,
    //
    ip_address: request.ip,
    //
    event_key: request.body.event_key,
    event_properties: request.body.event_properties,
    //
  });
  //

  //   await CLICKHOUSE.client.insert({
  //     table: 'usage_website',
  //     values: [
  //       {
  //         app_version: pjson.version,
  //         //
  //         referer: document.referrer,
  //         //
  //         fingerprint: await getCurrentBrowserFingerPrint(),
  //         //
  //         ua: request.body.ua,
  //         ua_browser_name: request.body.ua_browser_name,
  //         ua_browser_version: request.body.ua_browser_version,
  //         ua_engine_name: request.body.ua_engine_name,
  //         ua_engine_version: request.body.ua_engine_version,
  //         ua_os_name: request.body.ua_os_name,
  //         ua_os_version: request.body.ua_os_version,
  //         ua_device_model: request.body.ua_device_model,
  //         ua_device_type: request.body.ua_device_type,
  //         ua_device_vendor: request.body.ua_device_vendor,
  //         ua_cpu_architecture: request.body.ua_cpu_architecture,
  //         //
  //         device_timezone: request.body.device_timezone,
  //         device_screen_width: request.body.device_screen_width,
  //         device_screen_height: request.body.device_screen_height,
  //         device_screen_orientation: request.body.device_screen_orientation,
  //         device_locale: request.body.device_locale,
  //         //
  //         ip_address: request.ip,
  //         //
  //         event_key: request.body.event_key,
  //         event_properties: request.body.event_properties,
  //         //
  //       },
  //     ],
  //     format: 'JSONEachRow',
  //     clickhouse_settings: {
  //       async_insert: 1,
  //       wait_for_async_insert: 1,
  //     },
  //   });

  return reply.send(200);
};

/* * */

module.exports.naveganteApp = async (request, reply) => {
  await CLICKHOUSE.client.insert({
    table: 'usage_navegante_app',
    values: [
      {
        ip_address: request.ip,
        card_serial_number: request.body.card_serial_number,
        card_type_id: request.body.card_type_id,
        card_profile_id: request.body.card_profile_id,
        app_version: request.body.app_version,
        os_version: request.body.os_version,
        device_model: request.body.device_model,
        service_name: request.body.service_name,
        status_code: request.body.status_code,
        error_details: request.body.error_details,
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