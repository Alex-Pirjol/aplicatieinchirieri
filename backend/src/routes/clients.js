const express = require('express');
const clientsController = require('../controllers/clientsController');

const router = express.Router();

router.get('/', clientsController.getClients);
router.get('/:id', clientsController.getClientById);
router.post('/', clientsController.createClient);
router.put('/:id', clientsController.updateClient);
router.delete('/:id', clientsController.deleteClient);

module.exports = router;
