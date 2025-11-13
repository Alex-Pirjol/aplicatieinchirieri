const express = require('express');
const clientsController = require('../controllers/clientsController');

const router = express.Router();

router.get('/', clientsController.listClients);
router.post('/', clientsController.createClient);

module.exports = router;
