const express = require('express');
const atvsController = require('../controllers/atvsController');

const router = express.Router();

router.get('/', atvsController.listAtvs);
router.post('/', atvsController.createAtv);

module.exports = router;
