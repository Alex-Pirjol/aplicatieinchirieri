import { useEffect, useState } from 'react';
import { getRentals } from '../services/api';

export default function RentalsPage() {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getRentals();
        setRentals(data);
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
      <h1>Contracte</h1>
      {loading ? <p>Se încarcă...</p> : <pre>{JSON.stringify(rentals, null, 2)}</pre>}
    </div>
  );
}
