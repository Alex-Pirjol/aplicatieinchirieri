const express = require('express');
const cors = require('cors');

const clientsRouter = require('./routes/clients');
const atvsRouter = require('./routes/atvs');
const rentalsRouter = require('./routes/rentals');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/clients', clientsRouter);
app.use('/api/atvs', atvsRouter);
app.use('/api/rentals', rentalsRouter);

module.exports = app;
