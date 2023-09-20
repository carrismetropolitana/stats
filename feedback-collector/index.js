const { createClient } = require('@clickhouse/client');

void (async () => {
  //

  const client = createClient({
    host: 'http://clickhouse:8123',
  });

  const tableName = 'stops_explorer_realtime_feedback';

  //   await client.command({
  //     query: `DROP TABLE IF EXISTS ${tableName}`,
  //   });

  //   await client.command({
  //     query: `
  //       CREATE TABLE ${tableName} (id UInt64)
  //       ENGINE MergeTree()
  //       ORDER BY (id)
  //     `,
  //   });

  await client.insert({
    table: tableName,
    values: { test: 'hey' },
    format: 'JSONCompactEachRow',
  });

  const rs = await client.query({
    query: `SELECT * from ${tableName}`,
    format: 'JSONEachRow',
  });

  for await (const rows of rs.stream()) {
    // or just `rows.text()` / `rows.json()`
    // to consume the entire response at once
    rows.forEach((row) => {
      console.log(row.json());
    });
  }

  await client.close();
})();
