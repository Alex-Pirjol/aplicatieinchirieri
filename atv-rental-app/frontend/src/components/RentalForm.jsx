import { useState } from 'react';
import { createRental } from '../services/api';

const initialState = {
  client_id: '',
  atv_id: '',
  start_date: '',
  end_date: '',
  total_price: '',
  deposit: '',
  status: 'pending',
  notes: '',
};

export default function RentalForm() {
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
      await createRental({
        ...formData,
        client_id: Number(formData.client_id),
        atv_id: Number(formData.atv_id),
        total_price: Number(formData.total_price),
        deposit: Number(formData.deposit),
      });
      setFormData(initialState);
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Contract nou</h2>
      <label>
        Client ID
        <input name="client_id" value={formData.client_id} onChange={handleChange} required />
      </label>
      <label>
        ATV ID
        <input name="atv_id" value={formData.atv_id} onChange={handleChange} required />
      </label>
      <label>
        Data start
        <input type="date" name="start_date" value={formData.start_date} onChange={handleChange} required />
      </label>
      <label>
        Data final
        <input type="date" name="end_date" value={formData.end_date} onChange={handleChange} required />
      </label>
      <label>
        Total estimat
        <input type="number" step="0.01" name="total_price" value={formData.total_price} onChange={handleChange} />
      </label>
      <label>
        Avans
        <input type="number" step="0.01" name="deposit" value={formData.deposit} onChange={handleChange} />
      </label>
      <label>
        Status
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pending">În așteptare</option>
          <option value="active">Activ</option>
          <option value="closed">Încheiat</option>
          <option value="cancelled">Anulat</option>
        </select>
      </label>
      <label>
        Note
        <textarea name="notes" value={formData.notes} onChange={handleChange} />
      </label>
      <button type="submit">Creează contract</button>
      {status === 'success' && <p>Contract creat!</p>}
      {status === 'error' && <p>Eroare la creare.</p>}
      {status === 'loading' && <p>Se trimite...</p>}
    </form>
  );
}
