import { useState } from 'react';
import { createClient } from '../services/api';

const initialState = {
  name: '',
  phone: '',
  email: '',
  document_id: '',
  notes: '',
};

export default function ClientForm() {
  const [formData, setFormData] = useState(initialState);
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('loading');
    try {
      await createClient(formData);
      setFormData(initialState);
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Adaugă client</h2>
      <label>
        Nume
        <input name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        Telefon
        <input name="phone" value={formData.phone} onChange={handleChange} />
      </label>
      <label>
        Email
        <input name="email" type="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        Act identitate
        <input name="document_id" value={formData.document_id} onChange={handleChange} />
      </label>
      <label>
        Note
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </label>
      <button type="submit">Salvează client</button>
      {status === 'success' && <p>Client salvat!</p>}
      {status === 'error' && <p>Nu s-a putut salva clientul.</p>}
      {status === 'loading' && <p>Se salvează...</p>}
    </form>
  );
}
