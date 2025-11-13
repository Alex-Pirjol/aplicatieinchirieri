const pool = require('../db');

async function listAtvs(_req, res, next) {
  try {
    const { rows } = await pool.query('SELECT * FROM atvs ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

async function createAtv(req, res, next) {
  const { model, code, daily_rate: dailyRate, status, notes } = req.body;

  try {
    const { rows } = await pool.query(
      `INSERT INTO atvs (model, code, daily_rate, status, notes)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [model, code, dailyRate, status, notes]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listAtvs,
  createAtv,
};
