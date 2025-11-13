const pool = require('../db');
const rentalsService = require('../services/rentalsService');

async function listRentals(_req, res, next) {
  try {
    const { rows } = await pool.query(
      `SELECT r.*, c.name AS client_name, a.model AS atv_model
       FROM rentals r
       LEFT JOIN clients c ON c.id = r.client_id
       LEFT JOIN atvs a ON a.id = r.atv_id
       ORDER BY r.start_date DESC`
    );
    res.json(rows);
  } catch (error) {
    next(error);
  }
}

async function createRental(req, res, next) {
  const { client_id: clientId, atv_id: atvId, start_date: startDate, end_date: endDate, total_price: totalPrice, deposit, status, notes } = req.body;

  try {
    const overlaps = await rentalsService.checkRentalOverlap(atvId, startDate, endDate);
    if (overlaps) {
      return res.status(400).json({ message: 'Rental overlaps with an existing booking for this ATV.' });
    }

    const { rows } = await pool.query(
      `INSERT INTO rentals (client_id, atv_id, start_date, end_date, total_price, deposit, status, notes)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [clientId, atvId, startDate, endDate, totalPrice, deposit, status, notes]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  listRentals,
  createRental,
};
