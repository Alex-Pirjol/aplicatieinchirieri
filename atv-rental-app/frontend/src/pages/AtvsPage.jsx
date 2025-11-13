import { useEffect, useState } from 'react';
import { getAtvs } from '../services/api';
import AtvForm from '../components/AtvForm';

export default function AtvsPage() {
  const [atvs, setAtvs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getAtvs();
        setAtvs(data);
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
      <h1>ATV-uri</h1>
      {loading ? <p>Se încarcă datele...</p> : <pre>{JSON.stringify(atvs, null, 2)}</pre>}
      <AtvForm />
    </div>
  );
}
