'use strict';

import mysql from 'mysql';
import {} from 'dotenv/config';

// Database Connection for Production

var config = {
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
};

// When running from Google Cloud, env variables will be passed in container cloud connection config
if(process.env.NODE_ENV === 'production') {
console.log('Running from cloud. Connecting to DB through GCP socket.');
config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}

// When running from localhost, get the config from .env and don't forget to change the NODE_ENV value
else {
console.log('Running from localhost. Connecting to DB directly.');
config.host = process.env.DB_HOST;
}

let connection = mysql.createConnection(config);

// Database Connection for Local Development

// let connection = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASS
// });

//   connection.connect(function(err) {
//     if (err) {
//       console.error('Error connecting: ' + err.stack);
//       return;
//     }
//     console.log('Connected as thread id: ' + connection.threadId);
//   });

export default connection;