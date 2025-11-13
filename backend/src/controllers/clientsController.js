const db = require('../db');

const validateClientPayload = (payload) => {
  const errors = [];

  if (!payload.name || !payload.name.trim()) {
    errors.push('Numele este obligatoriu.');
  }

  if (!payload.phone && !payload.email) {
    errors.push('Telefonul sau emailul trebuie completat.');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

exports.getClients = async (req, res) => {
  try {
    const { rows } = await db.query(
      'SELECT id, name, phone, email, document_id, notes, created_at, updated_at FROM clients ORDER BY name ASC'
    );
    res.json(rows);
  } catch (error) {
    console.error('Error fetching clients:', error);
    res.status(500).json({ message: 'A apărut o eroare la obținerea clienților.' });
  }
};

exports.getClientById = async (req, res) => {
  const { id } = req.params;
  try {
    const { rows } = await db.query(
      'SELECT id, name, phone, email, document_id, notes, created_at, updated_at FROM clients WHERE id = $1',
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Clientul nu a fost găsit.' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error fetching client:', error);
    res.status(500).json({ message: 'A apărut o eroare la obținerea clientului.' });
  }
};

exports.createClient = async (req, res) => {
  const validation = validateClientPayload(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.errors.join(' ') });
  }

  const { name, phone, email, document_id, notes } = req.body;

  try {
    const { rows } = await db.query(
      `INSERT INTO clients (name, phone, email, document_id, notes)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, name, phone, email, document_id, notes, created_at, updated_at`,
      [name.trim(), phone || null, email || null, document_id || null, notes || null]
    );

    res.status(201).json(rows[0]);
  } catch (error) {
    console.error('Error creating client:', error);
    res.status(500).json({ message: 'A apărut o eroare la crearea clientului.' });
  }
};

exports.updateClient = async (req, res) => {
  const { id } = req.params;
  const validation = validateClientPayload(req.body);
  if (!validation.isValid) {
    return res.status(400).json({ message: validation.errors.join(' ') });
  }

  const { name, phone, email, document_id, notes } = req.body;

  try {
    const { rows } = await db.query(
      `UPDATE clients
       SET name = $1,
           phone = $2,
           email = $3,
           document_id = $4,
           notes = $5,
           updated_at = NOW()
       WHERE id = $6
       RETURNING id, name, phone, email, document_id, notes, created_at, updated_at`,
      [name.trim(), phone || null, email || null, document_id || null, notes || null, id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: 'Clientul nu a fost găsit.' });
    }

    res.json(rows[0]);
  } catch (error) {
    console.error('Error updating client:', error);
    res.status(500).json({ message: 'A apărut o eroare la actualizarea clientului.' });
  }
};

exports.deleteClient = async (req, res) => {
  const { id } = req.params;

  try {
    // Ștergere fizică a clientului din baza de date.
    const result = await db.query('DELETE FROM clients WHERE id = $1', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Clientul nu a fost găsit.' });
    }

    res.status(204).send();
  } catch (error) {
    console.error('Error deleting client:', error);
    res.status(500).json({ message: 'A apărut o eroare la ștergerea clientului.' });
  }
};
