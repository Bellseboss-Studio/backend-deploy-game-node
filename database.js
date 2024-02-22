const knex = require('knex');

const db = knex({
  client: 'mysql2',
  connection: {
    host: 'db',
    user: 'your_database_user',
    password: 'your_database_password',
    database: 'your_database_name',
    port: 3306,
  },
});

module.exports = db;
