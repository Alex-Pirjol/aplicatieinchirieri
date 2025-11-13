const { Pool } = require('pg');

const config = process.env.DATABASE_URL
  ? { connectionString: process.env.DATABASE_URL }
  : {
      host: process.env.DB_HOST || 'localhost',
      port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 5432,
      user: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'postgres',
      database: process.env.DB_NAME || 'atv_rental',
    };

if (process.env.DATABASE_SSL === 'true') {
  config.ssl = { rejectUnauthorized: false };
}

const pool = new Pool(config);

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
