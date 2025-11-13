const pool = require('../db');

async function checkRentalOverlap(atvId, startDate, endDate) {
  if (!atvId || !startDate || !endDate) {
    return false;
  }

  const query = `
    SELECT 1
    FROM rentals
    WHERE atv_id = $1
      AND NOT ($3 < start_date OR $2 > end_date)
    LIMIT 1
  `;

  const values = [atvId, startDate, endDate];
  const { rowCount } = await pool.query(query, values);
  return rowCount > 0;
}

function calculateRentalTotals(_rental) {
  // TODO: Implement total and outstanding amount calculation logic
  return {
    total: 0,
    outstanding: 0,
  };
}

module.exports = {
  checkRentalOverlap,
  calculateRentalTotals,
};
