//
// IMPORTS

const { createClient } = require('@clickhouse/client');

class CLICKHOUSE {
  //

  constructor() {
    this.client = createClient({ host: 'http://clickhouse:8123' });
  }

  async setup() {
    //
    // 1.1. Setup usage.website table
    // try {
    //   await this.client.command({
    //     query: `
    //             CREATE TABLE IF NOT EXISTS usage_website (
    //                 timestamp DateTime64(3, 'Europe/Lisbon') DEFAULT now(),
    //                 user_ip String DEFAULT '',
    //                 user_agent String DEFAULT '',
    //                 device_type String DEFAULT '',
    //                 device_os_version String DEFAULT '',
    //                 device_locale String DEFAULT '',
    //                 device_timezone String DEFAULT '',
    //                 device_screen_width String DEFAULT '',
    //                 device_screen_height String DEFAULT '',
    //                 device_screen_orientation String DEFAULT '',
    //                 device_fingerprint String DEFAULT '',
    //                 app_version String DEFAULT '',
    //                 referer String DEFAULT '',
    //                 event_key String DEFAULT '',
    //                 event_properties String DEFAULT ''
    //             )
    //             ENGINE MergeTree()
    //             PRIMARY KEY (timestamp, event_key)
    //             ORDER BY (timestamp, event_key, properties)
    //         `,
    //   });
    // } catch (err) {
    //   console.log(`⤷ ERROR: Failed to create usage_website table.`, err);
    // }

    // 1.2. Setup usage.navegante_app table
    try {
      await this.client.command({
        query: `
                CREATE TABLE IF NOT EXISTS usage_navegante_app (
                    timestamp DateTime64(3, 'Europe/Lisbon') DEFAULT now(),
                    ip_address String DEFAULT '',
                    card_serial_number String DEFAULT '',
                    card_type_id String DEFAULT '',
                    card_profile_id String DEFAULT '',
                    app_version String DEFAULT '',
                    os_version String DEFAULT '',
                    device_model String DEFAULT '',
                    service_name String DEFAULT '',
                    status_code String DEFAULT '',
                    error_details String DEFAULT ''
                )
                ENGINE MergeTree()
                PRIMARY KEY (timestamp, status_code)
                ORDER BY (timestamp, status_code, app_version)
            `,
      });
    } catch (err) {
      console.log(`⤷ ERROR: Failed to create usage_navegante_app table.`, err);
    }

    //
    // 2.1. Setup feedback.stops_explorer.realtime table

    try {
      await this.client.command({
        query: `
            CREATE TABLE IF NOT EXISTS feedback_stops_explorer_realtime (
                timestamp DateTime64(3, 'Europe/Lisbon') DEFAULT now(),
                stop_id FixedString(6),
                trip_id String DEFAULT '',
                vehicle_id String DEFAULT '',
                sentiment Enum('positive' = 1, 'negative' = 0),
                details String DEFAULT ''
            )
            ENGINE MergeTree()
            PRIMARY KEY (timestamp, sentiment)
            ORDER BY (timestamp, sentiment, trip_id, vehicle_id, details)
        `,
      });
    } catch (err) {
      console.log(`⤷ ERROR: Failed to create feedback_stops_explorer_realtime table.`, err);
    }

    //
    // 2.2. Setup feedback.pip_explorer.status table

    try {
      await this.client.command({
        query: `
            CREATE TABLE IF NOT EXISTS feedback_pip_explorer_status (
                timestamp DateTime64(3, 'Europe/Lisbon') DEFAULT now(),
                pip_id FixedString(3),
                answer_code String DEFAULT ''
            )
            ENGINE MergeTree()
            PRIMARY KEY (timestamp, answer_code)
            ORDER BY (timestamp, answer_code, pip_id)
        `,
      });
    } catch (err) {
      console.log(`⤷ ERROR: Failed to create feedback_pip_explorer_status table.`, err);
    }

    //
  }

  //
}

module.exports = new CLICKHOUSE();
