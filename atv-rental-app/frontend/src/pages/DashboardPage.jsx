import { useEffect, useState } from 'react';
import { getRentals } from '../services/api';

export default function DashboardPage() {
  const [recentRentals, setRecentRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getRentals();
        setRecentRentals(data.slice(0, 5));
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
      <h1>Dashboard</h1>
      <p>Statistici rapide și ultimele contracte.</p>
      {loading ? (
        <p>Se încarcă...</p>
      ) : (
        <div className="card">
          <h3>Ultimele contracte</h3>
          <pre>{JSON.stringify(recentRentals, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
