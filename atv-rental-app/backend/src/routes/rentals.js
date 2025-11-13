const express = require('express');
const rentalsController = require('../controllers/rentalsController');

const router = express.Router();

router.get('/', rentalsController.listRentals);
router.post('/', rentalsController.createRental);

module.exports = router;
