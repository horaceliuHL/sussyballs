const parse = require('pg-connection-string').parse;
const { Pool } = require('pg');
const prompt = require('prompt');
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());
// Run the transactions in the connection pool
(async () => {
  prompt.start();
  const URI = await prompt.get('connectionString');
  var connectionString;
  // Expand $env:appdata environment variable in Windows connection string
  if (URI.connectionString.includes('env:appdata')) {
    connectionString = await URI.connectionString.replace(
      '$env:appdata',
      process.env.APPDATA
    );
  }
  // Expand $HOME environment variable in UNIX connection string
  else if (URI.connectionString.includes('HOME')) {
    connectionString = await URI.connectionString.replace(
      '$HOME',
      process.env.HOME
    );
  }
  var config = parse(connectionString);
  config.port = 26257;
  config.database = 'sussyballs';
  const pool = new Pool(config);

  // Connect to database
  const client = await pool.connect();

  app.get('/leaderboard', async (req, res) => {
    const selectStatement = `
    SELECT name, score, RANK() OVER (ORDER BY score DESC) AS rank
    FROM leaderboard
    LIMIT 10;
    `;
    const data = await client.query(selectStatement);
    if (data && data.rows.length > 0) {
      const leaderboard = data.rows;
      return res.status(200).json(leaderboard);
    }
    return res.status(400).send('Failed to retrieve leaderboard.');
  });

  app.post('/leaderboard', async (req, res) => {
    const { name, score } = req.body;
    const insertStatement = `INSERT INTO leaderboard (name, score) VALUES ('${name}', '${score}');`;
    await client.query(insertStatement);

    return res.send('Score added to leaderboard!');
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
})().catch((err) => {
  console.log(err.stack);
  process.exit(1);
});
