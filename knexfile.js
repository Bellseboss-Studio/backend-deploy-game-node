// knexfile.js
require('dotenv').config();
module.exports = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_USER_PASSWORD,
    database: process.env.DB_DB_NAME,
    port: 3306,
  },
  // Otros ajustes...
};
