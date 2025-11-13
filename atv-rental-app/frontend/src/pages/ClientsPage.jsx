import { useEffect, useState } from 'react';
import { getClients } from '../services/api';
import ClientForm from '../components/ClientForm';

export default function ClientsPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getClients();
        setClients(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <div>
      <h1>Clienți</h1>
      {loading ? <p>Se încarcă lista...</p> : <pre>{JSON.stringify(clients, null, 2)}</pre>}
      <ClientForm />
    </div>
  );
}
