import React, { useEffect, useState } from 'react';

const defaultValues = {
  name: '',
  phone: '',
  email: '',
  document_id: '',
  notes: '',
};

const ClientForm = ({ initialValues, onSubmit, onCancel }) => {
  const [values, setValues] = useState(defaultValues);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (initialValues) {
      setValues({
        name: initialValues.name || '',
        phone: initialValues.phone || '',
        email: initialValues.email || '',
        document_id: initialValues.document_id || '',
        notes: initialValues.notes || '',
      });
    } else {
      setValues(defaultValues);
    }
  }, [initialValues]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);

    if (!values.name.trim()) {
      setError('Numele este obligatoriu.');
      return;
    }

    if (!values.phone.trim() && !values.email.trim()) {
      setError('Trebuie să existe cel puțin telefon sau email.');
      return;
    }

    try {
      await onSubmit({
        name: values.name.trim(),
        phone: values.phone.trim() || null,
        email: values.email.trim() || null,
        document_id: values.document_id.trim() || null,
        notes: values.notes.trim() || null,
      });
      setValues(defaultValues);
    } catch (submitError) {
      console.error(submitError);
      setError('A apărut o eroare la trimiterea formularului.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{initialValues ? 'Editează client' : 'Adaugă client'}</h3>
      {error && <div className="error-message">{error}</div>}

      <div className="form-group">
        <label htmlFor="name">Nume *</label>
        <input
          id="name"
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="phone">Telefon</label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={values.phone}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={values.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="document_id">Document ID</label>
        <input
          id="document_id"
          name="document_id"
          type="text"
          value={values.document_id}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="notes">Note</label>
        <textarea
          id="notes"
          name="notes"
          rows="3"
          value={values.notes}
          onChange={handleChange}
        />
      </div>

      <div className="form-actions">
        <button type="button" onClick={onCancel}>
          Anulează
        </button>
        <button type="submit">Salvează</button>
      </div>
    </form>
  );
};

export default ClientForm;
