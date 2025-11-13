const pool = require('../db');

async function listClients(_req, res, next) {
  try {
    const { rows } = await pool.query('SELECT * FROM clients ORDER BY id DESC');
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

async function createClient(req, res, next) {
  const { name, phone, email, document_id: documentId, notes } = req.body;

  try {
    const { rows } = await pool.query(
      `INSERT INTO clients (name, phone, email, document_id, notes)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [name, phone, email, documentId, notes]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listClients,
  createClient,
};
