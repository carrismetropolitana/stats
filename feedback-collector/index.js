const { createClient } = require('@clickhouse/client');

void (async () => {
  //

  const client = createClient({
    host: 'http://clickhouse:8123',
  });

  const tableName = 'stops_explorer_realtime_feedback2';

  await client.command({
    query: `
        CREATE TABLE IF NOT EXISTS ${tableName} (id UInt64, name String)
        ENGINE MergeTree()
        ORDER BY (id)
      `,
  });

  await client.insert({
    table: tableName,
    values: [{ id: 1, name: 'Ricardo' }],
    format: 'JSONEachRow',
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

  //   await client.close();
})();
