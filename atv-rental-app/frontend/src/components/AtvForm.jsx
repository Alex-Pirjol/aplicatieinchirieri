import { useState } from 'react';
import { createAtv } from '../services/api';

const initialState = {
  model: '',
  code: '',
  daily_rate: '',
  status: 'available',
  notes: '',
};

export default function AtvForm() {
  const [formData, setFormData] = useState(initialState);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatusMessage('loading');
    try {
      await createAtv({ ...formData, daily_rate: Number(formData.daily_rate) });
      setFormData(initialState);
      setStatusMessage('success');
    } catch (error) {
      console.error(error);
      setStatusMessage('error');
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Adaugă ATV</h2>
      <label>
        Model
        <input name="model" value={formData.model} onChange={handleChange} required />
      </label>
      <label>
        Cod intern
        <input name="code" value={formData.code} onChange={handleChange} required />
      </label>
      <label>
        Tarif zilnic
        <input name="daily_rate" type="number" value={formData.daily_rate} onChange={handleChange} min="0" step="0.01" required />
      </label>
      <label>
        Status
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="available">Disponibil</option>
          <option value="maintenance">În service</option>
          <option value="unavailable">Indisponibil</option>
        </select>
      </label>
      <label>
        Note
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </label>
      <button type="submit">Salvează ATV</button>
      {statusMessage === 'success' && <p>ATV salvat!</p>}
      {statusMessage === 'error' && <p>Eroare la salvare.</p>}
      {statusMessage === 'loading' && <p>Se salvează...</p>}
    </form>
  );
}
