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
    // 1. Setup usage.website table
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

    //
    // 2. Setup feedback.stops_explorer.realtime table

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
    // 3. Setup feedback.pip_explorer.status table

    try {
      await this.client.command({
        query: `
            CREATE TABLE IF NOT EXISTS feedback_pip_explorer_status (
                timestamp DateTime64(3, 'Europe/Lisbon') DEFAULT now(),
                pip_id FixedString(3),
                answer_code String DEFAULT ''
            )
            ENGINE MergeTree()
            PRIMARY KEY (timestamp, pip_id)
            ORDER BY (timestamp, answer_code)
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
