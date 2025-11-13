import React, { useEffect, useState } from 'react';
import {
  createClient,
  deleteClient,
  getClients,
  updateClient,
} from '../services/api.js';
import ClientForm from '../components/ClientForm.jsx';

const ClientsPage = () => {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionError, setActionError] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);

  const fetchClients = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getClients();
      setClients(data);
    } catch (err) {
      console.error(err);
      setError('A apărut o eroare la încărcarea clienților.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleAddClient = () => {
    setSelectedClient(null);
    setActionError(null);
    setIsFormVisible(true);
  };

  const handleEditClient = (client) => {
    setSelectedClient(client);
    setActionError(null);
    setIsFormVisible(true);
  };

  const handleDeleteClient = async (client) => {
    const confirmation = window.confirm(
      `Ești sigur că vrei să ștergi clientul "${client.name}"?`
    );

    if (!confirmation) {
      return;
    }

    try {
      setActionError(null);
      await deleteClient(client.id);
      await fetchClients();
    } catch (err) {
      console.error(err);
      setActionError('Ștergerea clientului a eșuat.');
    }
  };

  const handleFormSubmit = async (formValues) => {
    try {
      if (selectedClient) {
        await updateClient(selectedClient.id, formValues);
      } else {
        await createClient(formValues);
      }
      setIsFormVisible(false);
      setSelectedClient(null);
      await fetchClients();
    } catch (err) {
      console.error(err);
      setActionError('Salvarea clientului a eșuat.');
    }
  };

  const handleCancel = () => {
    setIsFormVisible(false);
    setSelectedClient(null);
  };

  return (
    <section>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Clienți</h2>
        <button type="button" onClick={handleAddClient}>
          Adaugă client
        </button>
      </div>

      {loading && <div className="loader">Se încarcă...</div>}
      {error && <div className="error-message">{error}</div>}
      {actionError && <div className="error-message">{actionError}</div>}

      {!loading && !error && clients.length === 0 && (
        <p>Nu există clienți înregistrați.</p>
      )}

      {!loading && !error && clients.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Nume</th>
              <th>Telefon</th>
              <th>Email</th>
              <th style={{ width: '160px' }}>Acțiuni</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client) => (
              <tr key={client.id}>
                <td>{client.name}</td>
                <td>{client.phone || '—'}</td>
                <td>{client.email || '—'}</td>
                <td>
                  <div className="actions">
                    <button type="button" onClick={() => handleEditClient(client)}>
                      Editează
                    </button>
                    <button type="button" onClick={() => handleDeleteClient(client)}>
                      Șterge
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {isFormVisible && (
        <div className="form-container">
          <ClientForm
            initialValues={selectedClient}
            onSubmit={handleFormSubmit}
            onCancel={handleCancel}
          />
        </div>
      )}
    </section>
  );
};

export default ClientsPage;
