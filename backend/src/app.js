const express = require('express');
const cors = require('cors');
const clientsRouter = require('./routes/clients');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/clients', clientsRouter);

app.use((req, res) => {
  res.status(404).json({ message: 'Resursa solicitată nu a fost găsită.' });
});

app.use((err, req, res, next) => {
  console.error('Unexpected error:', err);
  res.status(500).json({ message: 'A apărut o eroare internă.' });
});

module.exports = app;
