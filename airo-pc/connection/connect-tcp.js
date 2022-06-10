'use strict';

import mysql from 'mysql';
import {} from 'dotenv/config'

// Database Connection for Production

let config = {
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
}

if (process.env.INSTANCE_CONNECTION_NAME && process.env.NODE_ENV === 'production') {
  config.socketPath = `/cloudsql/${process.env.INSTANCE_CONNECTION_NAME}`;
}

let connection = mysql.createConnection(config);

export default connection;